import React from 'react'
import { MainStyle } from '@Style/Pages/PublishPageStyle'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'

const { SearchWapper, TableWapper, ManageWapper, Container } = MainStyle

export default function ListMain() {
    return (
        <Container>
            <SearchWapper>
                <SearchBox />
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
