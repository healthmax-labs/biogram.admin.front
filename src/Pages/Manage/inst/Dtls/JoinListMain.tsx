import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './JoinListSearchBox'
import ManageBox from './JoinListManageBox'
import ListTable from './JoinListTable'
import { getInstJoinList } from '@Service/InstService'
import { useRecoilState } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import { isNull } from 'lodash'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const JoinListMain = () => {
    const [instJoinListState, setInstJoinListState] =
        useRecoilState(InstJoinListState)
    const { handlMainAlert } = useMainLayouts()

    const getTableList = useCallback(async () => {
        const {
            search: { INST_NO, CUR_PAGE, SEARCH_KEY },
        } = instJoinListState

        const { status, payload } = await getInstJoinList({
            CUR_PAGE: !isNull(CUR_PAGE) ? String(CUR_PAGE) : '0',
            INST_NO: !isNull(INST_NO) ? String(INST_NO) : '1254',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? String(SEARCH_KEY) : '',
            // INST_NO: !isNull(INST_NO) ? String(INST_NO) : '0',
        })

        if (status) {
            setInstJoinListState(prevState => ({
                ...prevState,
                status: 'success',
                memberList: payload,
            }))
        } else {
            setInstJoinListState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [handlMainAlert, instJoinListState, setInstJoinListState])

    useEffect(() => {
        const pageStart = () => {
            if (instJoinListState.status === 'idle') {
                getTableList().then()
            }
            getTableList().then()
        }

        pageStart()
    }, [getTableList, instJoinListState.status])
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

export default JoinListMain
