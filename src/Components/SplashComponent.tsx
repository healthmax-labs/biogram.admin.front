import React, { useEffect } from 'react'
import { useRoot } from '@Hooks'
import { SplashPage } from '@Style/Pages/EtcPageStyles'
import { PageLoading } from '@Elements'

const { Container, Wapper, LoadingText } = SplashPage

const SplashComponent = ({
    appLoading,
    serverFail,
}: {
    appLoading: () => void
    serverFail: () => void
}) => {
    const { AppBaseCheckState, ServerFailState } = useRoot()

    useEffect(() => {
        const setAppMainLoading = (loading: boolean) => {
            if (loading) {
                appLoading()
            }
        }

        setAppMainLoading(AppBaseCheckState)
    }, [AppBaseCheckState, appLoading])

    useEffect(() => {
        // 서버 체크 에러시 공사중 페이지.
        const callServerFail = () => {
            if (ServerFailState) {
                serverFail()
            }
        }

        callServerFail()
    }, [ServerFailState, serverFail])

    return <PageLoading />
}

export default SplashComponent
