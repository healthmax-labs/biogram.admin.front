import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    ActivityWalkTableConfig,
    ActivityWalkTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { useRecoilReset } from '@Hook/index'
import { RecoilStateKeyNameType } from '@CommonTypes'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<ActivityWalkTableListItemInterface>
    Columns: Array<ColumnsInterface<ActivityWalkTableListItemInterface>[]>
    Lists: ActivityWalkTableListItemInterface[]
}

const ListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const consultDetailState = useRecoilValue(ConsultDetailState)
    const { recoilReset } = useRecoilReset()

    const [listState, setListState] = useRecoilState(ActivityWalkListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        ActivityWalkTableConfig
    )

    const handleRowClick = (element: ActivityWalkTableListItemInterface) => {
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
            pathname: process.env.PUBLIC_URL + `/manage/status/activity-walk`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.ACTIVITY_STATE_LIST,
        }))
    }, [listState.list.ACTIVITY_STATE_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: ActivityWalkTableConfig.Columns,
            }))
        }

        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: ActivityWalkTableConfig.Columns.map(e => {
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

export default ListTable
