import { TopbarStyle } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import { HamburgerButton } from '@Component/Elements/Buttons'
import { useSetRecoilState } from 'recoil'
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

export default function Navbar() {
    const setLeftMenuShow = useSetRecoilState(AtomMainLayoutState)

    const handleShowLeftMenu = () => {
        setLeftMenuShow(prev => ({
            ...prev,
            leftMenuShow: !prev.leftMenuShow,
        }))
    }

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
                        <Status>46:37 후 자동 로그아웃</Status>
                        <Logout>
                            <LogoutIcon src={IconBtLogout} />
                        </Logout>
                    </Right>
                </Wapper>
            </Container>
            {/* End Navbar */}
        </>
    )
}
