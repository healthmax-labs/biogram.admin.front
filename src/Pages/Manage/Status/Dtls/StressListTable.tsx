import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { StressListItemInterface } from '@Type/StatusTypes'
import { StressListTableConfig } from '@Common/TableConfig/Manage/Status'
import { MainTable } from '@Element/index'
import { useRecoilState, useRecoilValue } from 'recoil'
import { StressListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { useRecoilReset } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<StressListItemInterface>
    Columns: Array<ColumnsInterface<StressListItemInterface>[]>
    Lists: StressListItemInterface[]
}

const StressListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()
    const consultDetailState = useRecoilValue(ConsultDetailState)
    const { recoilReset } = useRecoilReset()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [tableOptions, setTableOptions] = useState<tableOption>(
        StressListTableConfig
    )
    const [listState, setListState] = useRecoilState(StressListState)

    const handleRowClick = (element: StressListItemInterface) => {
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
            pathname: process.env.PUBLIC_URL + `/manage/status/stress-list`,
        })
    }

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: StressListTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: StressListTableConfig.Columns.map(
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
            Lists: listState.list.STRESS_STATE_LIST,
        }))
    }, [listState.list.STRESS_STATE_LIST, listState.status])

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

export default StressListTable
