import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBrssr } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        DIASTOLIC: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        SYSTOLIC: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        PULS: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
    },
}

const ConsultDetailPartMyGraphBrssr = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            DIASTOLIC: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            SYSTOLIC: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            PULS: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        const { memNo, startDay } = myGraphState.search

        if (memNo) {
            setMyGraphState(prevState => ({
                ...prevState,
                brssr: {
                    ...prevState.brssr,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphBrssr({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    brssr: {
                        ...prevState.brssr,
                        status: 'success',
                        data: payload.SYS_DIA_GRAPH,
                        std_list: {
                            DIASTOLIC: payload.DIA_STD_LIST,
                            SYSTOLIC: payload.SYS_STD_LIST,
                            PULS: [],
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    brssr: {
                        ...prevState.brssr,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { brssr } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.brssr
        if (status === 'success') {
            _.forEach(brssr, code => {
                const list = _.map(data, d => {
                    return _.mapKeys(
                        _.pick(d, ['MESURE_DE', code.code]),
                        (value, key) => (key === code.code ? 'value' : 'date')
                    )
                }).map(e => {
                    return {
                        ...e,
                        value: e.value === null ? 0 : e.value,
                    }
                })

                const stdData = _.filter(_.get(std_list, code.code), v => {
                    return (
                        v.MESURE_GRAD_NM === '매우좋음' ||
                        v.MESURE_GRAD_NM === '좋음' ||
                        v.MESURE_GRAD_NM === '양호'
                    )
                })

                const high =
                    stdData && stdData.length > 0
                        ? _.maxBy(stdData, 'MVL').MVL
                        : 0
                const low =
                    stdData && stdData.length > 0
                        ? _.minBy(stdData, 'MNVL').MNVL
                        : 0
                setPageState(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        [code.code]: {
                            list: list,
                            stan: {
                                high: high,
                                low: low,
                            },
                        },
                    },
                }))
            })
        }
    }, [myGraphState.brssr])

    useEffect(() => {
        const {
            brssr: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full flex-col">
            {Codes.myGraph.dataCode.brssr.map((code, codeIndex) => {
                return (
                    <ConsultDetailPartMyGraphChartCard
                        key={`consult-detail-part-mygraph-item-${code.code}-${codeIndex}`}
                        Title={code.name}
                        ChartData={_.get(pageState.data, code.code)}
                    />
                )
            })}
        </div>
    )
}

export default ConsultDetailPartMyGraphBrssr
