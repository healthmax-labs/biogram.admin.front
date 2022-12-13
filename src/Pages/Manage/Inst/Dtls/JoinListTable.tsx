import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { JoinTableConfig, JoinTableListItemInterface } from './TableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { InstJoinListState } from '@Recoil/InstPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<JoinTableListItemInterface>[]
    Lists: JoinTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(InstJoinListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(JoinTableConfig)

    const handleRowClick = (element: JoinTableListItemInterface) => {
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
            Lists: listState.memberList.PSTINST_REQUEST_INFO_LIST,
        }))
    }, [listState.memberList.PSTINST_REQUEST_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
