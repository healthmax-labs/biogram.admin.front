import React, { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ElementLoading } from '@Elements'
import Const from '@Const'
import { useRecoilValue } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'

export default function ManageRootPage() {
    const [activePathName, setActivePathName] = useState(
        '/manage/member/member-list'
    )
    const [pageTitle, setPageTitle] = useState<string>(``)
    const tabState = useRecoilValue(AtomPageTabState)

    // 템에 따른 메인 페이지 동적 로딩.
    const renderTabPageComponent = () => {
        const chIndex = Const.Routers.findIndex(
            el => el.pathName === activePathName
        )
        const TabPageComponent = Const.Routers[chIndex].Component
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
