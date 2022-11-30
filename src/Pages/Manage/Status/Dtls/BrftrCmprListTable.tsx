import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    BrftrCmprTableConfig,
    BrftrCmprTableListItemInterface,
} from './StatusTableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<BrftrCmprTableListItemInterface>[]
    Lists: BrftrCmprTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(BrftrCmprListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(BrftrCmprTableConfig)

    const handleRowClick = (element: BrftrCmprTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.MBER_NO}/detail`,
        })
    }

    useEffect(() => {
        console.log('전후비교현황')
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            list: listState.list.MESURE_BRFTR_CMPR_INFO_LIST,
        }))
        console.log(listState.list.MESURE_BRFTR_CMPR_INFO_LIST)
    }, [listState.list.MESURE_BRFTR_CMPR_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
