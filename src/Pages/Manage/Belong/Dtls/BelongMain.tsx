import React from 'react'
import { Container, TableWapper, TopWapper } from '@Style/Pages/BelongMain'
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
        </Container>
    )
}
