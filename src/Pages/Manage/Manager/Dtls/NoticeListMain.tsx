import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './NoticeSearchBox'
import ManageBox from './NoticeManageBox'
import ListTable from './NoticeListTable'
import { getNoticeSendList } from '@Service/NoticeService'
import { useRecoilState } from 'recoil'
import { NoticeListState } from '@Recoil/NoticePagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const NoticeListMain = () => {
    const [noticeListState, setNoticeListState] =
        useRecoilState(NoticeListState)

    const getTableList = useCallback(async () => {
        const {
            search: { CUR_PAGE, ITEM_COUNT, TRGET_SVC_CODE, USE_AT },
        } = noticeListState

        const { status, payload } = await getNoticeSendList({
            CUR_PAGE: !isNull(CUR_PAGE) ? CUR_PAGE : 1,
            ITEM_COUNT: !isNull(ITEM_COUNT) ? ITEM_COUNT : 30,
            TRGET_SVC_CODE: !isNull(TRGET_SVC_CODE) ? TRGET_SVC_CODE : 1,
            USE_AT: !isNull(USE_AT) ? USE_AT : `A`,
        })

        if (status) {
            setNoticeListState(prevState => ({
                ...prevState,
                status: 'success',
                contentsList: payload,
            }))
        } else {
            setNoticeListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
        }
    }, [noticeListState, setNoticeListState])

    useEffect(() => {
        const pageStart = () => {
            if (noticeListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, noticeListState.status])
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

export default NoticeListMain
