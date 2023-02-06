import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainTable } from '@Elements'

import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    HealthIndicatorsTableConfig,
    HealthIndicatorsTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { HealthIndicatorsListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HealthIndicatorsTableListItemInterface>
    Columns: Array<ColumnsInterface<HealthIndicatorsTableListItemInterface>[]>
    Lists: HealthIndicatorsTableListItemInterface[]
}

const NonMeasureTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(HealthIndicatorsListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        HealthIndicatorsTableConfig
    )

    const handleRowClick = (
        element: HealthIndicatorsTableListItemInterface
    ) => {
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
            Lists: listState.list.MYBODY_SCORE_IMPRVM_INFO_LIST,
        }))
    }, [listState.list.MYBODY_SCORE_IMPRVM_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default NonMeasureTable
