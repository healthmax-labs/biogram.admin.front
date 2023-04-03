import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphStrs } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        STRS_SCORE: [],
        STRS_CNTRMSR_ABLTY: [],
        MNTL_STRS: [],
        PHYSIC_STRS: [],
    },
}

const ConsultDetailPartMyGraphStrs = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            STRS_SCORE: Array<{ date: string; value: number }>
            STRS_CNTRMSR_ABLTY: Array<{ date: string; value: number }>
            MNTL_STRS: Array<{ date: string; value: number }>
            PHYSIC_STRS: Array<{ date: string; value: number }>
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        const { memNo, startDay } = myGraphState.search

        if (memNo) {
            setMyGraphState(prevState => ({
                ...prevState,
                strs: {
                    ...prevState.strs,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphStrs({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    strs: {
                        ...prevState.strs,
                        status: 'success',
                        data: payload.STRS_GRAPH,
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    strs: {
                        ...prevState.strs,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { strs } = Codes.myGraph.dataCode
        const { status, data } = myGraphState.strs
        if (status === 'success') {
            _.forEach(strs, code => {
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
    }, [myGraphState.strs])

    useEffect(() => {
        const {
            strs: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {/*{Codes.myGraph.dataCode.strs.map((code, codeIndex) => {*/}
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

export default ConsultDetailPartMyGraphStrs
