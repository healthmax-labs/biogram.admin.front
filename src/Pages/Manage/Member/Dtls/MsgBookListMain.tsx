import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './MsgBookSearchBox'
import ManageBox from './MsgBookManageBox'
import ListTable from './MsgBookListTable'
import { getMsgBookList } from '@Service/MsgService'
import { useRecoilState } from 'recoil'
import { MsgBookListState } from '@Recoil/MemberPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const MsgBookListMain = () => {
    const [msgBookListState, setMsgBookListState] =
        useRecoilState(MsgBookListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                curPage,
                INST_NO,
                SEARCH_KEY,
                FROM_DAY,
                TO_DAY,
                SNDNG_STDR,
            },
        } = msgBookListState

        const { status, payload } = await getMsgBookList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            FROM_DAY: FROM_DAY,
            TO_DAY: TO_DAY,
            SNDNG_STDR: SNDNG_STDR,
        })

        if (status) {
            setMsgBookListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setMsgBookListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    SMS_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [msgBookListState, setMsgBookListState])

    useEffect(() => {
        const pageStart = () => {
            if (msgBookListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, msgBookListState.status])
    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox HandleGetList={() => getTableList()} />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default MsgBookListMain
