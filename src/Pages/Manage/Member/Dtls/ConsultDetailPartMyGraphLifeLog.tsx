import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphLifeLog } from '@Service/MemberService'
import { VaryLineChart } from '@Elements'
import { generateRandomString } from '@Helper'
import _ from 'lodash'

const initializeState = {
    moblphon: {
        data: [],
        goal: 0,
        avg: 0,
        goalAvg: 0,
    },
    trckStep: {
        data: [],
        goal: 0,
        avg: {
            step1: 0,
            step2: 0,
        },
        goalAvg: {
            step1: 0,
            step2: 0,
        },
    },
}

const ConsultDetailPartMyGraphLifeLog = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        moblphon: {
            data: Array<{ date: string; value: number; goal: number }>
            goal: number // 목표
            avg: number // 평균 활동량.
            goalAvg: number // 활동 목표 도달률
        }
        trckStep: {
            data: Array<{
                date: string
                value: number
                goal: number
                tooltip: string
            }>
            goal: number // 목표
            avg: {
                step1: number // 평균 활동량
                step2: number // 평균 운동 시간
            }
            goalAvg: {
                step1: number // 활동 목표 도달률
                step2: number // 운동 목표 도달률
            }
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        const { memNo, startDay } = myGraphState.search

        if (memNo) {
            setMyGraphState(prevState => ({
                ...prevState,
                lifeLog: {
                    ...prevState.lifeLog,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphLifeLog({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    lifeLog: {
                        ...prevState.lifeLog,
                        status: 'success',
                        data: payload,
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    lifeLog: {
                        ...prevState.lifeLog,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        /**
         * 활동량(앱측정): DAIL_MOBLPHON_STEPS_DATA_LIST
         * 활동량(걸음) : ACTV_TRCK_14DAYS_STEP_INFO_LIST
         * 수면 : SLEEP_14DAYS_INFO_LIST
         */

        // 활동량(앱측정)
        const funcSetMoblphonData = () => {
            const {
                data: { DAIL_MOBLPHON_STEPS_DATA_LIST: data },
            } = myGraphState.lifeLog

            const chartData = _.map(data, d => {
                return {
                    date: d.MESURE_DE,
                    value: d.MOBLPHON_STEPS,
                    goal: d.GOAL_VALUE,
                }
            })
            const lastData = _.last(data)
            const goal = lastData // 목표치는 리스트중 마지막꺼.
                ? lastData.GOAL_VALUE
                : 0

            const avg = _.sumBy(data, 'MOBLPHON_STEPS') / data.length
            const golAvh = (avg / goal) * 100

            setPageState(prevState => ({
                ...prevState,
                moblphon: {
                    data: chartData,
                    goal: goal,
                    avg: parseFloat(avg.toFixed(1)),
                    goalAvg: parseFloat(golAvh.toFixed(1)),
                },
            }))
        }

        // 활동량(걸음)
        const funcSetTrckStep = () => {
            const {
                data: {
                    ACTV_TRCK_14DAYS_STEP_INFO_LIST: data,
                    LATEST_HR_INFOS: hrInfo,
                },
            } = myGraphState.lifeLog
            // console.debug(myGraphState.lifeLog)

            const chartData = _.map(data, (d, dIndex) => {
                const {
                    HR_STDR_INFO: { FAT_BURNING, ENDURANCE, SUPER },
                } = hrInfo[dIndex] // 운동 시간 가지고 오기.

                return {
                    date: d.MESURE_DE,
                    value: d.STEPS,
                    goal: d.GOAL_VALUE,
                    tooltip: `${d.STEPS}보(${
                        FAT_BURNING + ENDURANCE + SUPER
                    }분)`,
                }
            })
            const lastData = _.last(data)
            const goal = lastData // 목표치는 리스트중 마지막꺼.
                ? lastData.GOAL_VALUE
                : 0

            const avg = _.sumBy(data, 'STEPS') / data.length
            const golAvh = (avg / goal) * 100

            // 평균 운동 시간. ( 운동시간 정보 데이터 들중 운동 시간정보들만 더해서 평균 값)
            const avgHrTime =
                _.sum(
                    _.map(hrInfo, hrel => {
                        const {
                            HR_STDR_INFO: { FAT_BURNING, ENDURANCE, SUPER },
                        } = hrel
                        return FAT_BURNING + ENDURANCE + SUPER
                    })
                ) / hrInfo.length

            /**
             * 하루 운동량이 30분을 넘으면 100% 성공 이고 30분 보다 작으면 30분에 몇퍼인지 구해서 평균을 구한다
             */
            const htGoal =
                _.sum(
                    _.map(hrInfo, hrel => {
                        const {
                            HR_STDR_INFO: { FAT_BURNING, ENDURANCE, SUPER },
                        } = hrel

                        const total = FAT_BURNING + ENDURANCE + SUPER

                        if (total > 30) {
                            return 100
                        } else {
                            return (total / 30) * 100
                        }
                    })
                ) / hrInfo.length

            setPageState(prevState => ({
                ...prevState,
                trckStep: {
                    ...prevState.trckStep,
                    data: chartData,
                    goal: goal,
                    avg: {
                        ...prevState.trckStep.avg,
                        step1: parseFloat(avg.toFixed(1)),
                        step2: parseFloat(avgHrTime.toFixed(1)),
                    },
                    goalAvg: {
                        ...prevState.trckStep.goalAvg,
                        step1: parseFloat(golAvh.toFixed(1)),
                        step2: parseFloat(htGoal.toFixed(1)),
                    },
                },
            }))
        }

        console.debug(myGraphState.lifeLog)

        /**
         * 12시 보다 크면 : 시간 * 60 + 분
         * 12시 작으면 : 시간 * 60 + 분 + 720
         */
        funcSetMoblphonData()
        funcSetTrckStep()
    }, [myGraphState.lifeLog])

    useEffect(() => {
        console.debug(pageState)
    }, [pageState])

    useEffect(() => {
        const {
            lifeLog: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex flex-col w-full border">
            <div className="grid grid-cols-12 grid-rows-1 border-b">
                <div className="flex col-span-2 justify-center items-center border-r">
                    <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500">활동량</div>
                        <div className="text-xs text-gray-500">(앱측정)</div>
                        <div className="text-xs text-gray-500">
                            {`목표: ${pageState.moblphon.goal}보`}
                        </div>
                    </div>
                </div>
                <div className="col-span-8 border-r">
                    {pageState.moblphon.data.length > 0 && (
                        <VaryLineChart
                            ChartID={generateRandomString(10)}
                            Data1={pageState.moblphon.data}
                            Data2={[]}
                        />
                    )}
                </div>
                <div className="flex col-span-2 h-full ">
                    <div className="grid grid-rows-1 grid-cols-2 items-center w-full">
                        <div className="flex h-full items-center justify-center border-r">
                            <div className="flex flex-col items-center">
                                <div className="text-xs text-gray-500">
                                    평균 활동량
                                </div>
                                <div className="text-xs text-gray-500">{`${pageState.moblphon.avg}보`}</div>
                            </div>
                        </div>
                        <div className="flex h-full items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="text-xs text-gray-500">
                                    활동목표
                                </div>
                                <div className="text-xs text-gray-500">
                                    도달률
                                </div>
                                <div className="text-xs text-gray-500">
                                    {`${pageState.moblphon.goalAvg}%`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 grid-rows-1 items-center">
                <div className="flex col-span-2 h-full">
                    <div className="flex w-full">
                        <div className="flex w-1/2 border-r">
                            <div className="flex flex-col w-full h-full items-center justify-center">
                                <div className="flex justify-center text-xs text-gray-500">
                                    스마트밴드
                                </div>
                                <div className="flex justify-center text-xs text-gray-500">
                                    측정
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/2 border-r">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-center h-1/2 items-center border-b">
                                    <div className="flex flex-col">
                                        <div className="flex justify-center text-xs text-gray-500">
                                            활동량
                                        </div>
                                        <div className="flex justify-center text-xs text-gray-500">
                                            (걸음)
                                        </div>
                                        <div className="flex justify-center text-xs text-gray-500">
                                            {`목표:${pageState.trckStep.goal}보`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center h-1/2 items-center">
                                    <div className="flex flex-col">
                                        <div className="flex justify-center text-xs text-gray-500">
                                            수면
                                        </div>
                                        <div className="flex justify-center text-xs text-gray-500">
                                            (시간/분)
                                        </div>
                                        <div className="flex justify-center text-xs text-gray-500">
                                            목표:420분
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8 border-r">
                    <div className="border-b">
                        {pageState.trckStep.data.length > 0 && (
                            <VaryLineChart
                                ChartID={generateRandomString(11)}
                                Data1={pageState.trckStep.data}
                                Data2={[]}
                            />
                        )}
                    </div>
                    <div>
                        <VaryLineChart
                            ChartID={generateRandomString(11)}
                            Data1={[
                                { date: '20230320', value: 9 },
                                { date: '20230321', value: 10 },
                            ]}
                            Data2={[]}
                        />
                    </div>
                </div>
                <div className="flex col-span-2 h-full">
                    <div className="flex flex-col w-full">
                        <div className="flex h-1/2">
                            <div className="grid grid-rows-2 w-full grid-cols-2 items-center border-b">
                                <div className="flex h-full items-center justify-center border-b border-r">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            평균 활동량
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {`${pageState.trckStep.avg.step1}보`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center border-b">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            활동 목표
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            도달률
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {`${pageState.trckStep.goalAvg.step1}%`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center border-r">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            평균 운동 시간
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {`${pageState.trckStep.avg.step2}분`}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            운동 목표
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            도달률
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {`${pageState.trckStep.goalAvg.step2}%`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-1/2">
                            <div className="grid grid-rows-2  w-full grid-cols-2 items-center">
                                <div className="flex h-full items-center justify-center border-r border-b">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            평균 수면 시간
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            0시간 0분
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center border-b">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            수면 목표
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            도달률
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            0.0%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center border-r">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            목표 취침률
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            0.0%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-full items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-gray-500">
                                            목표 기상률
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            0.0%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultDetailPartMyGraphLifeLog
