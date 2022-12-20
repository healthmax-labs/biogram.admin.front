import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BlankLayoutComponent, MageLayoutComponent } from '@Layouts'
import { LoginPage } from '@Page/Auth'
import { ManageRootPage } from '@Page/Manage'
import { DefaultListPage } from '@Page/Publish'
import Routers from '@Routers'

const RootRoutes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<BlankLayoutComponent />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>
                <Route element={<MageLayoutComponent />}>
                    <Route
                        path="/publish/default/default-list"
                        element={<DefaultListPage />}
                    />
                    {Routers.map((el, index) => {
                        return (
                            <Route
                                key={index}
                                path={el.pathName}
                                element={<ManageRootPage />}
                            />
                        )
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RootRoutes
