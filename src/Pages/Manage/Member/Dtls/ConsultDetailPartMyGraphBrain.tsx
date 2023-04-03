import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBrain } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        WAIST_CRCMFRNC: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        BBF_ADJST_TIME: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        CB_FNCT: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        CB_ABLTY: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        CB_FNCT_SCORE: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        BBF_FNCT_SCORE: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        BB_FNCT: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        BH_TNT_SCORE: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
    },
}

const ConsultDetailPartMyGraphBrain = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            WAIST_CRCMFRNC: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            BBF_ADJST_TIME: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            CB_FNCT: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            CB_ABLTY: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            CB_FNCT_SCORE: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            BBF_FNCT_SCORE: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            BB_FNCT: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            BH_TNT_SCORE: {
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
                brain: {
                    ...prevState.brain,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphBrain({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    brain: {
                        ...prevState.brain,
                        status: 'success',
                        data: payload.BRAIN_GRAPH,
                        std_list: {
                            WAIST_CRCMFRNC: payload.BBFNCT_STD_LIST,
                            BBF_ADJST_TIME: payload.BBFNCT_STD_LIST,
                            CB_FNCT: payload.CBFNCT_STD_LIST,
                            CB_ABLTY: payload.CBFNCT_ABLTY_STD_LIST,
                            CB_FNCT_SCORE: payload.CBFNCT_SCORE_STD_LIST,
                            BBF_FNCT_SCORE: payload.BAT_STD_LIST,
                            BB_FNCT: payload.BFS_STD_LIST,
                            BH_TNT_SCORE: payload.BRAIN_STD_LIST,
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    brain: {
                        ...prevState.brain,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { brain } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.brain
        if (status === 'success') {
            _.forEach(brain, code => {
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
    }, [myGraphState.brain])

    useEffect(() => {
        const {
            brain: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.brain.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphBrain
