import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './LoungeDetailTable'
import {
    getLoungeCommentsAiAuthors,
    getLoungeDetail,
} from '@Service/ContentsService'
import _ from 'lodash'
import Messages from '@Messages'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { LoungeDetailState } from '@Recoil/ContentsPagesState'
import { useMainLayouts } from '@Hook/index'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const LoungeDetailMain = () => {
    const locationState = useLocation()
    const { handlMainAlert } = useMainLayouts()
    const params = useParams<{ postId: string | undefined }>()
    const setDetailState = useSetRecoilState(LoungeDetailState)
    const resetLoungeDetailState = useResetRecoilState(LoungeDetailState)

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const handleGetInfo = useCallback(
        async (post_id: string) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const { status, payload } = await getLoungeDetail({
                post_id,
            })

            if (status) {
                const {
                    responseData: { postInfo, commentList },
                } = payload

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    detail: {
                        ...prevState.detail,
                        postInfo,
                        commentList,
                    },
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
                })
            }

            const { status: aiStatus, payload: aiPayload } =
                await getLoungeCommentsAiAuthors()

            if (aiStatus) {
                const { responseData: authors } = aiPayload

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    detail: {
                        ...prevState.detail,
                        aiAuthors: authors,
                    },
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.getInfoError,
                })
            }
        },
        [handlMainAlert, setDetailState]
    )

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/contents/lounge/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
                resetLoungeDetailState()
            } else if (params.postId !== undefined && params.postId) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))

                handleGetInfo(params.postId).then()
            }
        }

        funcChceckPageMode()
    }, [handleGetInfo, locationState, params.postId, resetLoungeDetailState])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable pageMode={pageState.pageMode} />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default LoungeDetailMain
