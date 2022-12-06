import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './MsgSendSearchBox'
import ManageBox from './MsgSendManageBox'
import ListTable from './MsgSendListTable'
import { getMsgSendList } from '@Service/MsgService'
import { useRecoilState } from 'recoil'
import { MsgSendListState } from '@Recoil/MsgPagesState'
import { isNull } from 'lodash'
import { gmtTimeToTimeObject } from '@Helper'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const MsgSendListMain = () => {
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)
    const { handlMainAlert } = useMainLayouts()

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

        const { /*year, monthPad,*/ dayPad } = gmtTimeToTimeObject(new Date())

        const { status, payload } = await getMsgSendList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            FROM_MONTH: !isNull(FROM_MONTH) ? FROM_MONTH : `202211`,
            // FROM_MONTH: !isNull(FROM_MONTH) ? FROM_MONTH : `${year}${monthPad}`,
            FROM_DAY: !isNull(FROM_DAY) ? FROM_DAY : `01`,
            TO_DAY: !isNull(TO_DAY) ? TO_DAY : `${dayPad}`,
            SNDNG_FAILR: !isNull(SNDNG_FAILR) ? SNDNG_FAILR : '',
            SNDNG_STDR: !isNull(SNDNG_STDR) ? SNDNG_STDR : '',
        })

        if (status) {
            setMsgSendListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setMsgSendListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, msgSendListState, setMsgSendListState])

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
