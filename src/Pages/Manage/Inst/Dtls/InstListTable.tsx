import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    InitTableConfig,
    InitTableListItemInterface,
} from '@Common/TableConfig/Manage/Inst'
import { useRecoilValue } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hooks'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<InitTableListItemInterface>
    Columns: Array<ColumnsInterface<InitTableListItemInterface>[]>
    Lists: InitTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const listState = useRecoilValue(InstListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(InitTableConfig)

    const handleRowClick = (element: InitTableListItemInterface) => {
        // 등록 tab 리셋처리
        handleDeleteTabbyMatchRouter('/manage/inst/inst-list/new')

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/inst/inst-list/${element.INST_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.INST_INFO_LIST,
        }))
    }, [listState.list.INST_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
