import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import AnalyticsSearchBox from './AnalyticsSearchBox'
import RiskFctrCountTable from './RiskFctrCountTable'

import { useRecoilState } from 'recoil'
import { getRiskFctrCountAnalyticsList } from '@Service/AnalyticsService'
import { RiskFctrCountListState } from '@Recoil/AnalyticsPagesState'
import { isNull } from 'lodash'

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
            search: { INST_NO, BGNDE, ENDDE },
        } = riskFctrCountListState

        const { status, payload } = await getRiskFctrCountAnalyticsList({
            INST_NO: !isNull(INST_NO) ? INST_NO : '1000',
            BGNDE: !isNull(BGNDE) ? BGNDE : ``,
            ENDDE: !isNull(ENDDE) ? ENDDE : ``,
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
                list: null,
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
                    HandleGetList={() => console.debug('HandleGetList')}
                    HandleInstNo={instNo => console.debug(instNo)}
                    StartDate={riskFctrCountListState.search.BGNDE}
                    HandleStartDate={e => console.debug(e)}
                    EndDate={riskFctrCountListState.search.ENDDE}
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
                <RiskFctrCountTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrCountMain
