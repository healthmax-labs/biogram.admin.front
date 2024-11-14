import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    StplatTableConfig,
    StplatTableListItemInterface,
} from '@Common/TableConfig/Manage/Manage'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StplatDetailState, StplatListState } from '@Recoil/ManagerPagesState'
import { useTab } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<StplatTableListItemInterface>
    Columns: Array<ColumnsInterface<StplatTableListItemInterface>[]>
    Lists: StplatTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const listState = useRecoilValue(StplatListState)
    const resetDetailState = useResetRecoilState(StplatDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(StplatTableConfig)

    const handleRowClick = (element: StplatTableListItemInterface) => {
        resetDetailState()
        handleDeleteTabbyMatchRouter(
            '/manage/manager/stplat/:seCode/:kndCode/:SN/:STPLAT/stplat'
        )
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/manager/stplat/${element.STPLAT_SE_CODE}/${element.STPLAT_KND_CODE}/${element.STPLAT_SN}/detail`,
        })
    }

    const handleButtonClick = ({
        code,
        element,
    }: {
        code: string
        element: StplatTableListItemInterface
    }) => {
        if (code === 'stplat') {
            resetDetailState()
            handleDeleteTabbyMatchRouter(
                '/manage/manager/stplat/:seCode/:kndCode/:SN/detail'
            )
            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/manager/stplat/${element.STPLAT_SE_CODE}/${element.STPLAT_KND_CODE}/${element.STPLAT_SN}/STPLAT/stplat`,
            })
        }
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.STPLAT_MANAGE_INFO_LIST,
        }))
    }, [listState.list.STPLAT_MANAGE_INFO_LIST, listState.status])

    return (
        <MainTable
            {...tableOptions}
            RowClick={handleRowClick}
            ButtonClick={({ code, Element }) =>
                handleButtonClick({ code: code, element: Element })
            }
        />
    )
}

export default ListTable
