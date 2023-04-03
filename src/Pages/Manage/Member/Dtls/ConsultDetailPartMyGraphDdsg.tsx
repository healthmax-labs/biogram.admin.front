import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBdsg } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        FBS: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        PP2: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        HBA1C: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
    },
}

const ConsultDetailPartMyGraphDdsg = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            FBS: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            PP2: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            HBA1C: {
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
                bdsg: {
                    ...prevState.bdsg,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphBdsg({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    bdsg: {
                        ...prevState.bdsg,
                        status: 'success',
                        data: payload.SUGAR_GRAPH,
                        std_list: {
                            PP2: payload.PP2_STD_LIST,
                            FBS: payload.FBS_STD_LIST,
                            HBA1C: payload.HBA1C_STD_LIST,
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    bdsg: {
                        ...prevState.bdsg,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { bdsg } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.bdsg
        if (status === 'success') {
            _.forEach(bdsg, code => {
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
    }, [myGraphState.bdsg])

    useEffect(() => {
        const {
            bdsg: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.bdsg.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphDdsg
