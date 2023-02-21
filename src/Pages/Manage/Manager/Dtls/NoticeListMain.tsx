import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './NoticeSearchBox'
import ManageBox from './NoticeManageBox'
import ListTable from './NoticeListTable'
import { getNoticeList } from '@Service/NoticeService'
import { useRecoilState } from 'recoil'
import { NoticeListState } from '@Recoil/ManagerPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const NoticeListMain = () => {
    const [noticeListState, setNoticeListState] =
        useRecoilState(NoticeListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                CUR_PAGE,
                ITEM_COUNT,
                REGIST_DT,
                TRGET_SVC_CODE,
                TRGET_SVC_CODE_NM,
                USE_AT,
            },
        } = noticeListState

        const { status, payload } = await getNoticeList({
            CUR_PAGE: CUR_PAGE,
            ITEM_COUNT: ITEM_COUNT,
            REGIST_DT: REGIST_DT,
            TRGET_SVC_CODE: TRGET_SVC_CODE,
            TRGET_SVC_CODE_NM: TRGET_SVC_CODE_NM,
            USE_AT: USE_AT,
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
                contentsList: {
                    NOTICE_LIST: [],
                    TOTAL_COUNT: 0,
                },
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
