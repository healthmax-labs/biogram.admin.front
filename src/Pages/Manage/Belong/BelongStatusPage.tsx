import React, { Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function BelongStatusPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>:: 바이오그램 어드민 :: {`소속 현황`}</title>
                <link rel="canonical" href={`http://localhost`} />
            </Helmet>
            <Suspense>소속 현황</Suspense>
        </HelmetProvider>
    )
}
