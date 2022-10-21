import { Outlet } from 'react-router-dom'
import { Sidebar, Navbar, Footer, HeaderStats } from '@Element/Layouts/Manage'
import {
    ManageLayoutContainer,
    ManageLayoutCenterWapper,
} from '@Style/Layouts/Manage/Common'

export default function ManageLayoutComponent() {
    return (
        <>
            <Sidebar />
            <ManageLayoutContainer>
                <Navbar />
                <HeaderStats />
                <ManageLayoutCenterWapper>
                    <Outlet />
                    <Footer />
                </ManageLayoutCenterWapper>
            </ManageLayoutContainer>
        </>
    )
}
