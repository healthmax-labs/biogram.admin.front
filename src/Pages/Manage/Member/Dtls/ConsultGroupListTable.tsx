import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { ConsultGroupTableConfig } from '@Common/TableConfig/Manage/Member'
import { ConsultGroupListResultItemInterface } from '@Type/MemberTypes'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ConsultGroupListState } from '@Recoil/MemberPagesState'
import { useNavigate } from 'react-router-dom'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface<ConsultGroupListResultItemInterface>
    Columns: Array<ColumnsInterface<ConsultGroupListResultItemInterface>[]>
    Lists: ConsultGroupListResultItemInterface[]
}

const ConsultGroupListTable = () => {
    const navigate = useNavigate()

    const [listState, setListState] = useRecoilState(ConsultGroupListState)
    const [tableOptions, setTableOptions] = useState<tableOptionInterface>(
        ConsultGroupTableConfig
    )

    const handleRowClick = (element: ConsultGroupListResultItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-group/${element.CNST_GRP_NO}/detail`,
        })
    }

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
            Lists: listState.list.CNST_GRP_LIST,
        }))
    }, [listState.list.CNST_GRP_LIST, listState.status])

    return (
        <MainTable
            {...tableOptions}
            RowClick={e => handleRowClick(e)}
            CheckedRow={e => handleCheckRow(e)}
        />
    )
}

export default ConsultGroupListTable
