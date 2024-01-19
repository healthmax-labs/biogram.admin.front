import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { HelperNoticeListItemInterface } from '@Type/HelperTypes'
import { useRecoilValue } from 'recoil'
import { NoticeListState } from '@Recoil/HelperPageState'
import React, { useEffect, useState } from 'react'
import { NoticeTableConfig } from '@Common/TableConfig/Manage/Helper'
import { MainTable } from '@Element/index'
import { useNavigate } from 'react-router-dom'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HelperNoticeListItemInterface>
    Columns: Array<ColumnsInterface<HelperNoticeListItemInterface>[]>
    Lists: HelperNoticeListItemInterface[]
}

const NoticeListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(NoticeListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(NoticeTableConfig)

    const handleRowClick = (element: HelperNoticeListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/helper/notice/${element.POST_ID}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.POST_NOTICE_INFO,
        }))
    }, [listState.list.POST_NOTICE_INFO, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default NoticeListTable
