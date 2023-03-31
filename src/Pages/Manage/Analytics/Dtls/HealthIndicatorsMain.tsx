import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import HealthIndicatorsTable from './HealthIndicatorsTable'
import { useRecoilState } from 'recoil'
import { getImprvmCountAnalyticsList } from '@Service/AnalyticsService'
import { ImprvmListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const HealthIndicatorsMain = () => {
    const [imprvmListState, setImprvmListState] =
        useRecoilState(ImprvmListState)

    const getTableList = useCallback(async () => {
        setImprvmListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = imprvmListState

        const { status, payload } = await getImprvmCountAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
        })

        if (status) {
            setImprvmListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload.MYBODY_SCORE_IMPRVM_STAT_LIST.map(list => {
                    return {
                        ...list,
                        AGES_GROUP: String(list.AGES_GROUP),
                    }
                }),
            }))
        } else {
            setImprvmListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: [],
            }))
        }
    }, [imprvmListState, setImprvmListState])

    useEffect(() => {
        const pageStart = () => {
            if (imprvmListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, imprvmListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'healthIndicators'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={(instNo, instNm) => {
                        setImprvmListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                                instNm: instNm,
                            },
                        }))
                    }}
                    StartDate={imprvmListState.search.BGNDE}
                    HandleStartDate={e => {
                        setImprvmListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    EndDate={imprvmListState.search.ENDDE}
                    HandleEndDate={e => {
                        setImprvmListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                />
            </SearchWapper>
            <TableWapper>
                <HealthIndicatorsTable />
            </TableWapper>
        </Container>
    )
}

export default HealthIndicatorsMain
