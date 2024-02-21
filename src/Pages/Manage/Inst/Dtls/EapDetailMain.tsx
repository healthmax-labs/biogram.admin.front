import DetailTable from './EapDetailTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import React, { useCallback, useEffect, useState } from 'react'
import { useMainLayouts, useTab } from '@Hook/index'
import { EapDetailState, EapListState } from '@Recoil/InstPagesState'
import { useRecoilState, useResetRecoilState } from 'recoil'
import _ from 'lodash'
import Messages from '@Messages'
import {
    postInstEapInfoAdd,
    getInstEapInfoView,
    postInstEapInfoUpdate,
    postInstEapInfoDelete,
} from '@Service/InstService'
import { useNavigate, useParams } from 'react-router-dom'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const EapDetailMain = () => {
    const navigate = useNavigate()
    const params = useParams<{ eapNo: string | undefined }>()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    const [detailState, setDetailState] = useRecoilState(EapDetailState)
    const resetListState = useResetRecoilState(EapListState)
    const eapDetailStateReset = useResetRecoilState(EapDetailState)

    const handleEaDetailSave = async () => {
        const {
            INST_NO,
            MIND_YN,
            MIND_CURRENT_COUNT,
            MIND_MAX_COUNT,
            MIND_URL,
            MIND_CODE,
            HEALTH_YN,
            HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT,
            HEALTH_URL,
            START_DE,
            END_DE,
            IS_LIVE,
        } = detailState.info
        if (INST_NO === '') {
            handlMainAlert({
                message: Messages.Default.pstinstSelectEmpty,
                state: true,
            })
            return
        }

        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postInstEapInfoAdd({
            INST_NO: INST_NO,
            MIND_YN: MIND_YN,
            MIND_CURRENT_COUNT: _.isEmpty(MIND_CURRENT_COUNT)
                ? '0'
                : MIND_CURRENT_COUNT,
            MIND_MAX_COUNT: _.isEmpty(MIND_MAX_COUNT) ? '0' : MIND_MAX_COUNT,
            MIND_URL: MIND_URL,
            MIND_CODE: MIND_CODE,
            HEALTH_YN: HEALTH_YN,
            HEALTH_CURRENT_COUNT: _.isEmpty(HEALTH_CURRENT_COUNT)
                ? '0'
                : HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT: _.isEmpty(HEALTH_MAX_COUNT)
                ? '0'
                : HEALTH_MAX_COUNT,
            HEALTH_URL: HEALTH_URL,
            START_DE: START_DE,
            END_DE: END_DE,
            IS_LIVE: IS_LIVE,
        })
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            resetListState()
            handleDeleteTabbyMatchRouter('/manage/inst/eap-list/new')

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/inst/eap-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleEapDetailUpdate = async () => {
        const {
            EAP_INST_REGISTER_NO,
            INST_NO,
            MIND_YN,
            MIND_CURRENT_COUNT,
            MIND_MAX_COUNT,
            MIND_URL,
            MIND_CODE,
            HEALTH_YN,
            HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT,
            HEALTH_URL,
            START_DE,
            END_DE,
            IS_LIVE,
        } = detailState.info

        if (INST_NO === '') {
            handlMainAlert({
                message: Messages.Default.pstinstSelectEmpty,
                state: true,
            })
            return
        }
        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postInstEapInfoUpdate({
            EAP_INST_REGISTER_NO: EAP_INST_REGISTER_NO,
            INST_NO: INST_NO,
            MIND_YN: MIND_YN,
            MIND_CURRENT_COUNT: _.isEmpty(MIND_CURRENT_COUNT)
                ? '0'
                : MIND_CURRENT_COUNT,
            MIND_MAX_COUNT: _.isEmpty(MIND_MAX_COUNT) ? '0' : MIND_MAX_COUNT,
            MIND_URL: MIND_URL,
            MIND_CODE: MIND_CODE,
            HEALTH_YN: HEALTH_YN,
            HEALTH_CURRENT_COUNT: _.isEmpty(HEALTH_CURRENT_COUNT)
                ? '0'
                : HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT: _.isEmpty(HEALTH_MAX_COUNT)
                ? '0'
                : HEALTH_MAX_COUNT,
            HEALTH_URL: HEALTH_URL,
            START_DE: START_DE,
            END_DE: END_DE,
            IS_LIVE: IS_LIVE,
        })

        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            resetListState()
            handleDeleteTabbyMatchRouter(`/manage/inst/eap-list/:eapNo/detail`)
            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/inst/eap-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleEapDelete = async ({ eapNo }: { eapNo: string }) => {
        setDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await postInstEapInfoDelete({ eapNo: eapNo })
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            resetListState()
            handleDeleteTabbyMatchRouter(`/manage/inst/eap-list/:eapNo/detail`)

            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/inst/eap-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    const handleGetInfo = useCallback(
        async ({ eapNo }: { eapNo: string }) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))

            const { status, payload } = await getInstEapInfoView({
                registNo: eapNo,
            })

            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: `success`,
                    info: {
                        ...payload,
                        MIND_CURRENT_COUNT:
                            payload.MIND_CURRENT_COUNT === '0'
                                ? ''
                                : payload.MIND_CURRENT_COUNT,
                        MIND_MAX_COUNT:
                            payload.MIND_MAX_COUNT === '0'
                                ? ''
                                : payload.MIND_MAX_COUNT,
                        HEALTH_CURRENT_COUNT:
                            payload.HEALTH_CURRENT_COUNT === '0'
                                ? ''
                                : payload.HEALTH_CURRENT_COUNT,
                        HEALTH_MAX_COUNT:
                            payload.HEALTH_MAX_COUNT === '0'
                                ? ''
                                : payload.HEALTH_MAX_COUNT,
                    },
                }))
            } else {
                eapDetailStateReset()
            }
        },
        [eapDetailStateReset, setDetailState]
    )

    useEffect(() => {
        const pageStart = () => {
            if (params.eapNo) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
                handleGetInfo({ eapNo: params.eapNo }).then()
                return
            }
            setPageState(prevState => ({
                ...prevState,
                pageMode: `new`,
            }))
        }

        pageStart()
    }, [handleGetInfo, params.eapNo])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable
                            pageMode={pageState.pageMode}
                            HandleSave={() => handleEaDetailSave()}
                            HandleUpdate={() => handleEapDetailUpdate()}
                            HandleDelete={e => handleEapDelete(e)}
                        />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default EapDetailMain
