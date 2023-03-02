import React, { useEffect, useState } from 'react'
import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { MainTable } from '@Elements'
import {
    ActivityWalkTableConfig,
    ActivityWalkTableListItemInterface,
} from '@Common/TableConfig/Manage/Status'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { ActivityWalkListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import _ from 'lodash'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<ActivityWalkTableListItemInterface>
    Columns: Array<ColumnsInterface<ActivityWalkTableListItemInterface>[]>
    Lists: ActivityWalkTableListItemInterface[]
}

const ListTable = () => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const listState = useRecoilValue(ActivityWalkListState)

    const [tableOptions, setTableOptions] = useState<tableOption>(
        ActivityWalkTableConfig
    )

    const handleRowClick = (element: ActivityWalkTableListItemInterface) => {
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

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default ListTable
