import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import { TableConfig, tableListItemInterface } from './TableConfig'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { DetailState, GetState } from '@Recoil/MemberPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface
    Columns: ColumnsInterface[]
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

    const detailGetState = useRecoilValue(GetState)
    const detailReset = useResetRecoilState(DetailState)

    const [tableOptions, setTableOptions] = useState<tableOption>(TableConfig)

    const handleRowClick = (element: tableListItemInterface) => {
        if (detailGetState.MBER_NO !== element.MBER_NO) {
            detailReset()
        }

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
