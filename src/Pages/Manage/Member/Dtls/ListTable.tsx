import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { TableConfig, tableListItemInterface } from './TableConfig'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { DetailState, ListState } from '@Recoil/MemberPagesState'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<tableListItemInterface>[]
    Lists: tableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()

    const listState = useRecoilValue(ListState)
    const detailState = useRecoilValue(DetailState)
    const detailReset = useResetRecoilState(DetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOptionInterface>(TableConfig)

    const handleRowClick = (element: tableListItemInterface) => {
        if (detailState.MBER_NO !== element.MBER_NO) {
            detailReset()
        }

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.MBER_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.MBER_INFO_LIST,
        }))
    }, [listState.list.MBER_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
