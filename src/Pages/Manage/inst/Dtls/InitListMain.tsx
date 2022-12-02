import React, { useCallback } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/MemberPageStyles'
import SearchBox from '@Page/Manage/inst/Dtls/InitListSearchBox'
import ManageBox from '@Page/Manage/inst/Dtls/InitListManageBox'
import ListTable from '@Page/Manage/inst/Dtls/JoinListTable'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const InitListMain = () => {
    const getTableList = useCallback(() => {
        //
    }, [])

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

export default InitListMain
