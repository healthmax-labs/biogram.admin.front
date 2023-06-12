import { Outlet, useNavigate } from 'react-router-dom'
import {
    AlertModal,
    ElementLoading,
    ManageHeaderStats,
    ManageSidebar,
    ManageTopbar,
    VaryButton,
    VaryModal,
} from '@Elements'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import MainTabComponent from '@Element/Layouts/MainTabComponent'
import React, { useEffect, useState } from 'react'
import { useAuth, useMainLayouts, useRecoilReset } from '@Hooks'
import { useLocation } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { MemberListState } from '@Recoil/MemberPagesState'
import { ManualPopup, ManualPopupButton } from '@Assets'
import { storageManager, getDetailDateDayMonthUnit } from '@Helper'

const { Container, CenterWapper } = LayoutStyle

const initializeState = {
    modal: {
        manualDownload: false,
    },
}

const ManageLayoutComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { fullRecoilReset } = useRecoilReset()
    const appRootState = useRecoilValue(AtomRootState)
    const { handleLoginCheck, handleAttemptLogout } = useAuth()
    const { leftMenuShow, alertModel, handlMainAlert, OutletLoading } =
        useMainLayouts()

    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [memberlistState, setMemberListState] =
        useRecoilState(MemberListState)

    const [pageState, setPageState] = useState<{
        modal: {
            manualDownload: boolean
        }
    }>(initializeState)

    // 로그인 체크
    useEffect(() => {
        const funcCheckLogin = async () => {
            const task = handleLoginCheck()
            if (!task) {
                if (!appRootState.attemptLogout) {
                    // await handleAttemptLogout({ attemptLogout: false }).then()
                }

                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }
        }

        funcCheckLogin().then()
    }, [
        appRootState.attemptLogout,
        handleAttemptLogout,
        handleLoginCheck,
        location,
        navigate,
    ])

    useEffect(() => {
        return () => {
            fullRecoilReset()
        }

        // FIXME : 종속성에서 무시.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // 건다온일 경우 회원 리스트 검색날짜를 20090101으로 변경 (임시)
        if (
            mainLayoutState.Theme === 'GeonDaon' &&
            memberlistState.status === 'idle'
        ) {
            setMemberListState(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    registDtFrom: `20090101`,
                },
            }))
        }
    }, [memberlistState.status, mainLayoutState, setMemberListState])

    useEffect(() => {
        // console.debug(getDetailDateDayMonthUnit(1))
        // console.debug(getDetailDateDayMonthUnit(0))
    }, [])

    useEffect(() => {
        const pageStart = () => {
            // 메뉴얼 다운로드 오늘 하루 그만 보기 체크
            let mdState = false
            const md = storageManager.get('ManualDownload')

            if (!md) {
                mdState = true
            }

            if (md && Number(getDetailDateDayMonthUnit(0)) > Number(md)) {
                mdState = true
            }

            setPageState(prevState => ({
                ...prevState,
                modal: {
                    ...prevState,
                    manualDownload: mdState,
                },
            }))
        }

        pageStart()
    }, [])

    return (
        <>
            <Container MenuState={leftMenuShow}>
                <ManageSidebar />
                <ManageTopbar />
                <ManageHeaderStats />
                <CenterWapper>
                    <MainTabComponent />
                    {OutletLoading ? (
                        <ElementLoading FullScreen={true} />
                    ) : (
                        <Outlet />
                    )}
                </CenterWapper>
            </Container>
            {alertModel.state && (
                <AlertModal
                    modalTitle={alertModel.message}
                    okButtonClick={() => {
                        handlMainAlert({ state: false, message: `` })
                    }}
                />
            )}
            {pageState.modal.manualDownload && (
                <VaryModal
                    ModalLoading={false}
                    MaxWidth={'max'}
                    Children={
                        <div className="">
                            <div className="flex w-full justify-center items-center object-center">
                                <img
                                    className="object-contain"
                                    src={ManualPopup}
                                    alt=""
                                />
                            </div>
                            <div className="flex w-full justify-center items-center object-center pt-3">
                                <img
                                    className="cursor-pointer object-contain w-96"
                                    src={ManualPopupButton}
                                    alt=""
                                    onClick={() => {
                                        window.open(
                                            'https://api.mybiogram.com/common/file?atchmnfl_nm=K0UrNXpYZWFNVW1ucXZ3bmpGZlQ5QT09'
                                        )
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState,
                                                manualDownload: false,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                    }
                    Buttons={
                        <>
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'오늘 하루 그만 보기'}
                                HandleClick={() => {
                                    storageManager.set(
                                        'ManualDownload',
                                        getDetailDateDayMonthUnit(1)
                                    )

                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState,
                                            manualDownload: false,
                                        },
                                    }))
                                }}
                            />
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'닫기'}
                                HandleClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState,
                                            manualDownload: false,
                                        },
                                    }))
                                }}
                            />
                        </>
                    }
                />
            )}
        </>
    )
}

export default ManageLayoutComponent
