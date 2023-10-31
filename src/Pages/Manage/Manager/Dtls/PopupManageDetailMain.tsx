import React, { useCallback, useEffect, useState } from 'react'
import {
    getPopupLlinkList,
    postPopupAdd,
    getPopupView,
    getPopupDelete,
    postPopupUpdate,
} from '@Service/ManagerService'
import PopupManageDetailTable from './PopupManageDetailTable'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import {
    PopupManageDetailState,
    PopupManageListState,
} from '@Recoil/ManagerPagesState'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useMainLayouts, useTab } from '@Hook/index'
import Messages from '@Messages'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: ``,
    linkListGetState: false,
}

const PopupManageDetailMain = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const { POPUP_PK } = useParams<{ POPUP_PK: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const [popupManageDetailState, setPopupManageDetailState] = useRecoilState(
        PopupManageDetailState
    )
    const resetPopupManageListState = useResetRecoilState(PopupManageListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const resetPopupManageDetailState = useResetRecoilState(
        PopupManageDetailState
    )
    const [pageState, setPageState] = useState<{
        pageMode: string | `new` | `detail`
        linkListGetState: boolean
    }>(initializeState)

    const handleGetList = useCallback(async () => {
        const { status, payload } = await getPopupLlinkList()
        if (status) {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                linkList: payload.POPUP_CODE_LIST,
            }))
            setPageState(prevState => ({
                ...prevState,
                linkListGetState: true,
            }))
        } else {
            setPageState(prevState => ({
                ...prevState,
                linkListGetState: false,
            }))
        }
    }, [setPopupManageDetailState])

    const handleInfoSave = async () => {
        setPopupManageDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const {
            POPUP_SJ,
            POPUP_CN,
            GLAN_TY,
            GLAN_VALUE,
            POPUP_BGNDT,
            POPUP_ENDDT,
            USE_AT,
            CLOSE_TYPE,
            SMALL_IMG_ATCHMNFL_INFO: { ATCHMNFL_NO: SMALL_IMG_ATCHMNFL_NO },
            BIG_IMG_ATCHMNFL_INFO: { ATCHMNFL_NO: BIG_IMG_ATCHMNFL_NO },
        } = popupManageDetailState.info

        const { status } = await postPopupAdd({
            POPUP_SJ: POPUP_SJ,
            POPUP_CN: POPUP_CN,
            GLAN_TY: GLAN_TY,
            GLAN_VALUE: GLAN_VALUE,
            POPUP_BGNDT: POPUP_BGNDT,
            POPUP_ENDDT: POPUP_ENDDT,
            USE_AT: USE_AT,
            CLOSE_TYPE: CLOSE_TYPE,
            SMALL_IMG_ATCHMNFL_NO: SMALL_IMG_ATCHMNFL_NO,
            BIG_IMG_ATCHMNFL_NO: BIG_IMG_ATCHMNFL_NO,
            EXPSR_AT: `Y`,
        })
        if (status) {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))
            resetPopupManageListState()
            resetPopupManageDetailState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            handleDeleteTabbyMatchRouter(
                '/manage/manager/popup-manage-list/new'
            )
            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/manager/popup-manage-list`,
            })
        } else {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleInfoUpdate = async () => {
        setPopupManageDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const {
            PK,
            POPUP_SJ,
            POPUP_CN,
            GLAN_TY,
            GLAN_VALUE,
            POPUP_BGNDT,
            POPUP_ENDDT,
            EXPSR_AT,
            USE_AT,
            CLOSE_TYPE,
            SMALL_IMG_ATCHMNFL_INFO: { ATCHMNFL_NO: SMALL_IMG_ATCHMNFL_NO },
            BIG_IMG_ATCHMNFL_INFO: { ATCHMNFL_NO: BIG_IMG_ATCHMNFL_NO },
        } = popupManageDetailState.info

        const { status } = await postPopupUpdate({
            PK: PK,
            POPUP_SJ: POPUP_SJ,
            POPUP_CN: POPUP_CN,
            GLAN_TY: GLAN_TY,
            GLAN_VALUE: GLAN_VALUE,
            POPUP_BGNDT: POPUP_BGNDT,
            POPUP_ENDDT: POPUP_ENDDT,
            EXPSR_AT: EXPSR_AT,
            USE_AT: USE_AT,
            CLOSE_TYPE: CLOSE_TYPE,
            SMALL_IMG_ATCHMNFL_NO: SMALL_IMG_ATCHMNFL_NO,
            BIG_IMG_ATCHMNFL_NO: BIG_IMG_ATCHMNFL_NO,
        })
        if (status) {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `success`,
            }))
            resetPopupManageListState()
            resetPopupManageDetailState()

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            handleDeleteTabbyMatchRouter(
                '/manage/manager/popup-manage-list/new'
            )
            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/manager/popup-manage-list`,
            })
        } else {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleGetInfo = useCallback(
        async (popupPk: string) => {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `loading`,
            }))

            const { status, payload } = await getPopupView({ PK: popupPk })
            if (status) {
                setPopupManageDetailState(prevState => ({
                    ...prevState,
                    status: `success`,
                    info: payload,
                }))
            } else {
                setPopupManageDetailState(prevState => ({
                    ...prevState,
                    status: `failure`,
                }))
            }
        },
        [setPopupManageDetailState]
    )

    const handleDelete = async (popupPk: string) => {
        setPopupManageDetailState(prevState => ({
            ...prevState,
            status: `loading`,
        }))

        const { status } = await getPopupDelete({ PK: popupPk })
        if (status) {
            resetPopupManageListState()
            resetPopupManageDetailState()
            handleDeleteTabbyMatchRouter(
                '/manage/manager/popup-manage-list/:POPUP_PK/detail'
            )

            navigate({
                pathname:
                    process.env.PUBLIC_URL +
                    `/manage/manager/popup-manage-list`,
            })
        } else {
            setPopupManageDetailState(prevState => ({
                ...prevState,
                status: `failure`,
            }))
        }
    }

    useEffect(() => {
        handleGetList().then()
    }, [handleGetList])

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/manager/popup-manage-list/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (POPUP_PK !== undefined && POPUP_PK) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `detail`,
                }))
            }
        }

        funcChceckPageMode()
    }, [POPUP_PK, locationState])

    return (
        <Container>
            <LeftWapper>
                {pageState.pageMode !== `` && pageState.linkListGetState && (
                    <PopupManageDetailTable
                        HandleDelete={({ popupPk }) => handleDelete(popupPk)}
                        PageMode={pageState.pageMode}
                        DetailPk={POPUP_PK ? POPUP_PK : ``}
                        HandleGetInfo={({ popupPk }) => handleGetInfo(popupPk)}
                        HandleInfoSave={() => handleInfoSave()}
                        HandleInfoUpdate={() => handleInfoUpdate()}
                    />
                )}
            </LeftWapper>
        </Container>
    )
}

export default PopupManageDetailMain
