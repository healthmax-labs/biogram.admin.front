import { TableStyle } from '@Style/Elements/TableStyles'
import React from 'react'
import { MainTableBodyPropsInterface } from '@Type/TableTypes'
import { VaryCheckBox } from '@Element/index'
import _ from 'lodash'

const { TableBodyCell, TbodyTdCheckbox, TableBodyRow } = TableStyle

const MainTableBody = <P,>({
    RowClick,
    Options,
    Columns,
    Lists,
    CheckedRows,
    RowCheckBoxClick,
}: MainTableBodyPropsInterface<P>) => {
    return (
        <>
            {Lists.map((Row: P, index) => {
                return (
                    <TableBodyRow
                        key={`main-table-body-row-${index}`}
                        BgState={index % 2 === 0}>
                        {Options.selectAll && (
                            <TbodyTdCheckbox>
                                <VaryCheckBox
                                    Checked={(() => {
                                        const indexKeyValue = _.get(
                                            Row,
                                            Options.indexKey
                                        )

                                        const chFindIndex = _.findIndex(
                                            CheckedRows,
                                            e => {
                                                return (
                                                    e == String(indexKeyValue)
                                                )
                                            },
                                            0
                                        )
                                        return chFindIndex > -1
                                    })()}
                                    HandleOnChange={e =>
                                        RowCheckBoxClick({
                                            checked: e.target.checked,
                                            Element: Row,
                                        })
                                    }
                                />
                            </TbodyTdCheckbox>
                        )}
                        {Columns.map((Column, i) => {
                            const value = _.get(Row, Column.key)

                            return (
                                <TableBodyCell
                                    onClick={() => RowClick(Row)}
                                    key={`main-table-body-cell-${i}`}>
                                    {Column.component
                                        ? Column.component({ el: Row })
                                        : value}
                                </TableBodyCell>
                            )
                        })}
                    </TableBodyRow>
                )
            })}
        </>
    )
}

export default MainTableBody
