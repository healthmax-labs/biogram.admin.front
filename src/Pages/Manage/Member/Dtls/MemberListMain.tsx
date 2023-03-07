import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import MemberListSearchBox from './MemberListSearchBox'
import MemberListManageBox from './MemberListManageBox'
import MemberListTable from './MemberListTable'
import { getMemberList } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const MemberListMain = () => {
    const [listState, setListState] = useRecoilState(MemberListState)

    const getList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { searchKey, registDtFrom, registDtTo, instNo, curPage },
        } = listState

        const { status, payload } = await getMemberList({
            curPage: curPage,
            instNo: instNo,
            searchKey: searchKey,
            registDtFrom: registDtFrom,
            registDtTo: registDtTo,
        })

        if (status) {
            setListState(prevState => ({
                ...prevState,
                status: 'success',
                list: payload,
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'failure',
                list: {
                    MBER_INFO_LIST: [],
                    TOTAL_COUNT: 0,
                },
            }))
        }
    }, [listState, setListState])

    // 다시 가지고 오거나 가지고 오는 버튼 클릭 처리.
    const handleGetListButton = () => {
        setListState(prevState => ({
            ...prevState,
            status: 'idle',
            search: {
                ...prevState.search,
                curPage: 1,
            },
        }))

        getList().then()
    }

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') getList().then()
        }

        pageStart()
    }, [getList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <MemberListSearchBox
                    HandleGetList={() => handleGetListButton()}
                />
            </SearchWapper>
            <ManageWapper>
                <MemberListManageBox
                    HandleGetList={() => handleGetListButton()}
                />
            </ManageWapper>
            <TableWapper>
                <MemberListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default MemberListMain
