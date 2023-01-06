import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    StatisticsTableConfig,
    StatisticsTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StatisticsListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<StatisticsTableListItemInterface>
    Columns: Array<ColumnsInterface<StatisticsTableListItemInterface>[]>
    Lists: StatisticsTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(StatisticsListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        StatisticsTableConfig
    )

    const handleRowClick = (element: StatisticsTableListItemInterface) => {
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
            Lists: listState.list.DEVICE_MESURE_INFO_LIST,
        }))
    }, [listState.list.DEVICE_MESURE_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
