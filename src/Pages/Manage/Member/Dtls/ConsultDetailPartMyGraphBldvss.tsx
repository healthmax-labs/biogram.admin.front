import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBldvss } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        BLDVSS_STEP: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        CAD_OUTPUT_IN: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        ELSTC_DGREE: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        RBV_QY: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
    },
}

const ConsultDetailPartMyGraphBldvss = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            BLDVSS_STEP: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            CAD_OUTPUT_IN: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            ELSTC_DGREE: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            RBV_QY: {
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
                bldvss: {
                    ...prevState.bldvss,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphBldvss({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    bldvss: {
                        ...prevState.bldvss,
                        status: 'success',
                        data: payload.VSS_GRAPH,
                        std_list: {
                            CAD_OUTPUT_IN: payload.CAD_STD_LIST,
                            ELSTC_DGREE: payload.ELSTC_STD_LIST,
                            RBV_QY: payload.RBV_STD_LIST,
                            BLDVSS_STEP: payload.VSS_STD_LIST,
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    bldvss: {
                        ...prevState.bldvss,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { bldvss } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.bldvss
        if (status === 'success') {
            _.forEach(bldvss, code => {
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
    }, [myGraphState.bldvss])

    useEffect(() => {
        const {
            bldvss: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.bldvss.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphBldvss
