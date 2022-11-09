import { TableStyle } from '@Style/Elements/TableStyles'
import { TablePropsInterface } from '@Type/TableTypes'
import React from 'react'
import MainTableHeader from './MainTableHeader'
import MainTableBody from './MainTableBody'
import { ElementLoading } from '@Elements'

const { TableWapper, TableHeader, TableBody } = TableStyle

export default function MainTable<P>({
    Loading,
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
                {Loading ? (
                    <div className="h-screen">
                        <ElementLoading />
                    </div>
                ) : (
                    <MainTableBody
                        Loading={Loading}
                        Columns={Columns}
                        Options={Options}
                        Lists={Lists}
                    />
                )}
            </TableBody>
        </TableWapper>
    )
}
