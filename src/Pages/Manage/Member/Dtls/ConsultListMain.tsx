import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { getMberCnsltlist } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import ConsultSearchBox from './ConsultSearchBox'
import ConsultManageBox from './ConsultManageBox'
import ConsultListTable from './ConsultListTable'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ConsultListMain = () => {
    const [listState, setListState] = useRecoilState(ConsultListState)

    const handleGetList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { curPage, searchKey, instNo, riskFctr, endDt, startDt },
        } = listState

        const { status, payload } = await getMberCnsltlist({
            curPage: curPage,
            instNo: instNo,
            searchKey: searchKey,
            riskFctr: riskFctr,
            startDt: startDt,
            endDt: endDt,
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
    }, [setListState, listState])

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

        handleGetList().then()
    }

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') handleGetList().then()
        }

        pageStart()
    }, [handleGetList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <ConsultSearchBox HandleGetList={() => handleGetListButton()} />
            </SearchWapper>
            <ManageWapper>
                <ConsultManageBox />
            </ManageWapper>
            <TableWapper>
                <ConsultListTable CurrentPage={listState.search.curPage} />
            </TableWapper>
        </Container>
    )
}

export default ConsultListMain
