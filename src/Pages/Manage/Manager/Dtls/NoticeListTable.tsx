import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { NoticeTableConfig, NoticeTableListItemInterface } from './TableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { NoticeListState } from '@Recoil/NoticePagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<NoticeTableListItemInterface>[]
    Lists: NoticeTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(NoticeListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(NoticeTableConfig)

    const handleRowClick = (element: NoticeTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.NOTICE_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.contentsList.NOTICE_LIST,
        }))
    }, [listState.contentsList.NOTICE_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
