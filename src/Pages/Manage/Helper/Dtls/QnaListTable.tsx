import { ColumnsInterface, OptionsInterface } from '@Type/TableTypes'
import { HelperQnaListItemInterface } from '@Type/HelperTypes'
import React, { useEffect, useState } from 'react'
import { MainTable } from '@Element/index'
import { QnaTableConfig } from '@Common/TableConfig/Manage/Helper'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { QnaListState, QnaDetailState } from '@Recoil/HelperPageState'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hook/index'
import _ from 'lodash'
import { LikeUpImage, LikeDownImage } from '@Assets'
import { LikeUpDownImageClickInterace } from '@Type/HelperTypes'

interface tableOption {
    Loading: boolean
    Options: OptionsInterface<HelperQnaListItemInterface>
    Columns: Array<ColumnsInterface<HelperQnaListItemInterface>[]>
    Lists: HelperQnaListItemInterface[]
}

const QnaListTable = ({
    HandleLikeUpClick,
    HandleLikeDownClick,
}: {
    HandleLikeUpClick: (el: LikeUpDownImageClickInterace) => void
    HandleLikeDownClick: (el: LikeUpDownImageClickInterace) => void
}) => {
    const navigate = useNavigate()
    const listState = useRecoilValue(QnaListState)
    const { handleDeleteTabbyMatchRouter } = useTab()
    const qnaDetailStateReset = useResetRecoilState(QnaDetailState)

    const [tableOptions, setTableOptions] =
        useState<tableOption>(QnaTableConfig)

    const handleRowClick = (
        element: HelperQnaListItemInterface,
        clickKey: string | null | undefined
    ) => {
        const { POST_ID } = element

        if (clickKey === `LIKE_CNT`) {
            return
        } else {
            handleDeleteTabbyMatchRouter('/manage/helper/qna/new')
            qnaDetailStateReset()
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
            Columns: _.map(QnaTableConfig.Columns, column => {
                return _.map(column, e => {
                    if (e.key === `LIKE_CNT`) {
                        return {
                            ...e,
                            component: ({
                                el,
                            }: {
                                el: HelperQnaListItemInterface
                            }) => {
                                return (
                                    <div className="flex flex-nowrap w-full items-center justify-center h-4 gap-2">
                                        {(el.LIKE_CNT === 0 ||
                                            el.LIKE_CNT > 0) && (
                                            <div className="flex h-4">
                                                <img
                                                    src={LikeUpImage}
                                                    alt=""
                                                    onClick={() =>
                                                        HandleLikeUpClick({
                                                            POST_ID: el.POST_ID,
                                                            LIKE_CNT:
                                                                el.LIKE_CNT,
                                                            REGIST_ID:
                                                                el.REGIST_ID,
                                                            COMPLETE_YN:
                                                                el.COMPLETE_YN,
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}
                                        {(el.LIKE_CNT === 0 ||
                                            el.LIKE_CNT < 0) && (
                                            <div className="flex h-4">
                                                <img
                                                    src={LikeDownImage}
                                                    alt=""
                                                    onClick={() =>
                                                        HandleLikeDownClick({
                                                            POST_ID: el.POST_ID,
                                                            LIKE_CNT:
                                                                el.LIKE_CNT,
                                                            REGIST_ID:
                                                                el.REGIST_ID,
                                                            COMPLETE_YN:
                                                                el.COMPLETE_YN,
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            },
                        }
                    } else {
                        return e
                    }
                })
            }),
        }))
    }, [
        HandleLikeDownClick,
        HandleLikeUpClick,
        listState.list.QUESTION_LIST,
        listState.status,
    ])

    return <MainTable {...tableOptions} RowClick={handleRowClick} />
}

export default QnaListTable
