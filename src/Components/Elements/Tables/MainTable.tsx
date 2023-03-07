import React, { useEffect, useRef, useState } from 'react'
import { TableStyle } from '@Style/Elements/TableStyles'
import { MainTablePropsInterface } from '@Type/TableTypes'
import MainTableHeader from './MainTableHeader'
import MainTableBody from './MainTableBody'
import { ElementLoading, VaryPagination } from '@Elements'
import _ from 'lodash'

const { Container, Wapper, Table, Tbody, PaginationWapper } = TableStyle

const initializeState = {
    checkedRow: [],
    allChecked: false,
}

const MainTable = <P,>({
    RowClick,
    Loading,
    Columns,
    Options,
    Lists,
    TotalCount,
    CheckedRow,
    ButtonClick,
    PaginationClick,
    CurrentPage,
}: MainTablePropsInterface<P>) => {
    const [pageState, setPageState] = useState<{
        checkedRow: string[]
        allChecked: boolean
    }>(initializeState)

    const checkRowRef = useRef<string[]>([])

    useEffect(() => {
        if (
            Lists.length > 0 &&
            pageState.checkedRow.length === Lists.length &&
            !pageState.allChecked
        ) {
            setPageState(prevState => ({
                ...prevState,
                allChecked: true,
            }))

            return
        }
        if (
            Lists.length > 0 &&
            pageState.checkedRow.length !== Lists.length &&
            pageState.allChecked
        ) {
            setPageState(prevState => ({
                ...prevState,
                allChecked: false,
            }))

            return
        }
    }, [Lists.length, pageState.allChecked, pageState.checkedRow])

    useEffect(() => {
        if (
            CheckedRow &&
            !_.isEqual(checkRowRef.current, pageState.checkedRow)
        ) {
            checkRowRef.current = pageState.checkedRow
            CheckedRow(pageState.checkedRow)
        }
    }, [CheckedRow, pageState.checkedRow])

    useEffect(() => {
        // 로딩시 스테이트 초기화
        if (Loading) {
            setPageState(initializeState)
        }
    }, [Loading])

    return (
        <Container>
            <Wapper>
                {Loading ? (
                    <div className="h-[calc(100vh-10rem)]">
                        <ElementLoading FullScreen={false} />
                    </div>
                ) : (
                    <Table
                        tableType={
                            Options.tableType && Options.tableType === `fixed`
                                ? `fixed`
                                : `auto`
                        }>
                        <Tbody>
                            <MainTableHeader
                                Columns={Columns}
                                Options={Options}
                                AllChecked={pageState.allChecked}
                                HandleClickAllCheckBox={e => {
                                    if (e) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkedRow: Lists.map(l => {
                                                return String(
                                                    _.get(l, Options.indexKey)
                                                )
                                            }),
                                        }))
                                    } else {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkedRow: [],
                                        }))
                                    }
                                }}
                            />
                            <MainTableBody
                                RowClick={RowClick}
                                Loading={Loading}
                                Columns={Columns}
                                Options={Options}
                                Lists={Lists}
                                CheckedRows={pageState.checkedRow}
                                ButtonClick={({ code, Element }) => {
                                    ButtonClick &&
                                        ButtonClick({
                                            code: code,
                                            Element: Element,
                                        })
                                }}
                                RowCheckBoxClick={({ checked, Element }) => {
                                    const indexKeyValue = _.get(
                                        Element,
                                        Options.indexKey
                                    )

                                    if (!indexKeyValue) return

                                    if (checked) {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkedRow: [
                                                ...pageState.checkedRow,
                                                String(indexKeyValue),
                                            ],
                                        }))
                                    } else {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            checkedRow:
                                                prevState.checkedRow.filter(
                                                    e =>
                                                        e !==
                                                        String(indexKeyValue)
                                                ),
                                        }))
                                    }
                                }}
                            />
                        </Tbody>
                    </Table>
                )}
            </Wapper>
            {Options.pagination && !Loading && (
                <PaginationWapper>
                    <VaryPagination
                        TotalCount={TotalCount ? TotalCount : 0}
                        CurrentPage={CurrentPage ? CurrentPage : 1}
                        PaginationClick={e =>
                            PaginationClick && PaginationClick(e)
                        }
                    />
                </PaginationWapper>
            )}
        </Container>
    )
}

export default MainTable
