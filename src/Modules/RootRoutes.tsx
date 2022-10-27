import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BlankLayoutComponent, MageLayoutComponent } from '@Layouts'
import { LoginPage } from '@Page/Auth'
import {
    BelongManagePage,
    BelongStatusPage,
    MemberListPage,
} from '@Page/Manage'

import { DefaultListPage } from '@Page/Publish'

function RootRoutes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<BlankLayoutComponent />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>
                <Route element={<MageLayoutComponent />}>
                    <Route
                        path="/publish/default/default-list"
                        element={<DefaultListPage />}
                    />
                    <Route
                        path="/manage/member/member-list"
                        element={<MemberListPage />}
                    />
                    <Route
                        path="/manage/belong/belong-status"
                        element={<BelongStatusPage />}
                    />
                    <Route
                        path="/manage/belong/belong-manage"
                        element={<BelongManagePage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RootRoutes
