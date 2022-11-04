import { TableStyle } from '@Style/Elements/TableStyles'
import { TablePropsInterface } from '@Type/TableTypes'
import React from 'react'
import MainTableHeader from './MainTableHeader'
import MainTableBody from './MainTableBody'

const { TableWapper, TableHeader, TableBody } = TableStyle

export default function MainTable<P>({
    Columns,
    Options,
    Lists,
}: TablePropsInterface<P>) {
    return (
        <TableWapper>
            <TableHeader>
                <MainTableHeader Columns={Columns} Options={Options} />
            </TableHeader>
            <TableBody>
                <MainTableBody
                    Columns={Columns}
                    Options={Options}
                    Lists={Lists}
                />
            </TableBody>
        </TableWapper>
    )
}
