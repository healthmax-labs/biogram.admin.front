import React, { useEffect, useState } from 'react'
import { MainStyle, SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './RiskFctrSearchBox'
import ManageBox from './RiskFctrManageBox'
import ListTable from './RiskFctrListTable'
import { getRiskFctrList } from '@Service/RiskFctrService'
import { RiskFctrListItemInterface } from '@Type/RiskFctrTypes'
import { tableListItemInterface } from './RiskFctrTableConfig'

const { SearchWapper, TableWapper, ManageWapper } = MainStyle
const { Container } = SearchBoxStyle

const initializeState = {
    loading: true,
    memberList: [],
}

const ListMain = () => {
    const [pageState, setPageState] = useState<{
        loading: boolean
        memberList: tableListItemInterface[]
    }>(initializeState)

    const getTableList = async () => {
        const response = await getRiskFctrList({
            CUR_PAGE: 1,
            INST_NO: 0,
            SEARCH_KEY: '',
            BGNDE: '20190101',
            ENDDE: '20221201',
            RISK_FCTR_CNT: '1',
            RISK_FCTR: 'WS,BP,BS,TG,HD',
            TAKNG_MDCIN: 'OB,HP,DB,DP',
        })

        const listData: RiskFctrListItemInterface[] =
            response.payload.RISK_FCTR_INFO_LIST

        setPageState(prevState => ({
            ...prevState,
            loading: false,
            memberList: listData.map(_ => {
                return {
                    SLM_JDGMNT: _.SLM_JDGMNT,
                    TAKNG_MDCIN: _.TAKNG_MDCIN,
                    WAIST: _.WAIST,
                    DIASTOLIC: _.DIASTOLIC,
                    LDLC_JDGMNT: _.LDLC_JDGMNT,
                    MBER_NO: _.MBER_NO,
                    TG_JDGMNT: _.TG_JDGMNT,
                    LDLC: _.LDLC,
                    SYSTOLIC: _.SYSTOLIC,
                    TC_JDGMNT: _.TC_JDGMNT,
                    HDLC: _.HDLC,
                    BRTHDY: _.BRTHDY,
                    SEXDSTN: _.SEXDSTN,
                    PBF: _.PBF,
                    SLM: _.SLM,
                    EST_BN_MAS_JDGMNT: _.EST_BN_MAS_JDGMNT,
                    FBS: _.FBS,
                    HDLC_JDGMNT: _.HDLC_JDGMNT,
                    VFL: _.VFL,
                    DIASTOLIC_JDGMNT: _.DIASTOLIC_JDGMNT,
                    BMI: _.BMI,
                    FBS_JDGMNT: _.FBS_JDGMNT,
                    EST_BN_MAS: _.EST_BN_MAS,
                    BDWGH_JDGMNT: _.BDWGH_JDGMNT,
                    PULS: _.PULS,
                    SYSTOLIC_JDGMNT: _.SYSTOLIC_JDGMNT,
                    WAIST_JDGMNT: _.WAIST_JDGMNT,
                    TC: _.TC,
                    PBF_JDGMNT: _.PBF_JDGMNT,
                    PP2: _.PP2,
                    TG: _.TG,
                    BDWGH: _.BDWGH,
                    PP2_JDGMNT: _.PP2_JDGMNT,
                    RISK_FCTR: _.RISK_FCTR,
                    BMI_JDGMNT: _.BMI_JDGMNT,
                    VFL_JDGMNT: _.VFL_JDGMNT,
                    MESURE_DT: _.MESURE_DT,
                    NM: _.NM,
                }
            }),
        }))
    }

    useEffect(() => {
        const pageStart = () => {
            setPageState(prevState => ({
                ...prevState,
                loading: true,
            }))
            getTableList().then()
        }

        pageStart()
    }, [])
    return (
        <Container>
            <SearchWapper>
                <SearchBox />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable
                    MemberList={pageState.memberList}
                    Loading={pageState.loading}
                />
            </TableWapper>
        </Container>
    )
}

export default ListMain
