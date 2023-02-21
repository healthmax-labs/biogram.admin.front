import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './RiskFctrSearchBox'
import ManageBox from './RiskFctrManageBox'
import ListTable from './RiskFctrListTable'
import { getRiskFctrList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const RiskFctrListMain = () => {
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)
    const getTableList = useCallback(async () => {
        setRiskFctrListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
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

        const { status, payload } = await getRiskFctrList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
            RISK_FCTR_CNT: RISK_FCTR_CNT,
            RISK_FCTR: RISK_FCTR,
            TAKNG_MDCIN: TAKNG_MDCIN,
        })

        if (status) {
            setRiskFctrListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setRiskFctrListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    RISK_FCTR_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [riskFctrListState, setRiskFctrListState])

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
