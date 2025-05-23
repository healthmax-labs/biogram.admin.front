import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    RiskFctrTableConfig,
    RiskFctrTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'
import { ConsultDetailState } from '@Recoil/MemberPagesState'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useRecoilReset } from '@Hook/index'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<RiskFctrTableListItemInterface>
    Columns: Array<ColumnsInterface<RiskFctrTableListItemInterface>[]>
    Lists: RiskFctrTableListItemInterface[]
}

const RiskFctrListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const consultDetailState = useRecoilValue(ConsultDetailState)
    const { recoilReset } = useRecoilReset()
    const [listState, setListState] = useRecoilState(RiskFctrListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(RiskFctrTableConfig)

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

    const handleRowClick = (element: RiskFctrTableListItemInterface) => {
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
            pathname: process.env.PUBLIC_URL + `/manage/status/risk-fctr`,
        })
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.RISK_FCTR_INFO_LIST,
        }))
    }, [listState.list.RISK_FCTR_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: RiskFctrTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: _.map(
                    RiskFctrTableConfig.Columns,
                    (column: any, index) => {
                        // if (index === 0) {
                        //     return _.slice(column, 1)
                        //     // return column
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

    return (
        <MainTable
            {...tableOptions}
            RowClick={handleRowClick}
            TotalCount={listState.list.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
            CheckedRow={e => {
                handleCheckRow(e)
            }}
        />
    )
}

export default RiskFctrListTable
