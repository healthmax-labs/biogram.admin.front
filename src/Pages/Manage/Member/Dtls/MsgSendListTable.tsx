import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MsgSendTableConfig,
    MsgSendTableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { useRecoilValue } from 'recoil'
import { MsgSendListState } from '@Recoil/MemberPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<MsgSendTableListItemInterface>
    Columns: Array<ColumnsInterface<MsgSendTableListItemInterface>[]>
    Lists: MsgSendTableListItemInterface[]
}

const ListTable = () => {
    const listState = useRecoilValue(MsgSendListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(MsgSendTableConfig)

    const handleRowClick = () => {
        //
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.SMS_INFO_LIST,
        }))
    }, [listState.list.SMS_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
