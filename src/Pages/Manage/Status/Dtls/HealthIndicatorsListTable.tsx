import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainTable } from '@Elements'

import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    HealthIndicatorsTableConfig,
    HealthIndicatorsTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { HealthIndicatorsListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HealthIndicatorsTableListItemInterface>
    Columns: Array<ColumnsInterface<HealthIndicatorsTableListItemInterface>[]>
    Lists: HealthIndicatorsTableListItemInterface[]
}

const HealthIndicatorsTable = () => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const listState = useRecoilValue(HealthIndicatorsListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        HealthIndicatorsTableConfig
    )

    const handleRowClick = (
        element: HealthIndicatorsTableListItemInterface
    ) => {
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
            Lists: listState.list.MYBODY_SCORE_IMPRVM_INFO_LIST,
        }))
    }, [listState.list.MYBODY_SCORE_IMPRVM_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: HealthIndicatorsTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: HealthIndicatorsTableConfig.Columns.map((e: any) => {
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

export default HealthIndicatorsTable
