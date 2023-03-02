import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainTable } from '@Elements'

import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    WalkRankingTableConfig,
    WalkRankingTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<WalkRankingTableListItemInterface>
    Columns: Array<ColumnsInterface<WalkRankingTableListItemInterface>[]>
    Lists: WalkRankingTableListItemInterface[]
}

const WalkRankingListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(WalkRankingListState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        WalkRankingTableConfig
    )

    const handleRowClick = (element: WalkRankingTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${element.MBER_NO}/mydata`,
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

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default WalkRankingListTable
