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
import _ from 'lodash'

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

    useEffect(() => {
        const funcSetSearchNameList = (name: string) => {
            if (_.isEmpty(name)) {
                setTableOptions(prevState => ({
                    ...prevState,
                    Lists: listState.list.INST_INFO_LIST,
                }))
            } else {
                setTableOptions(prevState => ({
                    ...prevState,
                    Lists: listState.list.INST_INFO_LIST.filter(
                        v =>
                            _.includes(
                                v.INST_NM_1.toLowerCase(),
                                name.toLowerCase()
                            ) ||
                            _.includes(
                                v.INST_NM_2.toLowerCase(),
                                name.toLowerCase()
                            ) ||
                            _.includes(
                                v.INST_NM_3.toLowerCase(),
                                name.toLowerCase()
                            )
                    ),
                }))
            }
        }

        if (listState.status === 'success') {
            funcSetSearchNameList(listState.search.searchName)
        }
    }, [
        listState.list.INST_INFO_LIST,
        listState.search.searchName,
        listState.status,
    ])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
