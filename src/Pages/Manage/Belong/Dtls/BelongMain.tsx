import React from 'react'
import {
    Container,
    PaginationWapper,
    TableWapper,
    TopWapper,
} from '@Style/Pages/BelongMain'
import { DefaultPagination } from '@Component/Elements/Paginations'
import BelongListTopBox from './BelongListTopBox'
import BelongListTable from './BelongListTable'

export default function BelongMain() {
    return (
        <Container>
            <TopWapper>
                <BelongListTopBox />
            </TopWapper>
            <TableWapper>
                <BelongListTable />
            </TableWapper>
            <PaginationWapper>
                <DefaultPagination />
            </PaginationWapper>
        </Container>
    )
}
