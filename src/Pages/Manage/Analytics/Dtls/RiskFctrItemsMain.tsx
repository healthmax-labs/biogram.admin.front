import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrItemsTable from './RiskFctrItemsTable'
import { useRecoilState } from 'recoil'
import { getRiskFctrItemsAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrItemsListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrItemsMain = () => {
    const [riskFctrItemsListState, setRiskFctrItemsListState] = useRecoilState(
        RiskFctrItemsListState
    )

    const getTableList = useCallback(async () => {
        setRiskFctrItemsListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { INST_NO, BGNDE, ENDDE, AGEGROUP, CYCLE },
        } = riskFctrItemsListState

        const { status, payload } = await getRiskFctrItemsAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            const { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST } = payload
            setRiskFctrItemsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: {
                    AGE_GROUP_STAT_LIST: AGE_GROUP_STAT_LIST.map(ageGroup => {
                        return {
                            ...ageGroup,
                            AGE_GROUP: String(ageGroup.AGE_GROUP),
                        }
                    }),
                    PERIOD_STAT_LIST: PERIOD_STAT_LIST,
                },
            }))
        } else {
            setRiskFctrItemsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
                },
            }))
        }
    }, [riskFctrItemsListState, setRiskFctrItemsListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrItemsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, riskFctrItemsListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'default'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={(instNo, instNm) => {
                        setRiskFctrItemsListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                                instNm: instNm,
                            },
                        }))
                    }}
                    HandleStartDate={e => {
                        setRiskFctrItemsListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    StartDate={riskFctrItemsListState.search.BGNDE}
                    HandleEndDate={e => {
                        setRiskFctrItemsListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    EndDate={riskFctrItemsListState.search.ENDDE}
                    AgeGroup={riskFctrItemsListState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setRiskFctrItemsListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={riskFctrItemsListState.search.CYCLE}
                    HandleCycle={e => {
                        setRiskFctrItemsListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                CYCLE: e,
                            },
                        }))
                    }}
                />
            </SearchWapper>
            <TableWapper>
                <RiskFctrItemsTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrItemsMain
