import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    BrftrCmprTableConfig,
    BrftrCmprTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { BrftrCmprListState } from '@Recoil/StatusPagesState'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<BrftrCmprTableListItemInterface>
    Columns: Array<ColumnsInterface<BrftrCmprTableListItemInterface>[]>
    Lists: BrftrCmprTableListItemInterface[]
}

const BrftrCmprListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()

    const [listState, setListState] = useRecoilState(BrftrCmprListState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(BrftrCmprTableConfig)

    const handleRowClick = (element: BrftrCmprTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${element.MBER_NO}/mydata`,
        })
    }

    const handlePaginationClick = ({ pageNumber }: { pageNumber: number }) => {
        setListState(prevState => ({
            ...prevState,
            status: 'idle',
            search: {
                ...prevState.search,
                curPage: pageNumber,
            },
        }))

        navigate({
            pathname: process.env.PUBLIC_URL + `/manage/status/brftt-cmpr`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.MESURE_BRFTR_CMPR_INFO_LIST,
        }))
    }, [listState.list.MESURE_BRFTR_CMPR_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: BrftrCmprTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: BrftrCmprTableConfig.Columns.map(
                    (column: any, index) => {
                        if (index === 0) {
                            return _.slice(column, 1)
                            // return column
                        } else {
                            return _.filter(column, el => {
                                return el.key !== 'MBER_NO'
                            })
                        }
                    }
                ),
            }))
        }

        if (mainLayoutState.Theme === 'GeonDaon') {
            funcChangeGeonDaonMemberListOption()
        } else {
            funcChangeDefaultMemberListOption()
        }
    }, [mainLayoutState.Theme])

    return (
        <MainTable
            {...tableOptions}
            RowClick={handleRowClick}
            TotalCount={listState.list.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
        />
    )
}

export default BrftrCmprListTable
