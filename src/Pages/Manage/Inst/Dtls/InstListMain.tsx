import React, { useCallback, useEffect } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/Inst/Dtls/InstListSearchBox'
import ManageBox from '@Page/Manage/Inst/Dtls/InstListManageBox'
import ListTable from '@Page/Manage/Inst/Dtls/InstListTable'
import { getInstList } from '@Service/InstService'
import { useRecoilState } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InstListMain = () => {
    const [listState, setListState] = useRecoilState(InstListState)

    const getTableList = useCallback(async () => {
        setListState(prevState => ({
            ...prevState,
            status: 'loading',
        }))
        const { status, payload } = await getInstList()

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
    }, [setListState])

    useEffect(() => {
        const pageStart = () => {
            if (listState.status !== 'success') {
                getTableList().then()
            }
        }
        pageStart()
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
                <ListTable />
            </TableWapper>
        </Container>
    )
}

export default InstListMain
