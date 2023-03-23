import { useRecoilState } from 'recoil'
import { MyGraphState } from '@Recoil/MemberPagesState'
import { useCallback, useEffect, useState } from 'react'
import { getMngUserMyGraphHeight } from '@Service/MemberService'
import ConsultDetailPartMyGraphChartCard from './ConsultDetailPartMyGraphChartCard'
import Codes from '@Codes'
import _ from 'lodash'

const initializeState = {
    data: {
        HEIGHT: [],
    },
}

const ConsultDetailPartMyGraphHeight = () => {
    const [myGraphState, setMyGraphState] = useRecoilState(MyGraphState)
    const [pageState, setPageState] = useState<{
        data: {
            HEIGHT: Array<{ date: string; value: number }>
        }
    }>(initializeState)

    const handleGetData = useCallback(async () => {
        const { memNo, startDay } = myGraphState.search

        if (memNo) {
            setMyGraphState(prevState => ({
                ...prevState,
                height: {
                    ...prevState.height,
                    status: 'loading',
                },
            }))

            const { status, payload } = await getMngUserMyGraphHeight({
                memNo: memNo,
                startDay: startDay,
            })

            if (status) {
                setMyGraphState(prevState => ({
                    ...prevState,
                    height: {
                        ...prevState.height,
                        status: 'success',
                        data: payload.HEIGHT_GRAPH,
                    },
                }))
            } else {
                setMyGraphState(prevState => ({
                    ...prevState,
                    height: {
                        ...prevState.height,
                        status: 'failure',
                    },
                }))
            }
        }
    }, [myGraphState.search, setMyGraphState])

    // 데이터 조합
    useEffect(() => {
        const { height } = Codes.myGraph.dataCode
        const { status, data } = myGraphState.height
        if (status === 'success') {
            _.forEach(height, code => {
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
    }, [myGraphState.height])

    useEffect(() => {
        const {
            height: { status },
        } = myGraphState
        if (status === 'idle') {
            handleGetData().then()
        }
    }, [handleGetData, myGraphState])

    return (
        <div className="flex w-full border flex-col">
            {Codes.myGraph.dataCode.height.map((code, codeIndex) => {
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

export default ConsultDetailPartMyGraphHeight
