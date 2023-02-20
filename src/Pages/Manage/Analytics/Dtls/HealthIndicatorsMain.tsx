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
                list: payload,
            }))
        } else {
            setImprvmListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    MYBODY_SCORE_IMPRVM_STAT_LIST: [],
                },
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
                    HandleInstNo={instNo => {
                        setImprvmListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
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
                    AgeGroup={[]}
                    HandleAgeGroup={() => {
                        //
                    }}
                    Cycle={''}
                    HandleCycle={() => {
                        //
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
