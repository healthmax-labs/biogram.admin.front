import React, { useEffect, useState } from 'react'
import { MainTable } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    NonMeasureTableConfig,
    NonMeasureTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { useNavigate } from 'react-router-dom'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<NonMeasureTableListItemInterface>
    Columns: Array<ColumnsInterface<NonMeasureTableListItemInterface>[]>
    Lists: NonMeasureTableListItemInterface[]
}

const NonMeasureListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(NonMeasureListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        NonMeasureTableConfig
    )

    const handleRowClick = (element: NonMeasureTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${element.MBER_NO}/mydata`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.NOT_MESURE_NTCN_INFO_LIST,
        }))
    }, [listState.list.NOT_MESURE_NTCN_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default NonMeasureListTable
