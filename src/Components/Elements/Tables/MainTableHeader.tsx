import React from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { VaryCheckBox } from '@Element/index'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { WidthType } from '@Type/CommonTypes'

const { HeaderRow, HeaderCell } = TableStyle

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
                    <HeaderRow
                        key={`main-table-head-row-${rowIndex}`}
                        Step={rowIndex}>
                        {rowIndex === 0 && Options.selectAll && (
                            <HeaderCell
                                key={`main-table-head-checkbox-cell-${rowIndex}`}
                                rowSpan={Rows.length}
                                cellWidth={`w10`}>
                                <VaryCheckBox
                                    Flex={false}
                                    Checked={AllChecked}
                                    HandleOnChange={e => {
                                        HandleClickAllCheckBox(e.target.checked)
                                    }}
                                />
                            </HeaderCell>
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
                                    }
                                    cellWidth={column.cellWidth as WidthType}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: column.name,
                                        }}
                                    />
                                </HeaderCell>
                            )
                        })}
                        {Options.xcpt &&
                            Options.xcpt.option &&
                            Options.xcpt.option === 'row-button' && (
                                <HeaderCell
                                    key={`main-table-head-checkbox-cell-${rowIndex}`}
                                    rowSpan={Rows.length}
                                    cellWidth={`w10`}>
                                    {`관리`}
                                </HeaderCell>
                            )}
                    </HeaderRow>
                )
            })}
        </>
    )
}

export default MainTableHeader
