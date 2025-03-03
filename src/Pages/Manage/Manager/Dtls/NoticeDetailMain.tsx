import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './NoticeDetailTable'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const NoticeDetailMain = () => {
    const locationState = useLocation()
    const params = useParams<{ NOTICE_NO: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/manager/notice/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (params.NOTICE_NO !== undefined && params.NOTICE_NO) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }
        }

        funcChceckPageMode()
    }, [locationState, params.NOTICE_NO])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <DetailTable pageMode={pageState.pageMode} />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default NoticeDetailMain
