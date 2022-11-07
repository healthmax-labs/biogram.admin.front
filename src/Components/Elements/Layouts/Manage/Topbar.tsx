import { TopbarStyle } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import { HamburgerButton } from '@Component/Elements'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { AtomRootState } from '@Recoil/AppRootState'
import React, { useCallback, useEffect, useState } from 'react'
import { checkRemainingTime, getRemainingTime } from '@Helper'
import { useAuth } from '@Hooks'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'

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
    const setLeftMenuShow = useSetRecoilState(AtomMainLayoutState)
    const atomRootState = useRecoilValue(AtomRootState)
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
        setLeftMenuShow(prev => ({
            ...prev,
            leftMenuShow: !prev.leftMenuShow,
        }))
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
            if (!time) {
                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }
            const min =
                time && time.min.toString().length < 2
                    ? '0' + time.min
                    : time && time.min
            const sec =
                time && time.sec.toString().length < 2
                    ? '0' + time.sec
                    : time && time.sec
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
