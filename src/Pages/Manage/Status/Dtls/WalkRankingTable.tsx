import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainTable } from '@Elements'

import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    WalkRankingTableConfig,
    WalkRankingTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<WalkRankingTableListItemInterface>
    Columns: Array<ColumnsInterface<WalkRankingTableListItemInterface>[]>
    Lists: WalkRankingTableListItemInterface[]
}

const WalkRankingTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(WalkRankingListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        WalkRankingTableConfig
    )

    const handleRowClick = (element: WalkRankingTableListItemInterface) => {
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
            Lists: listState.list.STEP_RANK_INFO_LIST,
        }))
    }, [listState.list.STEP_RANK_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default WalkRankingTable
