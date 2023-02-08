import React, { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { PageLoading } from '@Elements'
import Routers from '@Routers'
import { useRecoilValue } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import Const from '@Const'

const ManageRootPage = () => {
    const [activeRoutePathName, setActiveRoutePathName] = useState(
        `${Const.DefaultStartRouter}`
    )
    const [pageTitle, setPageTitle] = useState<string>(``)
    const tabState = useRecoilValue(AtomPageTabState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

    // 텝에 따른 메인 페이지 동적 로딩.
    const renderTabPageComponent = () => {
        const chIndex = Routers.Main.findIndex(
            el => el.pathName === activeRoutePathName
        )
        const TabPageComponent = Routers.Main[chIndex].Component
        return <TabPageComponent />
    }

    // recoil 텝 스테이트 변경 되었을때
    useEffect(() => {
        const funcSetActivePathName = () => {
            const avticeTab = tabState.list.filter(el => el.active).shift()
            if (avticeTab) {
                setActiveRoutePathName(avticeTab.routePath)
                setPageTitle(avticeTab.name)
            }
        }
        funcSetActivePathName()
    }, [tabState])

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    :: {`${mainLayoutState.SiteTitle}`} :: {pageTitle}
                </title>
                <link rel="canonical" href={`${process.env.PUBLIC_URL}`} />
            </Helmet>
            <div className={`App ${mainLayoutState.Theme} font-sans`}>
                <Suspense fallback={<PageLoading />}>
                    {renderTabPageComponent()}
                </Suspense>
            </div>
        </HelmetProvider>
    )
}

export default ManageRootPage
