import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { BudgetListItemInterface } from '@Type/MangerTypes'
import { MainTable } from '@Elements'
import { BudgetListTableConfig } from '@Common/TableConfig/Manage/Manage'
import { useRecoilValue } from 'recoil'
import { BudgetListState } from '@Recoil/ManagerPagesState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<BudgetListItemInterface>
    Columns: Array<ColumnsInterface<BudgetListItemInterface>[]>
    Lists: BudgetListItemInterface[]
}

const BudgetListTable = ({
    HandleDayHisoryModal,
}: {
    HandleDayHisoryModal: ({
        INST_NO,
        BUDGET_SN,
    }: {
        INST_NO: number
        BUDGET_SN: number
    }) => void
}) => {
    const listState = useRecoilValue(BudgetListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        BudgetListTableConfig
    )

    const handleRowClick = (
        element: BudgetListItemInterface,
        clickKey: string | null | undefined
    ) => {
        if (clickKey && clickKey === 'BUTTON') {
            HandleDayHisoryModal({
                INST_NO: element.INST_NO,
                BUDGET_SN: element.BUDGET_SN,
            })
        }
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status == `loading`,
            Lists: listState.list.BUDGET_ASIGN_INFO_LIST,
        }))
    }, [listState.list.BUDGET_ASIGN_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default BudgetListTable
