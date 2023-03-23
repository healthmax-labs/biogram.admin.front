import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBrain } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        WAIST_CRCMFRNC: [],
        BBF_ADJST_TIME: [],
        CB_FNCT: [],
        CB_ABLTY: [],
        CB_FNCT_SCORE: [],
        BBF_FNCT_SCORE: [],
        BB_FNCT: [],
        BH_TNT_SCORE: [],
    },
}

const ConsultDetailPartMyGraphBrain = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            WAIST_CRCMFRNC: Array<{ date: string; value: number }>
            BBF_ADJST_TIME: Array<{ date: string; value: number }>
            CB_FNCT: Array<{ date: string; value: number }>
            CB_ABLTY: Array<{ date: string; value: number }>
            CB_FNCT_SCORE: Array<{ date: string; value: number }>
            BBF_FNCT_SCORE: Array<{ date: string; value: number }>
            BB_FNCT: Array<{ date: string; value: number }>
            BH_TNT_SCORE: Array<{ date: string; value: number }>
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
        const { status, data } = myGraphState.brain
        if (status === 'success') {
            _.forEach(brain, code => {
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
