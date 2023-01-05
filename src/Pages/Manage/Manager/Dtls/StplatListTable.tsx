import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    StplatTableConfig,
    StplatTableListItemInterface,
} from '@Common/TableConfig/Manage/Manage'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StplatDetailState, StplatListState } from '@Recoil/ManagerPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: Array<ColumnsInterface<StplatTableListItemInterface>[]>
    Lists: StplatTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()

    const listState = useRecoilValue(StplatListState)
    const resetDetailState = useResetRecoilState(StplatDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(StplatTableConfig)

    const handleRowClick = (element: StplatTableListItemInterface) => {
        resetDetailState()
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/manager/stplat/${element.STPLAT_SE_CODE}/${element.STPLAT_KND_CODE}/${element.STPLAT_SN}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.STPLAT_MANAGE_INFO_LIST,
        }))
    }, [listState.list.STPLAT_MANAGE_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
