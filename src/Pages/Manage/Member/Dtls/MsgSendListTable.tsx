import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MsgSendTableConfig,
    MsgSendTableListItemInterface,
} from './MsgTableConfig'
import { useRecoilValue } from 'recoil'
import { MsgSendListState } from '@Recoil/MsgPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<MsgSendTableListItemInterface>[]
    Lists: MsgSendTableListItemInterface[]
}

const ListTable = () => {
    const listState = useRecoilValue(MsgSendListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(MsgSendTableConfig)

    const handleRowClick = () => {
        console.log('1111111111111')
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.memberList.SMS_INFO_LIST,
        }))
    }, [listState.memberList.SMS_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
