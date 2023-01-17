import { TopbarStyle } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import { HamburgerButton, VarySelectBox } from '@Component/Elements'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import React, { useCallback, useEffect, useState } from 'react'
import { checkRemainingTime, getRemainingTime } from '@Helper'
import { useAuth, useMainLayouts } from '@Hooks'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'
import Const from '@Const'
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

const Topbar = () => {
    const navigate = useNavigate()
    const { handleAttemptLogout } = useAuth()
    const { handleLeftMenuShow, handleTheme } = useMainLayouts()
    const atomRootState = useRecoilValue(AtomRootState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [remainingTime, setRemainingTime] = useState<string>(`00:00`)
    const [pageState, setPageState] = useState<{
        user: {
            inst_nm: string | null
            nm: string | null
        }
    }>({
        user: {
            inst_nm: '',
            nm: '',
        },
    })

    const handleShowLeftMenu = () => {
        handleLeftMenuShow()
    }

    const handleLogout = useCallback(async () => {
        const task = await handleAttemptLogout()
        if (task.status) {
        } else {
            //
        }
    }, [handleAttemptLogout])

    const handleLogoutButtonClick = async () => {
        handleLogout().then()
    }

    useEffect(() => {
        const funcSetUserName = () => {
            setPageState(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    inst_nm: isEmpty(atomRootState.userinfo.INST_NM)
                        ? null
                        : atomRootState.userinfo.INST_NM,
                    nm: isEmpty(atomRootState.userinfo.NM)
                        ? null
                        : atomRootState.userinfo.NM,
                },
            }))
        }

        funcSetUserName()
    }, [atomRootState])

    useEffect(() => {
        // 시간이 남아 있는지 체크.
        if (!checkRemainingTime()) {
            handleLogout().then()
            return
        }

        const timer = setTimeout(() => {
            const time = getRemainingTime()
            console.debug(time)
            if (!time) {
                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }

            const min = time && String(time.min).padStart(2, '0')
            const sec = time && String(time.sec).padStart(2, '0')

            setRemainingTime(`${min}:${sec}`)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [handleLogout, navigate])

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
                        <Status>{`${remainingTime}`} 후 자동 로그아웃</Status>
                        <Logout>
                            <LogoutIcon
                                src={IconBtLogout}
                                onClick={() => handleLogoutButtonClick()}
                            />
                        </Logout>
                    </Right>
                </Wapper>
            </Container>
            {/* End Navbar */}
        </>
    )
}

export default React.memo(Topbar)
