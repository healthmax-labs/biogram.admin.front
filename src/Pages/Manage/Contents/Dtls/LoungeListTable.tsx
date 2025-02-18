import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    LoungeTableConfig,
    LoungeTableListItemInterface,
} from '@Common/TableConfig/Manage/Contents'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { LoungeDetailState, LoungeListState } from '@Recoil/ContentsPagesState'
import { useTab } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<LoungeTableListItemInterface>
    Columns: Array<ColumnsInterface<LoungeTableListItemInterface>[]>
    Lists: LoungeTableListItemInterface[]
}

const ListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const { handleDeleteTabbyMatchRouter } = useTab()
    const navigate = useNavigate()
    const [listState, setListState] = useRecoilState(LoungeListState)
    const resetDetail = useResetRecoilState(LoungeDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(LoungeTableConfig)

    const handlePaginationClick = ({ pageNumber }: { pageNumber: number }) => {
        console.log(`pagination clicked pageNumber:${pageNumber}`)
        if (pageNumber == 1) {
            setListState(prevState => ({
                ...prevState,
                status: 'idle',
                search: {
                    ...prevState.search,
                    page: pageNumber,
                },
            }))
        } else {
            setListState(prevState => ({
                ...prevState,
                status: 'idle',
                search: {
                    ...prevState.search,
                    page: pageNumber,
                },
            }))
        }

        navigate({
            pathname: process.env.PUBLIC_URL + `/manage/contents/lounge-list`,
        })
    }

    const handleRowClick = (element: LoungeTableListItemInterface) => {
        handleDeleteTabbyMatchRouter(`/manage/contents/lounge/new`)
        resetDetail()
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/contents/lounge/${element.postId}/detail`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.loungeList.MIND_LOUNGE_LIST,
        }))
    }, [listState.loungeList.MIND_LOUNGE_LIST, listState.status])

    return (
        <MainTable
            {...tableOptions}
            RowClick={handleRowClick}
            TotalCount={listState.loungeList.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
        />
    )
}

export default ListTable
