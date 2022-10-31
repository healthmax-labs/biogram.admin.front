import { Outlet } from 'react-router-dom'
import { ManageHeaderStats, ManageSidebar, ManageTopbar } from '@Elements'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'

const { Container, CenterWapper } = LayoutStyle

export default function ManageLayoutComponent() {
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

    return (
        <>
            <Container MenuState={leftMenuShow}>
                <ManageSidebar />
                <ManageTopbar />
                <ManageHeaderStats />
                <CenterWapper>
                    <Outlet />
                </CenterWapper>
            </Container>
        </>
    )
}
