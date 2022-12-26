import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { StplatTableConfig, StplatTableListItemInterface } from './TableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StplatListState } from '@Recoil/ManagerPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<StplatTableListItemInterface>[]
    Lists: StplatTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()

    const listState = useRecoilValue(StplatListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(StplatTableConfig)

    const handleRowClick = (element: StplatTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/manager/stplat/${element.STPLAT_SN}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.memberList.STPLAT_MANAGE_INFO_LIST,
        }))
    }, [listState.memberList.STPLAT_MANAGE_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
