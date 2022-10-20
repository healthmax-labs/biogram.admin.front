import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { BlankLayoutComponent, MageLayoutComponent } from '@Layouts'
import {
    LoginPage,
    Dashboard,
    BelongStatusPage,
    BelongManagePage,
} from '@Pages'

function RootRoutes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<BlankLayoutComponent />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>
                <Route element={<MageLayoutComponent />}>
                    <Route path="/manage/dashboard" element={<Dashboard />} />
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
