import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { HelperQnaListItemInterface } from '@Type/HelperTypes'
import { useEffect, useState } from 'react'
import { MainTable } from '@Element/index'
import { QnaTableConfig } from '@Common/TableConfig/Manage/Helper'
import { useRecoilValue } from 'recoil'
import { QnaListState } from '@Recoil/HelperPageState'
import { useNavigate } from 'react-router-dom'
import Messages from '@Messages'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HelperQnaListItemInterface>
    Columns: Array<ColumnsInterface<HelperQnaListItemInterface>[]>
    Lists: HelperQnaListItemInterface[]
}

const QnaListTable = ({
    VoidLoadingModal,
    LikeButtonMessageModal,
}: {
    VoidLoadingModal: () => void
    LikeButtonMessageModal: ({ message }: { message: string }) => void
}) => {
    const navigate = useNavigate()
    const listState = useRecoilValue(QnaListState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(QnaTableConfig)

    const handleRowClick = (
        element: HelperQnaListItemInterface,
        clickKey: string | null | undefined
    ) => {
        const { MBER_NO, POST_ID, LIKE_CNT, REGIST_ID, COMPLETE_YN } = element

        if (clickKey === `LIKE_CNT`) {
            // 본인 글이 아닐때
            if (MBER_NO !== REGIST_ID) {
                LikeButtonMessageModal({
                    message: Messages.Default.Helper.qna.notRegisterLikeButton,
                })
                return
            }

            // 이미 클릭한 게시물일떄
            if (LIKE_CNT !== 0) {
                LikeButtonMessageModal({
                    message: Messages.Default.Helper.qna.alreadyLikeButton,
                })
                return
            }

            // 대기중일 때
            if (COMPLETE_YN === 'N') {
                LikeButtonMessageModal({
                    message: Messages.Default.Helper.qna.yetComplete,
                })
                return
            }

            VoidLoadingModal()
        } else {
            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/helper/qna/${POST_ID}/detail`,
            })
        }
    }

    useEffect(() => {
        setTableOptions(prevState => ({
            ...prevState,
            Loading: listState.status === 'loading',
            Lists: listState.list.QUESTION_LIST,
        }))
    }, [listState.list.QUESTION_LIST, listState.status])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default QnaListTable
