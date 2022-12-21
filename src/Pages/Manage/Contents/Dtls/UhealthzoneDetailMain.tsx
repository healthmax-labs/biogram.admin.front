import React, { useEffect, useState } from 'react'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { useLocation, useParams } from 'react-router-dom'
import UhealthzoneDetailTable from './UhealthzoneDetailTable'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const UhealthzoneDetailMain = () => {
    const locationState = useLocation()
    const params = useParams<{ UhealthZoneNo: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/contents/uhealthzone/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (
                params.UhealthZoneNo !== undefined &&
                params.UhealthZoneNo
            ) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }
        }

        funcChceckPageMode()
    }, [locationState, params.UhealthZoneNo])

    useEffect(() => {
        console.debug(pageState)
    }, [pageState])

    return (
        <>
            {pageState.pageMode && (
                <Container>
                    <LeftWapper>
                        <UhealthzoneDetailTable pageMode={pageState.pageMode} />
                    </LeftWapper>
                </Container>
            )}
        </>
    )
}

export default UhealthzoneDetailMain
