import { Outlet } from 'react-router-dom'
import { HeaderStats, Sidebar, Topbar } from '@Element/Layouts/Manage'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'

const { Container, CenterWapper } = LayoutStyle

export default function ManageLayoutComponent() {
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

    return (
        <>
            <Container MenuState={leftMenuShow}>
                <Sidebar />
                <Topbar />
                <HeaderStats />
                <CenterWapper>
                    <Outlet />
                </CenterWapper>
            </Container>
        </>
    )
}
