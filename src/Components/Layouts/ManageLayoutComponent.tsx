import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar, Footer, HeaderStats } from '@Element/Layouts/Manage'
import {
    ManageLayoutContainer,
    ManageLayoutCenterWapper,
} from '@Style/Layouts/Manage/Common'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'
import { useEffect } from 'react'

export default function ManageLayoutComponent() {
    const leftMenuShowStatus = useRecoilValue(SelectMainLayoutState)

    useEffect(() => {
        console.debug(leftMenuShowStatus)
    }, [leftMenuShowStatus])
    return (
        <>
            <ManageLayoutContainer MenuState={leftMenuShowStatus.leftMenuShow}>
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
