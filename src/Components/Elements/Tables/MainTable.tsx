import { TableStyle } from '@Style/Elements/TableStyles'
import { TablePropsInterface } from '@Type/TableTypes'
import React from 'react'
import MainTableHeader from './MainTableHeader'
import MainTableBody from './MainTableBody'
import { ElementLoading } from '@Elements'

const { TableWapper, TableHeader, TableBody } = TableStyle

const MainTable = <P,>({
    RowClick,
    Loading,
    Columns,
    Options,
    Lists,
}: TablePropsInterface<P>) => {
    return (
        <>
            {Loading ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableWapper>
                    <TableHeader>
                        <MainTableHeader Columns={Columns} Options={Options} />
                    </TableHeader>
                    <TableBody>
                        <MainTableBody
                            RowClick={RowClick}
                            Loading={Loading}
                            Columns={Columns}
                            Options={Options}
                            Lists={Lists}
                        />
                    </TableBody>
                </TableWapper>
            )}
        </>
    )
}

export default MainTable
