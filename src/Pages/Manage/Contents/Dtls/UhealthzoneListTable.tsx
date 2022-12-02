import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    UhealthzoneTableConfig,
    UhealthzoneTableListItemInterface,
} from './UhealthzoneTableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<UhealthzoneTableListItemInterface>[]
    Lists: UhealthzoneTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(UhealthzoneListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        UhealthzoneTableConfig
    )

    const handleRowClick = (element: UhealthzoneTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.UHEALTH_ZONE_NO}/detail`,
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
