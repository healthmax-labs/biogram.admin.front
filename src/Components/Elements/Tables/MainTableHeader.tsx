import React from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { VaryCheckBox } from '@Element/index'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'

const { HeaderRow, HeaderCell, TbodyCellCheckbox, HeaderCheckboxItem } =
    TableStyle

const MainTableHeader = <E,>({
    AllChecked,
    Columns,
    Options,
    HandleClickAllCheckBox,
}: {
    AllChecked: boolean
    Columns: Array<ColumnsInterface<E>[]>
    Options: OptionsInterface<E>
    HandleClickAllCheckBox: (checked: boolean) => void
}) => {
    return (
        <>
            {Columns.map((Row, rowIndex, Rows) => {
                return (
                    <HeaderRow key={`main-table-head-row-${rowIndex}`}>
                        {rowIndex === 0 && Options.selectAll && (
                            <TbodyCellCheckbox
                                key={`main-table-head-checkbox-cell-${rowIndex}`}
                                rowSpan={Rows.length}>
                                <HeaderCheckboxItem>
                                    <VaryCheckBox
                                        Checked={AllChecked}
                                        HandleOnChange={e => {
                                            HandleClickAllCheckBox(
                                                e.target.checked
                                            )
                                        }}
                                    />
                                </HeaderCheckboxItem>
                            </TbodyCellCheckbox>
                        )}
                        {Row.map((column, columnIndex) => {
                            return (
                                <HeaderCell
                                    key={`main-table-head-cell-${columnIndex}`}
                                    rowSpan={
                                        column.rowSpan ? column.rowSpan : 1
                                    }
                                    colSpan={
                                        column.colSpan ? column.colSpan : 1
                                    }>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: column.name,
                                        }}
                                    />
                                </HeaderCell>
                            )
                        })}
                    </HeaderRow>
                )
            })}
        </>
    )
}

export default MainTableHeader
