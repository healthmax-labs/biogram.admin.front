import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    StatisticsTableConfig,
    StatisticsTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<StatisticsTableListItemInterface>
    Columns: Array<ColumnsInterface<StatisticsTableListItemInterface>[]>
    Lists: StatisticsTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const listState = useRecoilValue(StatisticsListState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        StatisticsTableConfig
    )

    const handleRowClick = (element: StatisticsTableListItemInterface) => {
        navigate({
            pathname:
                process.env.PUBLIC_URL +
                `/manage/member/consult-detail/${element.MBER_NO}/mydata`,
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
                Columns: StatisticsTableConfig.Columns.map((e: any) => {
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

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.DEVICE_MESURE_INFO_LIST,
        }))
    }, [listState.list.DEVICE_MESURE_INFO_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
