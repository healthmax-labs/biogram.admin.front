import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphBldvss } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        BLDVSS_STEP: [],
        CAD_OUTPUT_IN: [],
        ELSTC_DGREE: [],
        RBV_QY: [],
    },
}

const ConsultDetailPartMyGraphBldvss = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            BLDVSS_STEP: Array<{ date: string; value: number }>
            CAD_OUTPUT_IN: Array<{ date: string; value: number }>
            ELSTC_DGREE: Array<{ date: string; value: number }>
            RBV_QY: Array<{ date: string; value: number }>
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
        const { status, data } = myGraphState.bldvss
        if (status === 'success') {
            _.forEach(bldvss, code => {
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
            {/*{Codes.myGraph.dataCode.bldvss.map((code, codeIndex) => {*/}
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

export default ConsultDetailPartMyGraphBldvss
