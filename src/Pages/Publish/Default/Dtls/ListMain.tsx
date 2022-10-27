import React from 'react'
import {
    Container,
    ManageWapper,
    SearchWapper,
    TableWapper,
} from '@Style/Pages/PublishPage'
import SearchBox from './SearchBox'
import ManageBox from './ManageBox'
import ListTable from './ListTable'

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
