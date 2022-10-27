import {
    TopbarBelong,
    TopbarContainer,
    TopbarLeftBox,
    TopbarLoginOut,
    TopbarLoginOutIcon,
    TopbarName,
    TopbarSatus,
    TopbarWapper,
} from '@Style/Layouts/Manage/Common'
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
            <TopbarContainer>
                <TopbarWapper>
                    <TopbarLeftBox>
                        <HamburgerButton
                            ButtonClick={() => handleShowLeftMenu()}
                        />
                    </TopbarLeftBox>
                    <TopbarLeftBox>
                        <TopbarBelong>양평보건소</TopbarBelong>
                        <TopbarName>마스터님</TopbarName>
                        <TopbarSatus>46:37 후 자동 로그아웃</TopbarSatus>
                        <TopbarLoginOut>
                            <TopbarLoginOutIcon src={IconBtLogout} />
                        </TopbarLoginOut>
                    </TopbarLeftBox>
                </TopbarWapper>
            </TopbarContainer>
            {/* End Navbar */}
        </>
    )
}
