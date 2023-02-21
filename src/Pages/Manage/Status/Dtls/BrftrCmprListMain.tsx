import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './BrftrCmprSearchBox'
import ManageBox from './BrftrCmprManageBox'
import ListTable from './BrftrCmprListTable'
import { getBrftrCmprList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const BrftrCmprListMain = () => {
    const [brftrCmprListState, setBrftrCmprListState] =
        useRecoilState(BrftrCmprListState)

    const getTableList = useCallback(async () => {
        const {
            search: { SEARCH_KEY, BGNDE, ENDDE, INST_NO, curPage },
        } = brftrCmprListState

        const { status, payload } = await getBrftrCmprList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            BGNDE: BGNDE,
            ENDDE: ENDDE,
        })

        if (status) {
            setBrftrCmprListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setBrftrCmprListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    MESURE_BRFTR_CMPR_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [brftrCmprListState, setBrftrCmprListState])

    useEffect(() => {
        const pageStart = () => {
            if (brftrCmprListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, brftrCmprListState.status])
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

export default BrftrCmprListMain
