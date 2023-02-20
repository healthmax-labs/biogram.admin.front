import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrCountTable from './RiskFctrCountTable'

import { useRecoilState } from 'recoil'
import { getRiskFctrCountAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrCountListState } from '@Recoil/AnalyticsPagesState'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrCountMain = () => {
    const [riskFctrCountListState, setRiskFctrCountListState] = useRecoilState(
        RiskFctrCountListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE, AGEGROUP, CYCLE },
        } = riskFctrCountListState

        const { status, payload } = await getRiskFctrCountAnalyticsList({
            INST_NO: INST_NO,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            AGEGROUP: AGEGROUP,
            CYCLE: CYCLE,
        })

        if (status) {
            setRiskFctrCountListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrCountListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    AGE_GROUP_STAT_LIST: [],
                    PERIOD_STAT_LIST: [],
                },
            }))
        }
    }, [riskFctrCountListState, setRiskFctrCountListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrCountListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, riskFctrCountListState.status])

    return (
        <Container>
            <SearchWapper>
                <AnalyticsSearchBox
                    SearchType={'default'}
                    HandleGetList={() => getTableList()}
                    HandleInstNo={instNo => {
                        setRiskFctrCountListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                INST_NO: String(instNo),
                            },
                        }))
                    }}
                    HandleStartDate={e => {
                        setRiskFctrCountListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                BGNDE: e,
                            },
                        }))
                    }}
                    StartDate={riskFctrCountListState.search.BGNDE}
                    HandleEndDate={e => {
                        setRiskFctrCountListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                ENDDE: e,
                            },
                        }))
                    }}
                    EndDate={riskFctrCountListState.search.ENDDE}
                    AgeGroup={riskFctrCountListState.search.AGEGROUP}
                    HandleAgeGroup={e => {
                        setRiskFctrCountListState(prevState => ({
                            ...prevState,
                            search: {
                                ...prevState.search,
                                AGEGROUP: e,
                            },
                        }))
                    }}
                    Cycle={riskFctrCountListState.search.CYCLE}
                    HandleCycle={e => {
                        setRiskFctrCountListState(prevState => ({
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
                <RiskFctrCountTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrCountMain
