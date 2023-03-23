import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    ConsultTableConfig,
    ConsulttableListItemInterface,
} from '@Common/TableConfig/Manage/Member'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ConsultDetailState, ConsultListState } from '@Recoil/MemberPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'
import { useRecoilReset } from '@Hooks'

interface tableOptionInterface {
    Loading: boolean
    Options: OptionsInterface<ConsulttableListItemInterface>
    Columns: Array<ColumnsInterface<ConsulttableListItemInterface>[]>
    Lists: ConsulttableListItemInterface[]
}

const ConsultListTable = ({ CurrentPage }: { CurrentPage: number }) => {
    const navigate = useNavigate()

    const [listState, setListState] = useRecoilState(ConsultListState)
    const detailState = useRecoilValue(ConsultDetailState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const { recoilReset } = useRecoilReset()

    const [tableOptions, setTableOptions] =
        useState<tableOptionInterface>(ConsultTableConfig)

    const handleRowClick = (element: ConsulttableListItemInterface) => {
        if (detailState.memNo && detailState.memNo !== element.MBER_NO) {
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
            pathname: process.env.PUBLIC_URL + `/manage/member/consult-list`,
        })
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
                Columns: ConsultTableConfig.Columns.map(e => {
                    return _.filter(e, el => {
                        return el.key !== 'WORK_TY_CODE' // 내/외근직 안보이게 처리.
                    })
                }),
            }))
        }

        // 건다온 일때 외원 번호 안보이게 처리.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: ConsultTableConfig.Columns.map(e => {
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
            TotalCount={listState.list.TOTAL_COUNT}
            PaginationClick={e => handlePaginationClick(e)}
            CurrentPage={CurrentPage}
        />
    )
}

export default ConsultListTable
