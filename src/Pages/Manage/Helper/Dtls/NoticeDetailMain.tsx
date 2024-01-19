import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './NoticeDetailTable'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
    NoticeDetailState,
    NoticeListState,
    NoticeDetailStateinitialize,
} from '@Recoil/HelperPageState'
import {
    postNoticeAdd,
    getNoticeView,
    postNoticeUpdate,
    postNoticeDelete,
} from '@Service/HelperService'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const NoticeDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const params = useParams<{ POST_ID: string | undefined }>()

    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const [noticeDetailState, setNoticeDetailState] =
        useRecoilState(NoticeDetailState)

    const resetNoticeDetailState = useResetRecoilState(NoticeDetailState)
    const resetNoticeListState = useResetRecoilState(NoticeListState)

    const handleDetailSave = async () => {
        const { TITLE, CONTENT, USE_YN, ATCHMNFL_INFO } =
            noticeDetailState.detail

        if (TITLE === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.notice.emptyTitle,
            })
            return
        }

        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.notice.emptyContent,
            })
            return
        }

        setNoticeDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postNoticeAdd({
            TITLE: TITLE,
            CONTENT: CONTENT,
            USE_YN: USE_YN,
            ATCHMNFL_NO: ATCHMNFL_INFO
                ? ATCHMNFL_INFO.ATCHMNFL_NO === ``
                    ? ``
                    : ATCHMNFL_INFO.ATCHMNFL_NO
                : ``,
        })

        if (status) {
            setNoticeDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            resetNoticeDetailState()
            resetNoticeListState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/notice-list`,
            })
        } else {
            setNoticeDetailState(prevState => ({
                ...prevState,
                status: `failure`,
                detail: NoticeDetailStateinitialize,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleGetNotice = useCallback(
        async ({ POST_ID }: { POST_ID: string }) => {
            setNoticeDetailState(prevState => ({
                ...prevState,
                status: `loading`,
            }))

            const { status, payload } = await getNoticeView({
                POST_ID: POST_ID,
            })
            if (status) {
                setNoticeDetailState(prevState => ({
                    ...prevState,
                    status: `success`,
                    detail: payload,
                }))
            } else {
                resetNoticeDetailState()

                handlMainAlert({
                    state: true,
                    message: Messages.Default.dataGetFail,
                })
            }
        },
        [handlMainAlert, resetNoticeDetailState, setNoticeDetailState]
    )

    const handleNoticeUpdate = async () => {
        setNoticeDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))
        const { POST_ID, TITLE, CONTENT, USE_YN, ATCHMNFL_INFO } =
            noticeDetailState.detail
        const { status } = await postNoticeUpdate({
            POST_ID: Number(POST_ID),
            TITLE: TITLE,
            CONTENT: CONTENT,
            USE_YN: USE_YN,
            ATCHMNFL_NO: ATCHMNFL_INFO
                ? ATCHMNFL_INFO.ATCHMNFL_NO === ``
                    ? ATCHMNFL_INFO.ATCHMNFL_NO
                    : `0`
                : `0`,
        })

        if (status) {
            setNoticeDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            resetNoticeDetailState()
            resetNoticeListState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/notice-list`,
            })
        } else {
            setNoticeDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleNoticeDelete = async () => {
        setNoticeDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))
        const { POST_ID } = noticeDetailState.detail
        const { status } = await postNoticeDelete({ POST_ID: POST_ID })
        if (status) {
            resetNoticeDetailState()
            resetNoticeListState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/helper/notice-list`,
            })
        } else {
            setNoticeDetailState(prevState => ({
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

            if (pathname === `/manage/helper/notice/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (params.POST_ID !== undefined && params.POST_ID) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))

                handleGetNotice({ POST_ID: params.POST_ID }).then()
            }
        }

        funcChceckPageMode()
    }, [handleGetNotice, locationState, params.POST_ID])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable
                            pageMode={pageState.pageMode}
                            HandleDetailSave={() => handleDetailSave()}
                            HandleDetailUpdate={() => handleNoticeUpdate()}
                            HandleDetailDelete={() => handleNoticeDelete()}
                            HandleResetAfterList={() => {
                                resetNoticeDetailState()

                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/notice/new'
                                )

                                handleDeleteTabbyMatchRouter(
                                    '/manage/helper/notice/:POST_ID/detail'
                                )

                                navigate({
                                    pathname:
                                        process.env.PUBLIC_URL +
                                        `/manage/helper/notice-list`,
                                })
                            }}
                        />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default NoticeDetailMain
