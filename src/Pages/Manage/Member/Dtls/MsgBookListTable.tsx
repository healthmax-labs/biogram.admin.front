import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MsgBookTableConfig,
    MsgBookTableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { useRecoilValue } from 'recoil'
import { MsgBookListState } from '@Recoil/MemberPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<MsgBookTableListItemInterface>
    Columns: Array<ColumnsInterface<MsgBookTableListItemInterface>[]>
    Lists: MsgBookTableListItemInterface[]
}

const ListTable = () => {
    const listState = useRecoilValue(MsgBookListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(MsgBookTableConfig)

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
