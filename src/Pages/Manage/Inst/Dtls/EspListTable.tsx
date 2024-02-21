import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { EapListItemInterface } from '@Type/InstTypes'
import { EapListState } from '@Recoil/InstPagesState'
import { useRecoilValue } from 'recoil'
import { EapTableConfig } from '@Common/TableConfig/Manage/Inst'
import { MainTable } from '@Element/index'
import { useTab } from '@Hook/index'
import { useNavigate } from 'react-router-dom'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<EapListItemInterface>
    Columns: Array<ColumnsInterface<EapListItemInterface>[]>
    Lists: EapListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(EapListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [tableOptions, setTableOptions] =
        useState<tableOption>(EapTableConfig)

    const handleRowClick = (element: EapListItemInterface) => {
        handleDeleteTabbyMatchRouter('/manage/inst/eap-list/new')

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/inst/eap-list/${element.EAP_INST_REGISTER_NO}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.EAP_INFO_LIST,
        }))
    }, [listState.list.EAP_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
