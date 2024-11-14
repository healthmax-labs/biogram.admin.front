import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphChol } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        T_CHOL: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        TG: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        HDLC: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        LDLC: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
    },
}

const ConsultDetailPartMyGraphChol = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            T_CHOL: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            TG: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            HDLC: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            LDLC: {
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
                chol: {
                    ...prevState.chol,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphChol({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    chol: {
                        ...prevState.chol,
                        status: 'success',
                        data: payload.CHOL_GRAPH,
                        std_list: {
                            T_CHOL: payload.CHOL_STD_LIST,
                            HDLC: payload.HDLC_STD_LIST,
                            LDLC: payload.LDLC_STD_LIST,
                            TG: payload.TG_STD_LIST,
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    chol: {
                        ...prevState.chol,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { chol } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.chol
        if (status === 'success') {
            _.forEach(chol, code => {
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
    }, [myGraphState.chol])

    useEffect(() => {
        const {
            chol: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.chol.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphChol
