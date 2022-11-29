import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { TableConfig, tableListItemInterface } from './TableConfig'
import { useNavigate } from 'react-router-dom'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface<tableListItemInterface>[]
    Lists: tableListItemInterface[]
}

const ListTable = ({
    Loading,
    MemberList,
}: {
    Loading: boolean
    MemberList: tableListItemInterface[]
}) => {
    const navigate = useNavigate()
    const [tableOptions, setTableOptions] = useState<tableOption>(TableConfig)

    const handleRowClick = (element: tableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.MBER_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: Loading,
            Lists: MemberList,
        }))
    }, [Loading, MemberList])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
