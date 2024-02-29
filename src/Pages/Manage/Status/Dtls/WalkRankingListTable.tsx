import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainTable } from '@Elements'

import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    WalkRankingTableConfig,
    WalkRankingTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilState, useRecoilValue } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { useRecoilReset } from '@Hook/index'
import { RecoilStateKeyNameType } from '@CommonTypes'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<WalkRankingTableListItemInterface>
    Columns: Array<ColumnsInterface<WalkRankingTableListItemInterface>[]>
    Lists: WalkRankingTableListItemInterface[]
}

const WalkRankingListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()
    const [listState, setListState] = useRecoilState(WalkRankingListState)
    const consultDetailState = useRecoilValue(ConsultDetailState)
    const { recoilReset } = useRecoilReset()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        WalkRankingTableConfig
    )

    const handleRowClick = (element: WalkRankingTableListItemInterface) => {
        if (consultDetailState.memNo !== element.MBER_NO) {
            ;[
                'memberPage/consult-detail',
                'memberPage/consult-chart-list',
                'memberPage/consult-chart',
                'memberPage/consult-sms-send',
                'memberPage/consult-my-coach',
                'memberPage/consult-survey',
                'memberPage/consult-raw-age',
                'memberPage/consult-message-box',
                'memberPage/consult-meal-diary',
                'memberPage/consult-my-graph',
            ].forEach(recoilKey => {
                recoilReset(recoilKey as RecoilStateKeyNameType)
            })
        }
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
            pathname: process.env.PUBLIC_URL + `/manage/status/walk-ranking`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.STEP_RANK_INFO_LIST,
        }))
    }, [listState.list.STEP_RANK_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: WalkRankingTableConfig.Columns,
            }))
        }

        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: WalkRankingTableConfig.Columns.map(e => {
                    return _.filter(e, el => {
                        return el.key !== 'MBER_NO'
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
            TotalCount={listState.list.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
        />
    )
}

export default WalkRankingListTable
