import { TopbarStyle } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import { HamburgerButton } from '@Component/Elements'
import { useSetRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useEffect, useState } from 'react'
import { checkRemainingTime, getRemainingTime } from '@Helper'
import { useAuth } from '@Hooks'
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

export default function Topbar() {
    const navigate = useNavigate()
    const { handleAttemptLogout } = useAuth()
    const setLeftMenuShow = useSetRecoilState(AtomMainLayoutState)
    const [remainingTime, setRemainingTime] = useState<string>(`00:00`)

    const handleShowLeftMenu = () => {
        setLeftMenuShow(prev => ({
            ...prev,
            leftMenuShow: !prev.leftMenuShow,
        }))
    }

    const handleLogout = async () => {
        const task = await handleAttemptLogout()
        if (task.status) {
            navigate({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            })
        } else {
            //
        }
    }

    const handleLogoutButtonClick = async () => {
        handleLogout().then()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // 시간이 남아 있는지 체크.
            if (!checkRemainingTime()) {
                handleLogout().then()
                return false
            }
            const time = getRemainingTime()
            const min =
                time.min.toString().length < 2 ? '0' + time.min : time.min
            const sec =
                time.sec.toString().length < 2 ? '0' + time.sec : time.sec
            setRemainingTime(`${min}:${sec}`)
        }, 1000)

        return () => clearTimeout(timer)
    }, [remainingTime])

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
                        <Belong>양평보건소</Belong>
                        <Name>마스터님</Name>
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
