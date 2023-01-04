import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    ActivityWalkTableConfig,
    ActivityWalkTableListItemInterface,
} from './TableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<ActivityWalkTableListItemInterface>[]
    Lists: ActivityWalkTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()

    const listState = useRecoilValue(ActivityWalkListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        ActivityWalkTableConfig
    )

    const handleRowClick = (element: ActivityWalkTableListItemInterface) => {
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
            Lists: listState.list.ACTIVITY_STATE_LIST,
        }))
    }, [listState.list.ACTIVITY_STATE_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
