import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrItemsTable from './RiskFctrItemsTable'
import { useRecoilState } from 'recoil'
import { getRiskFctrItemsAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrItemsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrItemsMain = () => {
    const [riskFctrItemsListState, setRiskFctrItemsListState] = useRecoilState(
        RiskFctrItemsListState
    )

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = riskFctrItemsListState

        const { status, payload } = await getRiskFctrItemsAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setRiskFctrItemsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrItemsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
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
                    HandleGetList={() => console.debug('HandleGetList')}
                    HandleInstNo={instNo => console.debug(instNo)}
                    StartDate={riskFctrItemsListState.search.BGNDE}
                    HandleStartDate={e => console.debug(e)}
                    EndDate={riskFctrItemsListState.search.ENDDE}
                    HandleEndDate={e => console.debug(e)}
                    AgeGroup={[]}
                    HandleAgeGroup={e => {
                        console.debug(e)
                    }}
                    Cycle={``}
                    HandleCycle={e => {
                        console.debug(e)
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
