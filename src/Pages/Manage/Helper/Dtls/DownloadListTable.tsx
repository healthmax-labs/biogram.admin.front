import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { HelperDownloadListItemInterface } from '@Type/HelperTypes'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import {
    DownloadListState,
    DownloadlistDetailState,
} from '@Recoil/HelperPageState'
import React, { useEffect, useState } from 'react'
import { DownloadListTableConfig } from '@Common/TableConfig/Manage/Helper'
import { MainTable } from '@Element/index'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HelperDownloadListItemInterface>
    Columns: Array<ColumnsInterface<HelperDownloadListItemInterface>[]>
    Lists: HelperDownloadListItemInterface[]
}

const DownloadListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(DownloadListState)
    const listStateReset = useResetRecoilState(DownloadlistDetailState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [tableOptions, setTableOptions] = useState<tableOption>(
        DownloadListTableConfig
    )

    const handleRowClick = (element: HelperDownloadListItemInterface) => {
        handleDeleteTabbyMatchRouter('/manage/helper/download-list/new')
        listStateReset()

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/helper/download-list/${element.POST_ID}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list,
        }))
    }, [listState.list, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default DownloadListTable
