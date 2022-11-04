import React, { useEffect, useState } from 'react'
import { TablePropsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { TableConfig, tableListInterface } from './TableConfig'

export default function ListTable({
    MemberList,
}: {
    MemberList: tableListInterface[]
}) {
    const [tableOptions, setTableOptions] =
        useState<TablePropsInterface<tableListInterface>>(TableConfig)

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Lists: MemberList,
        }))
    }, [MemberList])

    return <MainTable {...tableOptions} />
}
