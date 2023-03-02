import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    JoinTableConfig,
    JoinTableListItemInterface,
} from '@Common/TableConfig/Manage/Inst'
import { useRecoilState, useRecoilValue } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<JoinTableListItemInterface>
    Columns: Array<ColumnsInterface<JoinTableListItemInterface>[]>
    Lists: JoinTableListItemInterface[]
}

const ListTable = () => {
    const [listState, setListState] = useRecoilState(InstJoinListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(JoinTableConfig)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const handleRowClick = () => {
        //
    }

    // 리스트 체크박스 클릭
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
            Lists: listState.list.PSTINST_REQUEST_INFO_LIST,
        }))
    }, [listState.list.PSTINST_REQUEST_INFO_LIST, listState.status])

    // 건다온일때 회원 번호 제거.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: JoinTableConfig.Columns,
            }))
        }

        // 건다온 일때 내/외근직 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: JoinTableConfig.Columns.map(e => {
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
            RowClick={handleRowClick}
            CheckedRow={e => handleCheckRow(e)}
        />
    )
}

export default ListTable
