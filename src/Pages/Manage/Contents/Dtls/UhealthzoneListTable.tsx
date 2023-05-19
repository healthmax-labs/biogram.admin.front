import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    UhealthzoneTableConfig,
    UhealthzoneTableListItemInterface,
} from '@Common/TableConfig/Manage/Contents'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import {
    UhealthzoneDetailState,
    UhealthzoneListState,
} from '@Recoil/ContentsPagesState'
import { useTab } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<UhealthzoneTableListItemInterface>
    Columns: Array<ColumnsInterface<UhealthzoneTableListItemInterface>[]>
    Lists: UhealthzoneTableListItemInterface[]
}

const ListTable = () => {
    const { handleDeleteTabbyMatchRouter } = useTab()
    const navigate = useNavigate()
    const listState = useRecoilValue(UhealthzoneListState)
    const resetDetail = useResetRecoilState(UhealthzoneDetailState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        UhealthzoneTableConfig
    )

    const handleRowClick = (element: UhealthzoneTableListItemInterface) => {
        handleDeleteTabbyMatchRouter(`/manage/contents/uhealthzone/new`)
        resetDetail()
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/contents/uhealthzone/${element.UHEALTH_ZONE_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.uhealthzoneList.UHEALTH_ZONE_LIST,
        }))
    }, [listState.uhealthzoneList.UHEALTH_ZONE_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
