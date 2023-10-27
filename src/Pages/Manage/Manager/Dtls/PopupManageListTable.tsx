import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { PopupManageListItemInterface } from '@Type/MangerTypes'
import { MainTable } from '@Elements'
import { PopupManageTableConfig } from '@Common/TableConfig/Manage/Manage'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import {
    PopupManageListState,
    PopupManageDetailState,
} from '@Recoil/ManagerPagesState'
import { useTab } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<PopupManageListItemInterface>
    Columns: Array<ColumnsInterface<PopupManageListItemInterface>[]>
    Lists: PopupManageListItemInterface[]
}

const PopupManageListTable = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const listState = useRecoilValue(PopupManageListState)
    const resetPopupManageDetailState = useResetRecoilState(
        PopupManageDetailState
    )

    const [tableOptions, setTableOptions] = useState<tableOption>(
        PopupManageTableConfig
    )

    const handleRowClick = (element: PopupManageListItemInterface) => {
        resetPopupManageDetailState()
        handleDeleteTabbyMatchRouter('/manage/manager/popup-manage-list/new')
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/manager/popup-manage-list/${element.PK}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.POPUP_INFO,
        }))
    }, [listState.list.POPUP_INFO, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default PopupManageListTable
