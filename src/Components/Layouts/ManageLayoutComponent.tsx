import { Outlet } from 'react-router-dom'
import { ManageHeaderStats, ManageSidebar, ManageTopbar } from '@Elements'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'
import MainTabComponent from '@Element/Layouts/MainTabComponent'

const { Container, CenterWapper } = LayoutStyle

export default function ManageLayoutComponent() {
    // 왼쪽 메뉴 보이기 상태.
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

    return (
        <>
            <Container MenuState={leftMenuShow}>
                <ManageSidebar />
                <ManageTopbar />
                <ManageHeaderStats />
                <CenterWapper>
                    <MainTabComponent />
                    <Outlet />
                </CenterWapper>
            </Container>
        </>
    )
}
