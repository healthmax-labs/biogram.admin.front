import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultGroupDetailTable from './ConsultGroupDetailTable'
import { useEffect, useState } from 'react'
import { matchRoutes, useNavigate } from 'react-router-dom'
import Routers from '@Routers'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const ConsultGroupDetailMain = () => {
    const navigate = useNavigate()
    const [pageState, setPageState] = useState<{
        pageMode: null | 'new' | 'modify'
    }>(initializeState)

    useEffect(() => {
        const pageStart = () => {
            const routerMatchs = matchRoutes(
                Routers.Main.map(el => {
                    return {
                        path: el.pathName,
                    }
                }),
                location
            )

            if (routerMatchs) {
                // /manage/member/consult-group/:GROUP_NO/detail | /manage/member/consult-group-list/new
                const routeInfo = routerMatchs[0]

                if (
                    routeInfo.pathname ===
                    '/manage/member/consult-group-list/new'
                ) {
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: 'new',
                    }))
                } else {
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: 'modify',
                    }))
                }
            } else {
                navigate({
                    pathname:
                        process.env.PUBLIC_URL +
                        `/manage/member/consult-group-list/new`,
                })
            }
        }

        pageStart()
    }, [navigate])

    return (
        <Container>
            {pageState.pageMode && (
                <LeftWapper>
                    <ConsultGroupDetailTable pageMode={pageState.pageMode} />
                </LeftWapper>
            )}
        </Container>
    )
}

export default ConsultGroupDetailMain
