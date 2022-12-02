import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { InitTableConfig, InitTableListItemInterface } from './TableConfig'
import { useRecoilValue } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<InitTableListItemInterface>[]
    Lists: InitTableListItemInterface[]
}

const ListTable = () => {
    // const navigate = useNavigate()
    const listState = useRecoilValue(InstListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(InitTableConfig)

    const handleRowClick = (element: InitTableListItemInterface) => {
        console.debug(element)
        // navigate({
        //     pathname:
        //         process.env.PUBLIC_URL +
        //         `/manage/member/${element.MBER_NO}/detail`,
        // })
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
