import React, { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ElementLoading } from '@Elements'
import { useTab } from '@Hooks'
import Const from '@Const'

export default function ManageRootPage() {
    const [activePathName, setActivePathName] = useState(
        '/manage/member/member-list'
    )
    const [pageTitle, setPageTitle] = useState<string>(``)
    const { tabState } = useTab()

    // 템에 따른 메인 페이지 동적 로딩.
    const renderTabPageComponent = () => {
        const chIndex = Const.Menus.findIndex(
            el => el.pathName === activePathName
        )
        const TabPageComponent = Const.Menus[chIndex].Component
        return <TabPageComponent />
    }

    // recoil 텝 스테이트 변경 되었을때
    useEffect(() => {
        const funcSetActivePathName = () => {
            const avticeTab = tabState.filter(el => el.active).shift()
            if (avticeTab) {
                setActivePathName(avticeTab.pathname)
                setPageTitle(avticeTab.name)
            }
        }

        funcSetActivePathName()
    }, [tabState])

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>:: 바이오그램 어드민 :: {pageTitle}</title>
                <link rel="canonical" href={`${process.env.PUBLIC_URL}`} />
            </Helmet>
            <Suspense fallback={<ElementLoading />}>
                {renderTabPageComponent()}
            </Suspense>
        </HelmetProvider>
    )
}
