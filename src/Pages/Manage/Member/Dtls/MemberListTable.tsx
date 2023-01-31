import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MemberTableConfig,
    tableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { MemberDetailState, MemberListState } from '@Recoil/MemberPagesState'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface<tableListItemInterface>
    Columns: Array<ColumnsInterface<tableListItemInterface>[]>
    Lists: tableListItemInterface[]
}

const MemberListTable = () => {
    const navigate = useNavigate()

    const [listState, setListState] = useRecoilState(MemberListState)
    const detailState = useRecoilValue(MemberDetailState)
    const detailReset = useResetRecoilState(MemberDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOptionInterface>(MemberTableConfig)

    const handleRowClick = (element: tableListItemInterface) => {
        if (detailState.MBER_NO !== element.MBER_NO) {
            detailReset()
        }

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.MBER_NO}/detail`,
        })
    }

    // 리시트 체크박스 클릭
    const handleCheckRow = (e: string[]) => {
        setListState(prevState => ({
            ...prevState,
            manage: {
                ...prevState.manage,
                checkRow: e,
            },
        }))
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.MBER_INFO_LIST,
        }))
    }, [listState.list.MBER_INFO_LIST, listState.status])

    return (
        <MainTable
            {...tableOptions}
            RowClick={e => handleRowClick(e)}
            CheckedRow={e => handleCheckRow(e)}
        />
    )
}

export default MemberListTable
