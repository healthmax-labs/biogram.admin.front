import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    RiskFctrTableConfig,
    RiskFctrTableListItemInterface,
} from './StatusTableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { RiskFctrListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<RiskFctrTableListItemInterface>[]
    Lists: RiskFctrTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(RiskFctrListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(RiskFctrTableConfig)

    const handleRowClick = (element: RiskFctrTableListItemInterface) => {
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
            Lists: listState.list.RISK_FCTR_INFO_LIST,
        }))
    }, [listState.list.RISK_FCTR_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
