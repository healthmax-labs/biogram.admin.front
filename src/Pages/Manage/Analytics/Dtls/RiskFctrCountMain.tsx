import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import RiskFctrCountSearchBox from './RiskFctrCountSearchBox'
import RiskFctrCountTable from './RiskFctrCountTable'

import { useRecoilState } from 'recoil'
import { getRiskFctrCountAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrCountAnalyticsListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

const { SearchWapper, TableWapper } = MainStyle
const {
    ListPage: { Container },
} = PageContainerStyle

const RiskFctrCountMain = () => {
    const [
        riskFctrCountAnalyticsListState,
        setRiskFctrCountAnalyticsListState,
    ] = useRecoilState(RiskFctrCountAnalyticsListState)

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, BGNDE, ENDDE },
        } = riskFctrCountAnalyticsListState

        const { status, payload } = await getRiskFctrCountAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
        })

        if (status) {
            setRiskFctrCountAnalyticsListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrCountAnalyticsListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: null,
            }))
        }
    }, [riskFctrCountAnalyticsListState, setRiskFctrCountAnalyticsListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrCountAnalyticsListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, riskFctrCountAnalyticsListState.status])

    return (
        <Container>
            <SearchWapper>
                <RiskFctrCountSearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <TableWapper>
                <RiskFctrCountTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrCountMain
