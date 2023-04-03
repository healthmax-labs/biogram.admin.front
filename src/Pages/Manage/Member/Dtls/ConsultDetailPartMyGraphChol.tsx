import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphChol } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        T_CHOL: [],
        TG: [],
        HDLC: [],
        LDLC: [],
    },
}

const ConsultDetailPartMyGraphChol = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            T_CHOL: Array<{ date: string; value: number }>
            TG: Array<{ date: string; value: number }>
            HDLC: Array<{ date: string; value: number }>
            LDLC: Array<{ date: string; value: number }>
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
        const { status, data } = myGraphState.chol
        if (status === 'success') {
            _.forEach(chol, code => {
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
            {/*{Codes.myGraph.dataCode.chol.map((code, codeIndex) => {*/}
            {/*    return (*/}
            {/*        <ConsultDetailPartMyGraphChartCard*/}
            {/*            key={`consult-detail-part-mygraph-item-${code.code}-${codeIndex}`}*/}
            {/*            Title={code.name}*/}
            {/*            ChartData={_.get(pageState.data, code.code)}*/}
            {/*        />*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    )
}

export default ConsultDetailPartMyGraphChol
