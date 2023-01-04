import { TableStyle } from '@Style/Elements/TableStyles'
import { MainTablePropsInterface } from '@Type/TableTypes'
import React, { useEffect, useState } from 'react'
import MainTableHeader from './MainTableHeader'
import MainTableBody from './MainTableBody'
import { ElementLoading } from '@Elements'
import _ from 'lodash'

const { TableWapper, TableHeader, TableBody } = TableStyle

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
    CheckedRow,
}: MainTablePropsInterface<P>) => {
    const [pageState, setPageState] = useState<{
        checkedRow: string[]
        allChecked: boolean
    }>(initializeState)

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
        if (CheckedRow) {
            CheckedRow(pageState.checkedRow)
        }
    }, [CheckedRow, pageState.checkedRow])

    return (
        <>
            {Loading ? (
                <div className="h-[calc(100vh-10rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <TableWapper>
                    <TableHeader>
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
                    </TableHeader>
                    <TableBody>
                        <MainTableBody
                            RowClick={RowClick}
                            Loading={Loading}
                            Columns={Columns}
                            Options={Options}
                            Lists={Lists}
                            CheckedRows={pageState.checkedRow}
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
                                        checkedRow: prevState.checkedRow.filter(
                                            e => e !== String(indexKeyValue)
                                        ),
                                    }))
                                }
                            }}
                        />
                    </TableBody>
                </TableWapper>
            )}
        </>
    )
}

export default MainTable
