import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { useMainLayouts, useTab } from '@Hook/index'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './DownloadDetailTable'
import {
    DownloadlistDetailState,
    DownloadListState,
    DownloadDetailStateInitialize,
} from '@Recoil/HelperPageState'
import Messages from '@Messages'
import {
    postRepoAdd,
    getRepoView,
    postRepoUpdate,
    postRepoDelete,
} from '@Service/HelperService'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    authority: `view`,
    pageMode: null,
}

const DownloadDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const params = useParams<{ POST_ID: string | undefined }>()
    const RootState = useRecoilValue(AtomRootState)

    const { handlMainAlert } = useMainLayouts()
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [detailState, setDetailState] = useRecoilState(
        DownloadlistDetailState
    )

    const [pageState, setPageState] = useState<{
        authority: string | `view` | `modify`
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const resetDetailState = useResetRecoilState(DownloadlistDetailState)
    const resetListState = useResetRecoilState(DownloadListState)

    const handleGetData = useCallback(
        async ({ POST_ID }: { POST_ID: string }) => {
            setDetailState(prevState => ({
                ...prevState,
                status: `loading`,
            }))
            const { status, payload } = await getRepoView({ POST_ID: POST_ID })
            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: `success`,
                    detail: payload,
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })

                resetDetailState()

                handlMainAlert({
                    state: true,
                    message: Messages.Default.dataGetFail,
                })
            }
        },
        [handlMainAlert, resetDetailState, setDetailState]
    )

    const handleDetailSave = async () => {
        const {
            TITLE,
            CONTENT,
            ATCHMNFL_INFO: { ATCHMNFL_NO },
        } = detailState.detail

        if (TITLE === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyTitle,
            })
            return
        }

        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyContent,
            })
            return
        }

        if (ATCHMNFL_NO === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyAtchmnflNo,
            })
            return
        }

        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))
        const { status } = await postRepoAdd({
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: Number(ATCHMNFL_NO),
        })

        if (status) {
            setDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            resetDetailState()
            resetListState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/helper/download-list`,
            })
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: `failure`,
                detail: DownloadDetailStateInitialize,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleNoticeUpdate = async () => {
        const {
            POST_ID,
            TITLE,
            CONTENT,
            ATCHMNFL_INFO: { ATCHMNFL_NO },
        } = detailState.detail

        if (TITLE === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyTitle,
            })
            return
        }

        if (CONTENT === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyContent,
            })
            return
        }

        if (ATCHMNFL_NO === ``) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.download.emptyAtchmnflNo,
            })
            return
        }

        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))
        const { status } = await postRepoUpdate({
            POST_ID: POST_ID,
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        })

        if (status) {
            setDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))

            resetDetailState()
            resetListState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/helper/download-list`,
            })
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: `failure`,
                detail: DownloadDetailStateInitialize,
            }))

            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleNoticeDelete = async () => {
        const { POST_ID } = detailState.detail
        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postRepoDelete({ POST_ID: POST_ID })
        if (status) {
            resetListState()
            resetDetailState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/helper/download-list`,
            })
        } else {
            setDetailState(prevState => ({
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

            if (pathname === `/manage/helper/download-list/new`) {
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

                handleGetData({ POST_ID: params.POST_ID }).then()
            }
        }

        funcChceckPageMode()
    }, [RootState.userinfo, handleGetData, locationState, params.POST_ID])

    return (
        <Container>
            {pageState.pageMode && (
                <LeftWapper>
                    <DetailTable
                        pageMode={pageState.pageMode}
                        authority={pageState.authority}
                        HandleDetailSave={() => handleDetailSave()}
                        HandleDetailUpdate={() => handleNoticeUpdate()}
                        HandleDetailDelete={() => handleNoticeDelete()}
                        HandleResetAfterList={() => {
                            resetDetailState()

                            handleDeleteTabbyMatchRouter(
                                '/manage/helper/download-list/new'
                            )

                            handleDeleteTabbyMatchRouter(
                                '/manage/helper/download-list/:POST_ID/detail'
                            )

                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/helper/download-list`,
                            })
                        }}
                    />
                </LeftWapper>
            )}
        </Container>
    )
}

export default DownloadDetailMain
