import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './MsgBookSearchBox'
import ManageBox from './MsgBookManageBox'
import ListTable from './MsgBookListTable'
import { getMsgBookList } from '@Service/MsgService'
import { useRecoilState } from 'recoil'
import { MsgBookListState } from '@Recoil/MsgPagesState'
import { isNull } from 'lodash'
// import { gmtTimeToTimeObject } from '@Helper'

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

        // const { year, monthPad, dayPad } = gmtTimeToTimeObject(new Date())

        const { status, payload } = await getMsgBookList({
            CUR_PAGE: !isNull(curPage) ? curPage : 1,
            INST_NO: !isNull(INST_NO) ? INST_NO : '',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? SEARCH_KEY : '',
            FROM_DAY: !isNull(FROM_DAY) ? FROM_DAY : `20221001`,
            TO_DAY: !isNull(TO_DAY) ? TO_DAY : `20230501`,
            // TO_DAY: !isNull(TO_DAY) ? TO_DAY : `${dayPad}`,
            SNDNG_STDR: !isNull(SNDNG_STDR) ? SNDNG_STDR : '',
        })

        if (status) {
            setMsgBookListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setMsgBookListState(prevState => ({
                ...prevState,
                status: 'failure',
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
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default MsgBookListMain
