import React, { useCallback, useEffect, useState } from 'react'
import { TopbarStyle } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import {
    HamburgerButton,
    VaryButton,
    VaryModal,
    VarySelectBox,
} from '@Component/Elements'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { checkRemainingTime, getRemainingTime } from '@Helper'
import { useAuth, useMainLayouts } from '@Hooks'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'
import Const from '@Const'
import Messages from '@Messages'
import { MainLayoutThemeType } from '@CommonTypes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const {
    Container,
    Left,
    Logout,
    LogoutIcon,
    Name,
    Right,
    Status,
    Wapper,
    Belong,
} = TopbarStyle

const initializeState = {
    user: {
        inst_nm: '',
        nm: '',
        free_yn: `N`,
        end_de: null,
    },
    remainingTime: `00:00`,
    modal: {
        loginExtension: {
            status: false,
            loading: false,
            text: ``,
        },
    },
}
const Topbar = () => {
    const navigate = useNavigate()
    const { handleAttemptLogout, handleTokenValidate } = useAuth()
    const { handleLeftMenuShow, handleTheme, handlMainAlert } = useMainLayouts()
    const appRootState = useRecoilValue(AtomRootState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    const [pageState, setPageState] = useState<{
        user: {
            inst_nm: string | null
            nm: string | null
            free_yn: string | `Y` | `N`
            end_de: string | null
        }
        remainingTime: string
        modal: {
            loginExtension: {
                status: boolean
                loading: boolean
                text: string
            }
        }
    }>(initializeState)

    const handleShowLeftMenu = () => {
        handleLeftMenuShow()
    }

    // 로그아웃 처리.
    const handleLogout = useCallback(
        async ({ attemptLogout }: { attemptLogout: boolean }) => {
            const task = await handleAttemptLogout({
                attemptLogout: attemptLogout,
            })
            if (task.status) {
            } else {
                //
            }
        },
        [handleAttemptLogout]
    )

    // 로그아웃 버튼 클릭 처리.
    const handleLogoutButtonClick = useCallback(async () => {
        handleLogout({ attemptLogout: true }).then(() => {
            navigate({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            })
        })
    }, [handleLogout, navigate])

    const handleClickLoginExtensionButton = useCallback(async () => {
        const { status } = await handleTokenValidate()
        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                loginExtension: {
                    ...prevState.modal.loginExtension,
                    status: false,
                    loading: false,
                },
            },
        }))
        if (!status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
            handleLogout({ attemptLogout: false }).then()
        }
    }, [handlMainAlert, handleLogout, handleTokenValidate])

    useEffect(() => {
        const funcSetUserName = () => {
            setPageState(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    inst_nm: isEmpty(appRootState.userinfo.INST_NM)
                        ? null
                        : appRootState.userinfo.INST_NM,
                    nm: isEmpty(appRootState.userinfo.NM)
                        ? null
                        : appRootState.userinfo.NM,
                    free_yn: isEmpty(appRootState.userinfo.NOT_FREE_YN)
                        ? `N`
                        : appRootState.userinfo.NOT_FREE_YN,
                    end_de: appRootState.userinfo.END_DE,
                },
            }))
        }

        funcSetUserName()
    }, [appRootState])

    useEffect(() => {
        // 로그아웃 버튼 눌렀을때는 체크없이 리턴.
        if (appRootState.attemptLogout) {
            return
        }

        // 시간이 남아 있는지 체크.
        if (!checkRemainingTime()) {
            handleLogout({ attemptLogout: false }).then()
            return
        }

        const timer = setTimeout(() => {
            const time = getRemainingTime()

            if (!time) {
                handleLogout({ attemptLogout: true }).then(() => {
                    navigate({
                        pathname: process.env.PUBLIC_URL + `/auth/login`,
                    })
                })
            }

            const min = time && String(time.min).padStart(2, '0')
            const sec = time && String(time.sec).padStart(2, '0')

            const showLogoutTime = `${min}:${sec}`

            if (time && time.min <= Const.autoLogoutMinTime) {
                setPageState(prevState => ({
                    ...prevState,
                    remainingTime: showLogoutTime,
                    modal: {
                        ...prevState.modal,
                        loginExtension: {
                            ...prevState.modal.loginExtension,
                            status: true,
                            text: `${showLogoutTime} ${Messages.Default.loginExtension}`,
                        },
                    },
                }))
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    remainingTime: showLogoutTime,
                }))
            }
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [appRootState.attemptLogout, handleLogout, navigate])

    return (
        <>
            {/* Navbar */}
            <Container>
                <Wapper>
                    <Left>
                        <HamburgerButton
                            ButtonClick={() => handleShowLeftMenu()}
                        />
                        {process.env.REACT_APP_ENV === 'development' && (
                            <div className={`flex px-3`}>
                                <VarySelectBox
                                    Placeholder={`테마를 선택해 주세요`}
                                    HandleOnChange={e =>
                                        handleTheme(
                                            e.value as MainLayoutThemeType
                                        )
                                    }
                                    Value={mainLayoutState.Theme}
                                    Elements={Const.mainLayoutTheme.map(e => {
                                        return {
                                            text: e.name,
                                            value: e.code,
                                        }
                                    })}
                                />
                            </div>
                        )}
                    </Left>
                    <Right>
                        <Belong>{`${
                            pageState.user.inst_nm ? pageState.user.inst_nm : ''
                        }`}</Belong>
                        <Name>
                            {`${pageState.user.nm ? pageState.user.nm : ''}`}님
                        </Name>
                        <Status>{`${
                            pageState.user.free_yn === 'Y'
                                ? `만료일: ${(() => {
                                      const endDe = `${pageState.user.end_de}`
                                      return `${endDe.substring(
                                          0,
                                          4
                                      )}년 ${endDe.substring(
                                          4,
                                          6
                                      )}월${endDe.substring(6, 8)}일`
                                  })()}`
                                : ``
                        }`}</Status>
                        <Status>
                            {`${pageState.remainingTime}`} 후 자동 로그아웃
                        </Status>
                        <Logout>
                            <LogoutIcon
                                src={IconBtLogout}
                                onClick={() => handleLogoutButtonClick()}
                            />
                        </Logout>
                    </Right>
                </Wapper>
            </Container>
            {pageState.modal.loginExtension.status && (
                <VaryModal
                    ModalLoading={pageState.modal.loginExtension.loading}
                    Children={
                        <div className="text-xs text-rose-600 animate-bounce">
                            {pageState.modal.loginExtension.text}
                        </div>
                    }
                    MaxWidth={`sm`}
                    Buttons={
                        <>
                            {!pageState.modal.loginExtension.loading && (
                                <>
                                    <VaryButton
                                        ButtonType={'default'}
                                        ButtonName={'로그아웃'}
                                        HandleClick={() => {
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    loginExtension: {
                                                        ...prevState.modal
                                                            .loginExtension,
                                                        status: false,
                                                        text: ``,
                                                    },
                                                },
                                            }))

                                            handleLogout({
                                                attemptLogout: true,
                                            }).then()
                                        }}
                                    />
                                    <VaryButton
                                        ButtonType={'default'}
                                        ButtonName={'로그인 연장'}
                                        HandleClick={() => {
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    loginExtension: {
                                                        ...prevState.modal
                                                            .loginExtension,

                                                        loading: true,
                                                    },
                                                },
                                            }))

                                            handleClickLoginExtensionButton().then()
                                        }}
                                    />
                                </>
                            )}
                        </>
                    }
                />
            )}

            {/* End Navbar */}
        </>
    )
}

export default React.memo(Topbar)
