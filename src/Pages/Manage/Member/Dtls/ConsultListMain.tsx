import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import { getMberCnsltlist } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { ConsultListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'
import { useMainLayouts } from '@Hook/index'
import SearchBox from './ConsultSearchBox'
import ManageBox from './ConsultManageBox'
import ListTable from './ConsultListTable'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ConsultListMain = () => {
    const [listState, setListState] = useRecoilState(ConsultListState)
    const { handlMainAlert } = useMainLayouts()
    const handleGetList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const { status, payload } = await getMberCnsltlist({
            curPage: 1,
            instNo: !isNull(listState.search.instNo)
                ? listState.search.instNo
                : ``,
            searchKey: !isNull(listState.search.searchKey)
                ? listState.search.searchKey
                : ``,
            riskFctr: !isNull(listState.search.riskFctr)
                ? listState.search.riskFctr
                : ``,
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
            }))
            // handlMainAlert({
            //     state: true,
            //     message: Messages.Default.stplatSuccess,
            // })
        }
    }, [
        handlMainAlert,
        listState.search.instNo,
        listState.search.riskFctr,
        listState.search.searchKey,
        setListState,
    ])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') handleGetList().then()
        }

        pageStart()
    }, [handleGetList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox
                    HandleGetList={() => console.debug('HandleGetList')}
                />
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
