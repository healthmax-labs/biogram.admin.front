import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { getMngUserMyGraphBody } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'
import { dateInsertHypen } from '@Helper'
import { ConsultMyGraphBodyStdResultItemInterface } from '@Type/MemberTypes'

const initializeState = {
    data: {
        BDWGH: {
            list: [],
            stan: {
                high: 0,
                low: 0,
            },
        },
        // SLM: [],
        // FAT_MAS: [],
        // EST_BN_MAS: [],
        // PBF: [],
        // VFL: [],
        // BMI: [],
        // BMR: [],
    },
}

const ConsultDetailPartMyGraphBody = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            BDWGH: {
                list: Array<{ date: string; value: number }>
                stan: {
                    high: number
                    low: number
                }
            }
            // SLM: Array<{ date: string; value: number }>
            // FAT_MAS: Array<{ date: string; value: number }>
            // EST_BN_MAS: Array<{ date: string; value: number }>
            // PBF: Array<{ date: string; value: number }>
            // VFL: Array<{ date: string; value: number }>
            // BMI: Array<{ date: string; value: number }>
            // BMR: Array<{ date: string; value: number }>
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        const { memNo, startDay } = myGraphState.search

        if (memNo) {
            setMyGraphState(prevState => ({
                ...prevState,
                body: {
                    ...prevState.body,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphBody({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    body: {
                        ...prevState.body,
                        status: 'success',
                        data: payload.BODY_GRAPH,
                        std_list: {
                            VFL: payload.VFL_STD_LIST,
                            BMR: payload.BMR_STD_LIST,
                            FAT: payload.FAT_STD_LIST,
                            BDWGH: payload.BDWGH_STD_LIST,
                            EST: payload.EST_STD_LIST,
                            BMI: payload.BMI_STD_LIST,
                            SLM: payload.SLM_STD_LIST,
                            PBF: payload.PBF_STD_LIST,
                        },
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    body: {
                        ...prevState.body,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { body } = Codes.myGraph.dataCode
        const { status, data, std_list } = myGraphState.body
        if (status === 'success') {
            _.forEach(body, code => {
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

                setPageState(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        [code.code]: {
                            list: list,
                            stan: {
                                high: _.maxBy(stdData, 'MVL').MVL,
                                low: _.maxBy(stdData, 'MNVL').MNVL,
                            },
                        },
                    },
                }))
            })
        }
    }, [myGraphState.body])

    useEffect(() => {
        const { body } = myGraphState
        if (body.status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    useEffect(() => {
        console.debug(pageState)
    }, [pageState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.body.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphBody
