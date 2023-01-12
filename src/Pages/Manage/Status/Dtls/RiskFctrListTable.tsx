import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    RiskFctrTableConfig,
    RiskFctrTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { RiskFctrListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<RiskFctrTableListItemInterface>
    Columns: Array<ColumnsInterface<RiskFctrTableListItemInterface>[]>
    Lists: RiskFctrTableListItemInterface[]
}

const RiskFctrListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(RiskFctrListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(RiskFctrTableConfig)

    const handleRowClick = (element: RiskFctrTableListItemInterface) => {
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
            Lists: listState.list.RISK_FCTR_INFO_LIST,
        }))
    }, [listState.list.RISK_FCTR_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default RiskFctrListTable
