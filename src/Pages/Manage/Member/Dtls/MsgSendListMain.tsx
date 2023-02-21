import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './MsgSendSearchBox'
import ManageBox from './MsgSendManageBox'
import ListTable from './MsgSendListTable'
import { getMsgSendList } from '@Service/MsgService'
import { useRecoilState } from 'recoil'
import { MsgSendListState } from '@Recoil/MemberPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const MsgSendListMain = () => {
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)

    const getTableList = useCallback(async () => {
        const {
            search: {
                curPage,
                INST_NO,
                SEARCH_KEY,
                FROM_MONTH,
                FROM_DAY,
                TO_DAY,
                SNDNG_FAILR,
                SNDNG_STDR,
            },
        } = msgSendListState

        const { status, payload } = await getMsgSendList({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            SEARCH_KEY: SEARCH_KEY,
            FROM_MONTH: FROM_MONTH,
            FROM_DAY: FROM_DAY,
            TO_DAY: TO_DAY,
            SNDNG_FAILR: SNDNG_FAILR,
            SNDNG_STDR: SNDNG_STDR,
        })

        if (status) {
            setMsgSendListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setMsgSendListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    SMS_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [msgSendListState, setMsgSendListState])

    useEffect(() => {
        const pageStart = () => {
            if (msgSendListState.status == 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, msgSendListState.status])
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

export default MsgSendListMain
