import SearchBox from './BrainListSearchBox'
import ManageBox from './BrainListManageBox'
import ListTable from './BrainListTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import React, { useCallback, useEffect } from 'react'
import { postStatsBrain } from '@Service/StatusService'
import { BrainListState } from '@Recoil/StatusPagesState'
import { useRecoilState } from 'recoil'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const BrainListMain = () => {
    const [listState, setListState] = useRecoilState(BrainListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            END_DE,
            INST_NO,
            SEARCH_KEY,
            INQUIRY_ITEMS,
            BEGIN_DE,
            curPage,
            CONDITIONS,
        } = listState.search

        const { status, payload } = await postStatsBrain({
            CUR_PAGE: curPage,
            INST_NO: INST_NO,
            BEGIN_DE: BEGIN_DE,
            END_DE: END_DE,
            INQUIRY_ITEMS: INQUIRY_ITEMS,
            CONDITIONS: CONDITIONS,
            SEARCH_KEY: SEARCH_KEY,
        })

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: {
                    TOTAL_COUNT: payload.TOTAL_COUNT,
                    BRAIN_STATE_LIST: payload.BRAIN_STATE_LIST,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    TOTAL_COUNT: 0,
                    BRAIN_STATE_LIST: [],
                },
            }))
        }
    }, [listState.search, setListState])

    useEffect(() => {
        const startPage = () => {
            if (listState.status == 'idle') {
                getTableList().then()
            }
        }

        startPage()
    }, [getTableList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getTableList()} />
            </SearchWapper>
            <ManageWapper>
                <ManageBox />
            </ManageWapper>
            <TableWapper>
                <ListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default BrainListMain
