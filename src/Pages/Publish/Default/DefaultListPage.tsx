import React, { Suspense } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const DtlPage = React.lazy(() => import('./Dtls/ListMain'))

export default function DefaultListPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>:: 바이오그램 어드민 :: {`퍼블리싱 기본 리스트`}</title>
                <link rel="canonical" href={`http://localhost`} />
            </Helmet>
            <Suspense>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    )
}
