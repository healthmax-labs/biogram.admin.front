import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import { getMberCnsltlist } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import SearchBox from './ConsultSearchBox'
import ManageBox from './ConsultManageBox'
import ListTable from './ConsultListTable'

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

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') handleGetList().then()
        }

        pageStart()
    }, [handleGetList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => handleGetList()} />
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

export default ConsultListMain
