import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    MemberTableConfig,
    tableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { MemberDetailState, MemberListState } from '@Recoil/MemberPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'
import { useTab } from '@Hook/index'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface<tableListItemInterface>
    Columns: Array<ColumnsInterface<tableListItemInterface>[]>
    Lists: tableListItemInterface[]
}

const MemberListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()

    const [listState, setListState] = useRecoilState(MemberListState)
    const detailState = useRecoilValue(MemberDetailState)
    const detailReset = useResetRecoilState(MemberDetailState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [tableOptions, setTableOptions] =
        useState<tableOptionInterface>(MemberTableConfig)

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
            pathname: process.env.PUBLIC_URL + `/manage/member/member-list`,
        })
    }

    const handleRowClick = (element: tableListItemInterface) => {
        if (detailState.MBER_NO !== element.MBER_NO) {
            detailReset()
        }

        handleDeleteTabbyMatchRouter(`/manage/member/new-member`)

        detailReset()

        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/${element.MBER_NO}/detail`,
        })
    }

    // 리시트 체크박스 클릭
    const handleCheckRow = (e: string[]) => {
        setListState(prevState => ({
            ...prevState,
            manage: {
                ...prevState.manage,
                checkRow: e,
            },
        }))
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.MBER_INFO_LIST,
        }))
    }, [listState.list.MBER_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: MemberTableConfig.Columns.map(e => {
                    return _.filter(e, el => {
                        return el.key !== 'WORK_TY_CODE' // 내/외근직 안보이게 처리.
                    })
                }),
            }))
        }

        // 건다온 일때 내/외근직 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: MemberTableConfig.Columns.map(e => {
                    return _.filter(e, el => {
                        return el.key !== 'MBER_NO' // 회원 번호 안보이게 처리.
                    })
                }),
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
            RowClick={e => handleRowClick(e)}
            CheckedRow={e => handleCheckRow(e)}
            TotalCount={listState.list.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
        />
    )
}

export default MemberListTable
