import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { getMngUserMyGraphBody } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        BDWGH: [],
        SLM: [],
        FAT_MAS: [],
        EST_BN_MAS: [],
        PBF: [],
        VFL: [],
        BMI: [],
        BMR: [],
    },
}

const ConsultDetailPartMyGraphBody = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            BDWGH: Array<{ date: string; value: number }>
            SLM: Array<{ date: string; value: number }>
            FAT_MAS: Array<{ date: string; value: number }>
            EST_BN_MAS: Array<{ date: string; value: number }>
            PBF: Array<{ date: string; value: number }>
            VFL: Array<{ date: string; value: number }>
            BMI: Array<{ date: string; value: number }>
            BMR: Array<{ date: string; value: number }>
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
        const { status, data } = myGraphState.body
        if (status === 'success') {
            _.forEach(body, code => {
                setPageState(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        [code.code]: _.map(data, d => {
                            return _.mapKeys(
                                _.pick(d, ['MESURE_DE', code.code]),
                                (value, key) =>
                                    key === code.code ? 'value' : 'date'
                            )
                        }).map(e => {
                            return {
                                ...e,
                                value: e.value === null ? 0 : e.value,
                            }
                        }),
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
