import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MagazineTableConfig,
    MagazineTableListItemInterface,
} from './TableConfig'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { MagazineListState } from '@Recoil/ContentsPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<MagazineTableListItemInterface>[]
    Lists: MagazineTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(MagazineListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(MagazineTableConfig)

    const handleRowClick = (element: MagazineTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/contents/${element.MISN_STEP}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.magazineList.MISN_MAGAZINE_LIST,
        }))
    }, [listState.magazineList.MISN_MAGAZINE_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
