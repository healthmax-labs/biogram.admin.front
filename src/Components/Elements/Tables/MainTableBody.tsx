import React from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { MainTableBodyPropsInterface } from '@Type/TableTypes'
import { VaryCheckBox } from '@Element/index'
import _ from 'lodash'

const { TbodyCell, TbodyRow } = TableStyle

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
                        BgState={Options.bgState && index % 2 === 0}>
                        {Options.selectAll && (
                            <TbodyCell>
                                <VaryCheckBox
                                    Flex={false}
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
                            </TbodyCell>
                        )}

                        {(() => {
                            // 예외 옵션 치리.
                            // 옵션 중에 Row 가 null 이면 xcpt component 실행.
                            if (
                                Options.xcpt &&
                                Options.xcpt.option &&
                                Options.xcpt.option === 'row-null' &&
                                _.isEmpty(
                                    Columns[listLastIndex]
                                        .map(xcpt => {
                                            if (xcpt.key) {
                                                return _.get(Row, xcpt.key)
                                            } else {
                                                return ''
                                            }
                                        })
                                        .filter(e => e)
                                )
                            ) {
                                return (
                                    <TbodyCell
                                        colSpan={Columns[listLastIndex].length}>
                                        {Options.xcpt.component
                                            ? Options.xcpt.component({
                                                  el: Row,
                                              })
                                            : ''}
                                    </TbodyCell>
                                )
                            } else {
                                {
                                    return Columns[listLastIndex].map(
                                        (Column, i) => {
                                            if (Column.key) {
                                                const value = _.get(
                                                    Row,
                                                    Column.key
                                                )
                                                return (
                                                    <TbodyCell
                                                        onClick={() =>
                                                            RowClick(Row)
                                                        }
                                                        key={`main-table-body-cell-${i}`}
                                                        textAlign={
                                                            Column.textAlign
                                                                ? Column.textAlign
                                                                : ''
                                                        }>
                                                        {Column.component
                                                            ? Column.component({
                                                                  el: Row,
                                                              })
                                                            : value}
                                                    </TbodyCell>
                                                )
                                            }

                                            return <></>
                                        }
                                    )
                                }
                            }
                        })()}
                    </TbodyRow>
                )
            })}
        </>
    )
}

export default MainTableBody
