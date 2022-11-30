import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './RiskFctrSearchBox'
import ManageBox from './RiskFctrManageBox'
import ListTable from './RiskFctrListTable'
import { getRiskFctrList } from '@Service/RiskFctrService'
import { useRecoilState } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import { gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const RiskFctrListMain = () => {
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        const {
            search: {
                SEARCH_KEY,
                BGNDE,
                ENDDE,
                INST_NO,
                curPage,
                RISK_FCTR_CNT,
                RISK_FCTR,
                TAKNG_MDCIN,
            },
        } = riskFctrListState

        const { year, monthPad, dayPad } = gmtTimeToTimeObject(new Date())

        const { status, payload } = await getRiskFctrList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BGNDE: !isNull(BGNDE) ? BGNDE : `${year}${monthPad}${dayPad}`,
            BGNDE: !isNull(BGNDE) ? BGNDE : `20211130`,
            ENDDE: !isNull(ENDDE) ? ENDDE : `${year}${monthPad}${dayPad}`,
            // RISK_FCTR_CNT: !isNull(RISK_FCTR_CNT) ? RISK_FCTR_CNT : '',
            RISK_FCTR_CNT: !isNull(RISK_FCTR_CNT) ? RISK_FCTR_CNT : '2',
            RISK_FCTR: !isNull(RISK_FCTR) ? RISK_FCTR : 'WS,BP,BS,TG,HD',
            TAKNG_MDCIN: !isNull(TAKNG_MDCIN) ? TAKNG_MDCIN : '',
        })

        if (status) {
            setRiskFctrListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setRiskFctrListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, riskFctrListState, setRiskFctrListState])

    useEffect(() => {
        const pageStart = () => {
            if (riskFctrListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, riskFctrListState.status])
    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default RiskFctrListMain
