import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    StatisticsTableConfig,
    StatisticsTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { useRecoilReset } from '@Hook/index'
import { RecoilStateKeyNameType } from '@CommonTypes'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<StatisticsTableListItemInterface>
    Columns: Array<ColumnsInterface<StatisticsTableListItemInterface>[]>
    Lists: StatisticsTableListItemInterface[]
}

const ListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()
    const [listState, setListState] = useRecoilState(StatisticsListState)
    const consultDetailState = useRecoilValue(ConsultDetailState)
    const { recoilReset } = useRecoilReset()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        StatisticsTableConfig
    )

    const handleRowClick = (element: StatisticsTableListItemInterface) => {
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
            pathname: process.env.PUBLIC_URL + `/manage/status/statistics`,
        })
    }

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: StatisticsTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: StatisticsTableConfig.Columns.map(
                    (column: any, index) => {
                        // if (index === 0) {
                        //     return _.slice(column, 1)
                        // } else {
                        return _.filter(column, el => {
                            return el.key !== 'MBER_NO'
                        })
                        // }
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

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.DEVICE_MESURE_INFO_LIST,
        }))
    }, [listState.list.DEVICE_MESURE_INFO_LIST, listState.status])

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
