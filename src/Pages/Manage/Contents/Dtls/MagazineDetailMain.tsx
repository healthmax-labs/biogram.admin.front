import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './MagazineDetailTable'
import { getMagazineDetail } from '@Service/ContentsService'
import _ from 'lodash'
import Messages from '@Messages'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { MagazineDetailState } from '@Recoil/ContentsPagesState'
import { useMainLayouts } from '@Hook/index'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const MagazineDetailMain = () => {
    const locationState = useLocation()
    const { handlMainAlert } = useMainLayouts()
    const params = useParams<{ misn_step: string | undefined }>()
    const setDetailState = useSetRecoilState(MagazineDetailState)
    const resetMagazineDetailState = useResetRecoilState(MagazineDetailState)

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const handleGetInfo = useCallback(
        async (misn_step: string) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const { status, payload } = await getMagazineDetail({
                misn_step: misn_step,
            })

            if (status) {
                const {
                    MISN_MAGAZINE_INFO: {
                        ATCHMNFL_NM,
                        ATCHMNFL_NO,
                        ATCHMNFL_PATH,
                        BEGIN_DT,
                        CN_ATCHMNFL_NM,
                        CN_ATCHMNFL_NO,
                        CN_ATCHMNFL_PATH,
                        END_DT,
                        MISN_CD,
                        MISN_COMPT_REWARD_POINT,
                        MISN_DC,
                        MISN_STEP,
                        MISN_SUBNAME1,
                        MISN_SUBNAME2,
                        USE_AT,
                    },
                } = payload

                const arraySubname1 = MISN_SUBNAME1.split('\n')
                const arraySubname2 = MISN_SUBNAME2.split('\n')

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    info: {
                        ATCHMNFL_NM: ATCHMNFL_NM,
                        ATCHMNFL_NO: ATCHMNFL_NO,
                        ATCHMNFL_PATH: ATCHMNFL_PATH,
                        BEGIN_DT: BEGIN_DT.replaceAll('-', ''),
                        CN_ATCHMNFL_NM: CN_ATCHMNFL_NM,
                        CN_ATCHMNFL_NO: CN_ATCHMNFL_NO,
                        CN_ATCHMNFL_PATH: CN_ATCHMNFL_PATH,
                        END_DT: END_DT.replaceAll('-', ''),
                        MISN_CD: MISN_CD,
                        MISN_COMPT_REWARD_POINT: MISN_COMPT_REWARD_POINT,
                        MISN_DC: MISN_DC ? MISN_DC : '',
                        MISN_STEP: MISN_STEP,
                        MISN_SUBNAME1: {
                            first: !_.isEmpty(arraySubname1[0])
                                ? arraySubname1[0]
                                : '',
                            second: !_.isEmpty(arraySubname1[1])
                                ? arraySubname1[1]
                                : '',
                        },
                        MISN_SUBNAME2: {
                            first: !_.isEmpty(arraySubname2[0])
                                ? arraySubname2[0]
                                : '',
                            second: !_.isEmpty(arraySubname2[1])
                                ? arraySubname2[1]
                                : '',
                        },
                        USE_AT: USE_AT,
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

            if (pathname === `/manage/contents/magazine-list/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
                resetMagazineDetailState()
            } else if (params.misn_step !== undefined && params.misn_step) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))

                handleGetInfo(params.misn_step).then()
            }
        }

        funcChceckPageMode()
    }, [
        handleGetInfo,
        locationState,
        params.misn_step,
        resetMagazineDetailState,
    ])

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

export default MagazineDetailMain
