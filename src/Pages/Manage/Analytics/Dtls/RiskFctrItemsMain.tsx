import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import RiskFctrItemsSearchBox from './RiskFctrItemsSearchBox'
import RiskFctrItemsTable from './RiskFctrItemsTable'

import { useRecoilState } from 'recoil'
import { getRiskFctrItemsAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrItemsAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrItemsMain = () => {
    const [
        riskFctrItemsAnalyticsListState,
        setRiskFctrItemsAnalyticsListState,
    ] = useRecoilState(RiskFctrItemsAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = riskFctrItemsAnalyticsListState

        const { status, payload } = await getRiskFctrItemsAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setRiskFctrItemsAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrItemsAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
        console.log(riskFctrItemsAnalyticsListState)
    }, [riskFctrItemsAnalyticsListState, setRiskFctrItemsAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrItemsAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, riskFctrItemsAnalyticsListState.status])

    return (
        <Container>
            <SearchWapper>
                <RiskFctrItemsSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <RiskFctrItemsTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrItemsMain
