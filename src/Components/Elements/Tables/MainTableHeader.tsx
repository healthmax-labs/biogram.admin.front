import React from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { DefaultCheckBox } from '@Element/index'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'

const { HeaderRow, HeaderCell, HeaderCheckbox } = TableStyle

const MainTableHeader = <E,>({
    Columns,
    Options,
}: {
    Columns: ColumnsInterface<E>[]
    Options: OptionsInterface
}) => {
    return (
        <HeaderRow>
            {Options.selectAll && (
                <HeaderCheckbox>
                    <DefaultCheckBox />
                </HeaderCheckbox>
            )}
            {Columns.map((_, i) => {
                return (
                    <HeaderCell key={`main-table-head-cell-${i}`}>
                        {_.name}
                    </HeaderCell>
                )
            })}
        </HeaderRow>
    )
}

export default MainTableHeader
