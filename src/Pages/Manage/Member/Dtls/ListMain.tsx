import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'
import { getMemberList } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { ListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'
import { gmtTimeToTimeObject } from '@Helper'
import { useMainLayouts } from '@Hook/index'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const ListMain = () => {
    const [listState, setListState] = useRecoilState(ListState)
    const { handlMainAlert } = useMainLayouts()

    const getList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const {
            search: { searchKey, registDtFrom, registDtTo, instNo, curPage },
        } = listState

        const { year, monthPad, dayPad } = gmtTimeToTimeObject(new Date())

        const { status, payload } = await getMemberList({
            curPage: !isNull(curPage) ? curPage : 1,
            instNo: !isNull(instNo) ? instNo : '',
            searchKey: !isNull(searchKey) ? searchKey : '',
            registDtFrom: !isNull(registDtFrom)
                ? registDtFrom
                : `${year}${monthPad}${dayPad}`,
            registDtTo: !isNull(registDtTo)
                ? registDtTo
                : `${year}${monthPad}${dayPad}`,
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
    }, [handlMainAlert, listState, setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') getList().then()
        }

        pageStart()
    }, [getList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <SearchBox HandleGetList={() => getList()} />
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

export default ListMain
