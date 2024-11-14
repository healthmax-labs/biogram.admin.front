import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMainLayouts, useTab } from '@Hook/index'
import React, { useCallback, useEffect, useState } from 'react'
import {
    getQuestionDetail,
    postAddQnaQuestion,
    postEditQnaQuestion,
    postDeleteQnaQuestion,
    postQnaAddComment,
    postQnaEditComment,
    postQnaDeleteComment,
} from '@Service/HelperService'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
    QnaDetailState,
    QnaListState,
    QnaDetailStateInitialize,
} from '@Recoil/HelperPageState'
import Messages from '@Messages'
import DetailTable from './QnaDetailTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { AtomRootState } from '@Recoil/AppRootState'
import _ from 'lodash'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const QnaDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const params = useParams<{ POST_ID: string | undefined }>()
    const RootState = useRecoilValue(AtomRootState)

    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        pageMode:
            | `new`
            | `modify`
            | `view`
            | `answer_modify`
            | `answer_new`
            | null
    }>(initializeState)
    const [qnaDetailState, setQnaDetailState] = useRecoilState(QnaDetailState)
    const qnaDetailStateReset = useResetRecoilState(QnaDetailState)
    const qnaListStateReset = useResetRecoilState(QnaListState)

    const handleGetDetail = useCallback(
        async ({ POST_ID }: { POST_ID: string }) => {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `loading`,
            }))

            const { status, payload } = await getQuestionDetail({
                POST_ID: POST_ID,
            })

            if (status) {
                setQnaDetailState(prevState => ({
                    ...prevState,
                    status: `success`,
                    detail: payload,
                }))

                const { AUTH_CODE } = RootState.userinfo

                if (AUTH_CODE === 'SM00') {
                    if (payload.COMMENT) {
                        setPageState(prevState => ({
                            ...prevState,
                            pageMode: `answer_modify`,
                        }))
                    } else {
                        setPageState(prevState => ({
                            ...prevState,
                            pageMode: `answer_new`,
                        }))
                    }
                    return
                }

                if (payload.COMMENT) {
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: `view`,
                    }))
                    return
                } else {
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: `modify`,
                    }))
                    return
                }
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })

                qnaDetailStateReset()

                handlMainAlert({
                    state: true,
                    message: Messages.Default.dataGetFail,
                })
            }
        },
        [
            RootState.userinfo,
            handlMainAlert,
            qnaDetailStateReset,
            setQnaDetailState,
        ]
    )

    const handleDetailSave = async () => {
        const { TITLE, CONTENT, ATCHMNFL_INFO } = qnaDetailState.detail

        if (TITLE === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyTitle,
            })
            return
        }

        if (_.isUndefined(CONTENT)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }

        if (_.isEmpty(CONTENT)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }

        setQnaDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postAddQnaQuestion({
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO:
                ATCHMNFL_INFO && ATCHMNFL_INFO.ATCHMNFL_NO !== 0
                    ? ATCHMNFL_INFO.ATCHMNFL_NO
                    : null,
        })

        if (status) {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
                detail: QnaDetailStateInitialize,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleDetailAnswerSave = async () => {
        const { POST_ID } = qnaDetailState.detail
        const CONTENT = qnaDetailState.detail.COMMENT
            ? qnaDetailState.detail.COMMENT.CONTENT
            : ``

        const ATCHMNFL_NO =
            qnaDetailState.detail.COMMENT &&
            qnaDetailState.detail.COMMENT.ATCHMNFL_INFO
                ? qnaDetailState.detail.COMMENT.ATCHMNFL_INFO.ATCHMNFL_NO
                : ``
        if (!CONTENT) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }
        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }

        setQnaDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postQnaAddComment({
            POST_ID: POST_ID,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO ? Number(ATCHMNFL_NO) : null,
        })

        if (status) {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
                detail: QnaDetailStateInitialize,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleDetailUpdate = async () => {
        const { POST_ID, TITLE, CONTENT, ATCHMNFL_INFO } = qnaDetailState.detail

        if (TITLE === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyTitle,
            })
            return
        }

        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }

        setQnaDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postEditQnaQuestion({
            POST_ID: POST_ID,
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO:
                ATCHMNFL_INFO && ATCHMNFL_INFO.ATCHMNFL_NO !== 0
                    ? ATCHMNFL_INFO.ATCHMNFL_NO
                    : null,
        })

        if (status) {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))
            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleDetailAnswerUpdate = async () => {
        const { POST_ID } = qnaDetailState.detail

        const COMMENT_ID = qnaDetailState.detail.COMMENT
            ? qnaDetailState.detail.COMMENT.COMMENT_ID
            : ``
        const CONTENT = qnaDetailState.detail.COMMENT
            ? qnaDetailState.detail.COMMENT.CONTENT
            : ``
        const ATCHMNFL_NO =
            qnaDetailState.detail.COMMENT &&
            qnaDetailState.detail.COMMENT.ATCHMNFL_INFO
                ? qnaDetailState.detail.COMMENT.ATCHMNFL_INFO.ATCHMNFL_NO
                : ``

        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.emptyContent,
            })
            return
        }

        const { status } = await postQnaEditComment({
            POST_ID: POST_ID,
            COMMENT_ID: Number(COMMENT_ID),
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO ? Number(ATCHMNFL_NO) : null,
        })

        if (status) {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))
            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleDetailDelete = async () => {
        setQnaDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { POST_ID } = qnaDetailState.detail

        const { status } = await postDeleteQnaQuestion({ POST_ID: POST_ID })
        if (status) {
            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleDetailAnswerDelete = async () => {
        setQnaDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { POST_ID } = qnaDetailState.detail
        const COMMENT_ID = qnaDetailState.detail.COMMENT
            ? qnaDetailState.detail.COMMENT.COMMENT_ID
            : ``

        const { status } = await postQnaDeleteComment({
            POST_ID: POST_ID,
            COMMENT_ID: Number(COMMENT_ID),
        })
        if (status) {
            qnaListStateReset()
            qnaDetailStateReset()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/qna-list`,
            })
        } else {
            setQnaDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/helper/qna/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (params.POST_ID !== undefined && params.POST_ID) {
                handleGetDetail({ POST_ID: params.POST_ID }).then()
            }
        }

        funcChceckPageMode()
    }, [handleGetDetail, locationState, params.POST_ID])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable
                            pageMode={pageState.pageMode}
                            HandleDetailSave={() => handleDetailSave()}
                            HandleDetailUpdate={() => handleDetailUpdate()}
                            HandleDetailDelete={() => handleDetailDelete()}
                            HandleResetAfterList={() => {
                                qnaDetailStateReset()

                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/qna/new'
                                )

                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/qna/:POST_ID/detail'
                                )

                                navigate({
                                    pathname:
                                        process.env.PUBLIC_URL +
                                        `/manage/helper/qna-list`,
                                })
                            }}
                            HandleDetailAnswerSave={() =>
                                handleDetailAnswerSave()
                            }
                            HandleDetailAnswerUpdate={() =>
                                handleDetailAnswerUpdate()
                            }
                            HandleDetailAnswerDelete={() =>
                                handleDetailAnswerDelete()
                            }
                        />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default QnaDetailMain
