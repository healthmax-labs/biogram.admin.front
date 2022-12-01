import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './BrftrCmprSearchBox'
import ManageBox from './BrftrCmprManageBox'
import ListTable from './BrftrCmprListTable'
import { getBrftrCmprList } from '@Service/StatusService'
import { useRecoilState } from 'recoil'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import { gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const BrftrCmprListMain = () => {
    const [brftrCmprListState, setBrftrCmprListState] =
        useRecoilState(BrftrCmprListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        const {
            search: { SEARCH_KEY, /*BGNDE,*/ ENDDE, INST_NO, curPage },
        } = brftrCmprListState

        const { year, monthPad, dayPad } = gmtTimeToTimeObject(new Date())

        const { status, payload } = await getBrftrCmprList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            // BGNDE: !isNull(BGNDE) ? BGNDE : `${year}${monthPad}${dayPad}`,
            BGNDE: `20211130`,
            ENDDE: !isNull(ENDDE) ? ENDDE : `${year}${monthPad}${dayPad}`,
        })

        if (status) {
            setBrftrCmprListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setBrftrCmprListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, brftrCmprListState, setBrftrCmprListState])

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
