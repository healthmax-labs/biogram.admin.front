import { TableStyle } from '@Style/Elements/TableStyles'
import React from 'react'
import { TablePropsInterface } from '@Type/TableTypes'
import { DefaultCheckBox } from '@Element/index'
import { get } from 'lodash'

const { TableBodyCell, TbodyTdCheckbox, TableBodyRow } = TableStyle

export default function MainTableBody<P>({
    Options,
    Columns,
    Lists,
}: TablePropsInterface<P>) {
    return (
        <>
            {Lists.map((el: P, index) => {
                return (
                    <TableBodyRow
                        key={`main-table-body-row-${index}`}
                        BgState={index % 2 === 0}>
                        {Options.selectAll && (
                            <TbodyTdCheckbox>
                                <DefaultCheckBox />
                            </TbodyTdCheckbox>
                        )}
                        {Columns.map((_, i) => {
                            const value = get(el, _.key)
                            return (
                                <TableBodyCell
                                    key={`main-table-body-cell-${i}`}>
                                    {value}
                                </TableBodyCell>
                            )
                        })}
                    </TableBodyRow>
                )
            })}
        </>
    )
}
