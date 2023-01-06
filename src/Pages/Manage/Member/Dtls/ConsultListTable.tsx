import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    ConsultTableConfig,
    ConsulttableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { ConsultDetailState, ConsultListState } from '@Recoil/MemberPagesState'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface<ConsulttableListItemInterface>
    Columns: Array<ColumnsInterface<ConsulttableListItemInterface>[]>
    Lists: ConsulttableListItemInterface[]
}

const ConsultListTable = () => {
    const navigate = useNavigate()

    const listState = useRecoilValue(ConsultListState)
    const detailState = useRecoilValue(ConsultDetailState)
    const detailReset = useResetRecoilState(ConsultDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOptionInterface>(ConsultTableConfig)

    const handleRowClick = (element: ConsulttableListItemInterface) => {
        if (detailState.memNo !== element.MBER_NO) {
            detailReset()
        }

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
            Lists: listState.list.MBER_INFO_LIST,
        }))
    }, [listState.list.MBER_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ConsultListTable
