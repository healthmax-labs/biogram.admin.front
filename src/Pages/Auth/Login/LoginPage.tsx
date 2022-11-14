import React, { Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const DtlPage = React.lazy(() => import('./Dtls/LoginMain'))

const LoginPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>:: 바이오그램 어드민 :: {`로그인`}</title>
                <link rel="canonical" href={`http://localhost`} />
            </Helmet>
            <Suspense>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    )
}

export default LoginPage
