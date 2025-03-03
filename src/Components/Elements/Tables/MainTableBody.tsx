import React from 'react'
import { VaryButton } from '@Elements'
import { TableStyle } from '@Style/Elements/TableStyles'
import { MainTableBodyPropsInterface } from '@Type/TableTypes'
import { VaryCheckBox } from '@Element/index'
import _ from 'lodash'

const { TbodyCell, TbodyRow, CellText, CellTextBox } = TableStyle

const MainTableBody = <P,>({
    RowClick,
    Options,
    Columns,
    Lists,
    CheckedRows,
    RowCheckBoxClick,
    ButtonClick,
}: MainTableBodyPropsInterface<P>) => {
    return (
        <>
            {Lists.length > 0 ? (
                Lists.map((Row: P, index) => {
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
                                                        e ==
                                                        String(indexKeyValue)
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
                                            colSpan={
                                                Columns[listLastIndex].length
                                            }>
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
                                                                RowClick(
                                                                    Row,
                                                                    Column.key
                                                                        ? Column.key
                                                                        : ''
                                                                )
                                                            }
                                                            key={`main-table-body-cell-${i}`}
                                                            textAlign={
                                                                Column.textAlign
                                                                    ? Column.textAlign
                                                                    : ''
                                                            }>
                                                            {Column.component
                                                                ? Column.component(
                                                                      {
                                                                          el: Row,
                                                                      }
                                                                  )
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
                            {Options.xcpt &&
                                Options.xcpt.option &&
                                Options.xcpt.option === 'row-button' && (
                                    <TbodyCell>
                                        {Options.xcpt.buttons &&
                                            Options.xcpt.buttons.map(
                                                (xcpt, xindex) => {
                                                    return (
                                                        <VaryButton
                                                            key={`main-table-body-cell-button-${xindex}`}
                                                            ButtonType={`manage`}
                                                            HandleClick={() => {
                                                                if (
                                                                    ButtonClick
                                                                ) {
                                                                    ButtonClick(
                                                                        {
                                                                            code: `${xcpt.code}`,
                                                                            Element:
                                                                                Row,
                                                                        }
                                                                    )
                                                                }
                                                            }}
                                                            ButtonName={`${xcpt.name}`}
                                                        />
                                                    )
                                                }
                                            )}
                                    </TbodyCell>
                                )}
                        </TbodyRow>
                    )
                })
            ) : (
                <TbodyRow BgState={true}>
                    <TbodyCell colSpan={Columns[Columns.length - 1].length + 1}>
                        <CellTextBox>
                            <CellText className="text-xs">{`데이터가 존재 하지 않습니다`}</CellText>
                        </CellTextBox>
                    </TbodyCell>
                </TbodyRow>
            )}
        </>
    )
}

export default MainTableBody
