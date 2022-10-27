import { Outlet } from 'react-router-dom'
import { HeaderStats, Sidebar, Topbar } from '@Element/Layouts/Manage'
import { Mains } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'

export default function ManageLayoutComponent() {
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

    return (
        <>
            <Mains.Layout.Container MenuState={leftMenuShow}>
                <Sidebar />
                <Topbar />
                <HeaderStats />
                <Mains.Layout.CenterWapper>
                    <Outlet />
                </Mains.Layout.CenterWapper>
            </Mains.Layout.Container>
        </>
    )
}
