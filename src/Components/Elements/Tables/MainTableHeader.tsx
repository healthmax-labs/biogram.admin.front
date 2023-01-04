import React from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { VaryCheckBox } from '@Element/index'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'

const { HeaderRow, HeaderCell, HeaderCheckbox, HeaderCheckboxItem } = TableStyle

const MainTableHeader = <E,>({
    AllChecked,
    Columns,
    Options,
    HandleClickAllCheckBox,
}: {
    AllChecked: boolean
    Columns: ColumnsInterface<E>[]
    Options: OptionsInterface
    HandleClickAllCheckBox: (checked: boolean) => void
}) => {
    return (
        <HeaderRow>
            {Options.selectAll && (
                <HeaderCheckbox>
                    <HeaderCheckboxItem>
                        <VaryCheckBox
                            Checked={AllChecked}
                            HandleOnChange={e => {
                                HandleClickAllCheckBox(e.target.checked)
                            }}
                        />
                    </HeaderCheckboxItem>
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
