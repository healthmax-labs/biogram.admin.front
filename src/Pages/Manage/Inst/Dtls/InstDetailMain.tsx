import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './InstDetailTable'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const InstDetailMain = () => {
    const locationState = useLocation()
    const params = useParams<{ instNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/inst/inst-list/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (params.instNo !== undefined && params.instNo) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }
        }

        funcChceckPageMode()
    }, [locationState, params.instNo])

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

export default InstDetailMain
