import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './NoticeDetailTable'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
    NoticeDetailState,
    NoticeListState,
    NoticeDetailStateInitialize,
} from '@Recoil/HelperPageState'
import {
    postNoticeAdd,
    getNoticeView,
    postNoticeUpdate,
    postNoticeDelete,
} from '@Service/HelperService'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'
import { AtomRootState } from '@Recoil/AppRootState'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    authority: `view`,
    pageMode: null,
}

const NoticeDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const params = useParams<{ POST_ID: string | undefined }>()
    const RootState = useRecoilValue(AtomRootState)

    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        authority: string | `view` | `modify`
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const [noticeDetailState, setNoticeDetailState] =
        useRecoilState(NoticeDetailState)

    const resetNoticeDetailState = useResetRecoilState(NoticeDetailState)
    const resetNoticeListState = useResetRecoilState(NoticeListState)

    const handleDetailSave = async () => {
        const { TITLE, CONTENT, USE_YN, POPUP_YN, ATCHMNFL_INFO } =
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
            POPUP_YN: POPUP_YN,
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
                detail: NoticeDetailStateInitialize,
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
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })

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
        const { POST_ID, TITLE, CONTENT, USE_YN, POPUP_YN, ATCHMNFL_INFO } =
            noticeDetailState.detail
        const { status } = await postNoticeUpdate({
            POST_ID: Number(POST_ID),
            TITLE: TITLE,
            CONTENT: CONTENT,
            USE_YN: USE_YN,
            POPUP_YN: POPUP_YN,
            ATCHMNFL_NO: ATCHMNFL_INFO
                ? ATCHMNFL_INFO.ATCHMNFL_NO === ``
                    ? `0`
                    : ATCHMNFL_INFO.ATCHMNFL_NO
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
            const { INST_NO, AUTH_CODE } = RootState.userinfo
            let authority = `view`

            if (INST_NO === `1000` && AUTH_CODE === `SM00`) {
                authority = `modify`
            }

            if (pathname === `/manage/helper/notice/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                    authority: authority,
                }))
            } else if (params.POST_ID !== undefined && params.POST_ID) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                    authority: authority,
                }))

                handleGetNotice({ POST_ID: params.POST_ID }).then()
            }
        }

        funcChceckPageMode()
    }, [RootState.userinfo, handleGetNotice, locationState, params.POST_ID])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable
                            pageMode={pageState.pageMode}
                            authority={pageState.authority}
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
