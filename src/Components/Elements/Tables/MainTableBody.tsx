import { TableStyle } from '@Style/Elements/TableStyles'
import React from 'react'
import { MainTableBodyPropsInterface } from '@Type/TableTypes'
import { VaryCheckBox } from '@Element/index'
import _ from 'lodash'

const { TbodyCell, TbodyCellCheckbox, TbodyRow } = TableStyle

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
                const listLastIndex = Columns.length - 1
                return (
                    <TbodyRow
                        key={`main-table-body-row-${index}`}
                        BgState={index % 2 === 0}>
                        {Options.selectAll && (
                            <TbodyCellCheckbox>
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
                            </TbodyCellCheckbox>
                        )}

                        {Columns[listLastIndex].map((Column, i) => {
                            if (Column.key) {
                                const value = _.get(Row, Column.key)
                                return (
                                    <TbodyCell
                                        onClick={() => RowClick(Row)}
                                        key={`main-table-body-cell-${i}`}
                                        textAlign={
                                            Column.textAlign
                                                ? Column.textAlign
                                                : ''
                                        }>
                                        {Column.component
                                            ? Column.component({ el: Row })
                                            : value}
                                    </TbodyCell>
                                )
                            }

                            return <></>
                        })}
                    </TbodyRow>
                )
            })}
        </>
    )
}

export default MainTableBody
