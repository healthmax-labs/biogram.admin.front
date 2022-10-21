import React, { Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const DtlPage = React.lazy(() => import('./Dtls/BelongMain'))

export default function BelongManagePage() {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>:: 바이오그램 어드민 :: {`소속 & 속성 관리`}</title>
                <link rel="canonical" href={`http://localhost`} />
            </Helmet>
            <Suspense>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    )
}
