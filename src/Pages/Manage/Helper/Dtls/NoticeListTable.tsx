import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { HelperNoticeListItemInterface } from '@Type/HelperTypes'
import { useRecoilValue } from 'recoil'
import { NoticeListState } from '@Recoil/HelperPageState'
import { AtomRootState } from '@Recoil/AppRootState'
import React, { useEffect, useState } from 'react'
import { NoticeTableConfig } from '@Common/TableConfig/Manage/Helper'
import { MainTable } from '@Element/index'
import { useNavigate } from 'react-router-dom'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HelperNoticeListItemInterface>
    Columns: Array<ColumnsInterface<HelperNoticeListItemInterface>[]>
    Lists: HelperNoticeListItemInterface[]
}

const NoticeListTable = ({
    HandleViewCountModal,
}: {
    HandleViewCountModal: ({ POST_ID }: { POST_ID: string }) => void
}) => {
    const navigate = useNavigate()
    const listState = useRecoilValue(NoticeListState)
    const RootState = useRecoilValue(AtomRootState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(NoticeTableConfig)

    const handleRowClick = (
        element: HelperNoticeListItemInterface,
        clickKey: string | null | undefined
    ) => {
        if (clickKey === `VIEW_CNT`) {
            HandleViewCountModal({ POST_ID: element.POST_ID })
        } else {
            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/helper/notice/${element.POST_ID}/detail`,
            })
        }
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.POST_NOTICE_INFO,
            Columns: (() => {
                const {
                    userinfo: { INST_NO, AUTH_CODE },
                } = RootState
                if (INST_NO === `1000` && AUTH_CODE === `SM00`) {
                    return NoticeTableConfig.Columns
                } else {
                    return NoticeTableConfig.Columns.map(e => {
                        return e.filter(c => c.key !== `VIEW_CNT`)
                    })
                }
            })(),
        }))
    }, [RootState, listState.list.POST_NOTICE_INFO, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default NoticeListTable
