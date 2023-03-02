import React, { useEffect, useState } from 'react'
import { MainTable } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import {
    NonMeasureTableConfig,
    NonMeasureTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<NonMeasureTableListItemInterface>
    Columns: Array<ColumnsInterface<NonMeasureTableListItemInterface>[]>
    Lists: NonMeasureTableListItemInterface[]
}

const NonMeasureListTable = () => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const listState = useRecoilValue(NonMeasureListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        NonMeasureTableConfig
    )

    const handleRowClick = (element: NonMeasureTableListItemInterface) => {
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
            Lists: listState.list.NOT_MESURE_NTCN_INFO_LIST,
        }))
    }, [listState.list.NOT_MESURE_NTCN_INFO_LIST, listState.status])

    // 건다온일때 테이블 옵션 변경.
    useEffect(() => {
        // 변경 되면 다시 기본으로 변경.
        const funcChangeDefaultMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: NonMeasureTableConfig.Columns,
            }))
        }

        // FIXME: union type 이라서 filter 시 타입에러 나서 any 로 처리. ( each member of the union type filter )
        // 건다온 일때 회원 번호 제거.
        const funcChangeGeonDaonMemberListOption = () => {
            setTableOptions(prevState => ({
                ...prevState,
                Columns: NonMeasureTableConfig.Columns.map((e: any) => {
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

export default NonMeasureListTable
