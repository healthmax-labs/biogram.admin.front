import React from 'react'
import {
    Container,
    PaginationWapper,
    TableWapper,
    TopWapper,
} from '@Style/Pages/BelongMain'
import { DefaultPagination } from '@Elements'
import BelongListTopBox from './BelongListTopBox'
import BelongListTable from './BelongListTable'
// import { ElementLoading } from '@Component/Elements/Loading'

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
