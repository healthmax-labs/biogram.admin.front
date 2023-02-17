import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    JoinTableConfig,
    JoinTableListItemInterface,
} from '@Common/TableConfig/Manage/Inst'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { InstJoinListState } from '@Recoil/InstPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<JoinTableListItemInterface>
    Columns: Array<ColumnsInterface<JoinTableListItemInterface>[]>
    Lists: JoinTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const [listState, setListState] = useRecoilState(InstJoinListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(JoinTableConfig)

    const handleRowClick = () => {
        //
    }

    // 리스트 체크박스 클릭
    const handleCheckRow = (e: string[]) => {
        setListState(prevState => ({
            ...prevState,
            manage: {
                ...prevState.manage,
                checkRow: e,
            },
        }))
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.PSTINST_REQUEST_INFO_LIST,
        }))
    }, [listState.list.PSTINST_REQUEST_INFO_LIST, listState.status])

    return (
        <MainTable
            {...tableOptions}
            RowClick={handleRowClick}
            CheckedRow={e => handleCheckRow(e)}
        />
    )
}

export default ListTable
