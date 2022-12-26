import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import DetailTable from './MagazineDetailTable'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const MagazineDetailMain = () => {
    const locationState = useLocation()
    const params = useParams<{ misn_step: string | undefined }>()

    const [pageState, setPageState] = useState<{
        pageMode: `new` | `modify` | null
    }>(initializeState)

    useEffect(() => {
        const funcChceckPageMode = () => {
            const { pathname } = locationState

            if (pathname === `/manage/contents/magazine-list/new`) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `new`,
                }))
            } else if (params.misn_step !== undefined && params.misn_step) {
                setPageState(prevState => ({
                    ...prevState,
                    pageMode: `modify`,
                }))
            }
        }

        funcChceckPageMode()
    }, [locationState, params.misn_step])

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

export default MagazineDetailMain
