import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BlankLayoutComponent, MageLayoutComponent } from '@Layouts'
import { LoginPage } from '@Page/Auth'
import { ManageRootPage } from '@Page/Manage'
import { DefaultListPage } from '@Page/Publish'
import Routers from '@Routers'
import { useMainLayouts } from '@Hook/index'
import { useEffect } from 'react'
import { MainLayoutThemeType } from '@CommonTypes'
import Const from '@Const'

const RootRoutes = () => {
    const { handleTheme } = useMainLayouts()

    useEffect(() => {
        //도메인 체크 해서 테마 변경.
        const hostName = window.location.hostname
        if (hostName === Const.GeonDaonThemeSiteURL) {
            handleTheme('GeonDaon' as MainLayoutThemeType)
        } else {
            handleTheme('')
        }
    }, [handleTheme])

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
                    {Routers.Main.map((el, index) => {
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
