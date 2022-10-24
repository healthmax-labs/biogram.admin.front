import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar, Footer, HeaderStats } from '@Element/Layouts/Manage'
import {
    ManageLayoutContainer,
    ManageLayoutCenterWapper,
} from '@Style/Layouts/Manage/Common'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'

export default function ManageLayoutComponent() {
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

    return (
        <>
            <ManageLayoutContainer MenuState={leftMenuShow}>
                <Sidebar />
                <Topbar />
                <HeaderStats />
                <ManageLayoutCenterWapper>
                    <Outlet />
                    <Footer />
                </ManageLayoutCenterWapper>
            </ManageLayoutContainer>
        </>
    )
}
