import { Mains } from '@Style/Layouts/Manage/MainStyles'
import { IconBtLogout } from '@Assets'
import { HamburgerButton } from '@Component/Elements/Buttons'
import { useSetRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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
            <Mains.Topbar.Container>
                <Mains.Topbar.Wapper>
                    <Mains.Topbar.Left>
                        <HamburgerButton
                            ButtonClick={() => handleShowLeftMenu()}
                        />
                    </Mains.Topbar.Left>
                    <Mains.Topbar.Right>
                        <Mains.Topbar.Belong>양평보건소</Mains.Topbar.Belong>
                        <Mains.Topbar.Name>마스터님</Mains.Topbar.Name>
                        <Mains.Topbar.Status>
                            46:37 후 자동 로그아웃
                        </Mains.Topbar.Status>
                        <Mains.Topbar.Logout>
                            <Mains.Topbar.LogoutIcon src={IconBtLogout} />
                        </Mains.Topbar.Logout>
                    </Mains.Topbar.Right>
                </Mains.Topbar.Wapper>
            </Mains.Topbar.Container>
            {/* End Navbar */}
        </>
    )
}
