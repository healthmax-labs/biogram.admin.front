import React, { useEffect, useState } from 'react'
import { MainStyle, SearchBoxStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'
import { getBrftrCmprList } from '@Service/BrftrCmprService'
import { BrftrCmprListItemInterface } from '@Type/BrftrCmprTypes'
import { tableListItemInterface } from './TableConfig'

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
        const response = await getBrftrCmprList({
            CUR_PAGE: 1,
            INST_NO: 0,
            SEARCH_KEY: '',
            BGNDE: '20190101',
            ENDDE: '20221201',
        })

        const listData: BrftrCmprListItemInterface[] =
            response.payload.MESURE_BRFTR_CMPR_INFO_LIST

        setPageState(prevState => ({
            ...prevState,
            loading: false,
            memberList: listData.map(_ => {
                return {
                    MBER_NO: _.MBER_NO,
                    TG_3: _.TG_3,
                    TG_2: _.TG_2,
                    TG_1: _.TG_1,
                    TG_0: _.TG_0,
                    WAIST_0: _.WAIST_0,
                    WAIST_1: _.WAIST_1,
                    WAIST_2: _.WAIST_2,
                    WAIST_3: _.WAIST_3,
                    BP_MESURE_DT_3: _.BP_MESURE_DT_3,
                    BP_MESURE_DT_2: _.BP_MESURE_DT_2,
                    BP_MESURE_DT_1: _.BP_MESURE_DT_1,
                    BP_MESURE_DT_0: _.BP_MESURE_DT_0,
                    BRTHDY: _.BRTHDY,
                    SEXDSTN: _.SEXDSTN,
                    FBS_MESURE_DT_0: _.FBS_MESURE_DT_0,
                    FBS_MESURE_DT_1: _.FBS_MESURE_DT_1,
                    FBS_MESURE_DT_MESURE_DT_2: _.FBS_MESURE_DT_MESURE_DT_2,
                    FBS_MESURE_DT_MESURE_DT_3: _.FBS_MESURE_DT_MESURE_DT_3,
                    HDLC_0: _.HDLC_0,
                    HDLC_1: _.HDLC_1,
                    HDLC_2: _.HDLC_2,
                    HDLC_3: _.HDLC_3,
                    BP_3: _.BP_3,
                    BP_2: _.BP_2,
                    BP_1: _.BP_1,
                    BP_0: _.BP_0,
                    TG_MESURE_DT_0: _.TG_MESURE_DT_0,
                    TG_MESURE_DT_1: _.TG_MESURE_DT_1,
                    TG_MESURE_DT_2: _.TG_MESURE_DT_2,
                    TG_MESURE_DT_3: _.TG_MESURE_DT_3,
                    FBS_0: _.FBS_0,
                    FBS_1: _.FBS_1,
                    FBS_2: _.FBS_2,
                    FBS_3: _.FBS_3,
                    HDLC_MESURE_DT_0: _.HDLC_MESURE_DT_0,
                    HDLC_MESURE_DT_1: _.HDLC_MESURE_DT_1,
                    HDLC_MESURE_DT_2: _.HDLC_MESURE_DT_2,
                    HDLC_MESURE_DT_3: _.HDLC_MESURE_DT_3,
                    WAIST_MESURE_DT_0: _.WAIST_MESURE_DT_0,
                    WAIST_MESURE_DT_1: _.WAIST_MESURE_DT_1,
                    WAIST_MESURE_DT_2: _.WAIST_MESURE_DT_2,
                    WAIST_MESURE_DT_3: _.WAIST_MESURE_DT_3,
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
