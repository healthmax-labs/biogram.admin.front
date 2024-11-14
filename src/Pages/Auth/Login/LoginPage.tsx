import React, { Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import DtlPage from './Dtls/LoginMain'

const LoginPage = () => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    :: {`${mainLayoutState.SiteTitle}`} :: {`로그인`}
                </title>
                <link rel="canonical" href={`${process.env.PUBLIC_URL}`} />
            </Helmet>
            <Suspense>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    )
}

export default LoginPage
