import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import SearchBox from './JoinListSearchBox'
import ManageBox from './JoinListManageBox'
import ListTable from './JoinListTable'
import { getInstJoinList } from '@Service/InstService'
import { useRecoilState } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import { isNull } from 'lodash'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const JoinListMain = () => {
    const [instJoinListState, setInstJoinListState] =
        useRecoilState(InstJoinListState)

    const getTableList = useCallback(async () => {
        setInstJoinListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const {
            search: { INST_NO, CUR_PAGE, SEARCH_KEY },
        } = instJoinListState

        const { status, payload } = await getInstJoinList({
            CUR_PAGE: !isNull(CUR_PAGE) ? String(CUR_PAGE) : '0',
            SEARCH_KEY: !isNull(SEARCH_KEY) ? String(SEARCH_KEY) : '',
            INST_NO: !isNull(INST_NO) ? String(INST_NO) : '',
        })

        if (status) {
            setInstJoinListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
                manage: {
                    checkRow: [],
                },
            }))
        } else {
            setInstJoinListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    PSTINST_REQUEST_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [instJoinListState, setInstJoinListState])

    useEffect(() => {
        const pageStart = () => {
            if (instJoinListState.status === 'idle') {
                getTableList().then()
            }
        }

        pageStart()
    }, [getTableList, instJoinListState.status])
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

export default JoinListMain
