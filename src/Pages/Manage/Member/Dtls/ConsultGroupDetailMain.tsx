import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import ConsultGroupDetailTable from './ConsultGroupDetailTable'
import { useCallback, useEffect, useState } from 'react'
import { matchRoutes, useNavigate, useParams } from 'react-router-dom'
import Routers from '@Routers'
import { useRecoilState } from 'recoil'
import { ConsultGroupDetailState } from '@Recoil/MemberPagesState'
import { getMngCnstgrpInfo } from '@Service/MemberService'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'

const {
    DetailPage: { Container, LeftWapper },
} = PageContainerStyle

const initializeState = {
    pageMode: null,
}

const ConsultGroupDetailMain = () => {
    const params = useParams<{
        groupNo: string | undefined
    }>()
    const navigate = useNavigate()
    const { handlMainAlert } = useMainLayouts()
    const [detailState, setDetailState] = useRecoilState(
        ConsultGroupDetailState
    )
    const [pageState, setPageState] = useState<{
        pageMode: null | 'new' | 'modify'
    }>(initializeState)

    const handleGetInfo = useCallback(async () => {
        setDetailState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { groupNo } = detailState
        if (groupNo) {
            const { status, payload } = await getMngCnstgrpInfo({
                groupNo: groupNo,
            })
            if (status) {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    detail: payload,
                    origin: payload,
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
            }
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }, [detailState, handlMainAlert, setDetailState])

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
                // /manage/member/consult-group/:groupNo/detail | /manage/member/consult-group-list/new
                const routeInfo = routerMatchs[0].route

                if (
                    routeInfo.path ===
                    '/manage/member/consult-group/:groupNo/detail'
                ) {
                    const { groupNo } = params
                    if (groupNo) {
                        setDetailState(prevState => ({
                            ...prevState,
                            groupNo: Number(groupNo),
                        }))
                    }
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: 'modify',
                    }))
                } else {
                    setPageState(prevState => ({
                        ...prevState,
                        pageMode: 'new',
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
    }, [navigate, params, setDetailState])

    useEffect(() => {
        if (pageState.pageMode === 'modify' && detailState.groupNo) {
            if (detailState.status === 'idle') handleGetInfo().then()
        }
    }, [
        detailState.status,
        handleGetInfo,
        pageState.pageMode,
        detailState.groupNo,
    ])

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
