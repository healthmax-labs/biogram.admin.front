import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBdsg } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        FBS: [],
        PP2: [],
        HBA1C: [],
    },
}

const ConsultDetailPartMyGraphDdsg = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            FBS: Array<{ date: string; value: number }>
            PP2: Array<{ date: string; value: number }>
            HBA1C: Array<{ date: string; value: number }>
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
        const { status, data } = myGraphState.bdsg
        if (status === 'success') {
            _.forEach(bdsg, code => {
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
