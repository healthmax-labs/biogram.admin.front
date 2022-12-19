import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import MemberListSearchBox from './MemberListSearchBox'
import MemberListManageBox from './MemberListManageBox'
import MemberListTable from './MemberListTable'
import { getMemberList } from '@Service/MemberService'
import { useRecoilState } from 'recoil'
import { MemberListState } from '@Recoil/MemberPagesState'
import { isNull } from 'lodash'
import { gmtTimeToTimeObject } from '@Helper'

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
        }
    }, [listState, setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status == 'idle') getList().then()
        }

        pageStart()
    }, [getList, listState.status])

    return (
        <Container>
            <SearchWapper>
                <MemberListSearchBox HandleGetList={() => getList()} />
            </SearchWapper>
            <ManageWapper>
                <MemberListManageBox />
            </ManageWapper>
            <TableWapper>
                <MemberListTable />
            </TableWapper>
        </Container>
    )
}

export default MemberListMain
