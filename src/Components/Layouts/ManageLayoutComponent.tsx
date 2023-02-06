import { Outlet, useNavigate } from 'react-router-dom'
import {
    AlertModal,
    ElementLoading,
    ManageHeaderStats,
    ManageSidebar,
    ManageTopbar,
} from '@Elements'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import MainTabComponent from '@Element/Layouts/MainTabComponent'
import { useEffect } from 'react'
import { useAuth, useMainLayouts, useRecoilReset } from '@Hooks'
import { useLocation } from 'react-router'
import { useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'

const { Container, CenterWapper } = LayoutStyle

const ManageLayoutComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { fullRecoilReset } = useRecoilReset()
    const appRootState = useRecoilValue(AtomRootState)
    const { handleLoginCheck, handleAttemptLogout } = useAuth()
    const { leftMenuShow, alertModel, handlMainAlert, OutletLoading } =
        useMainLayouts()

    // 로그인 체크
    useEffect(() => {
        const funcCheckLogin = async () => {
            const task = handleLoginCheck()
            if (!task) {
                if (!appRootState.attemptLogout) {
                    // await handleAttemptLogout({ attemptLogout: false }).then()
                }

                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }
        }

        funcCheckLogin().then()
    }, [
        appRootState.attemptLogout,
        handleAttemptLogout,
        handleLoginCheck,
        location,
        navigate,
    ])

    useEffect(() => {
        return () => {
            fullRecoilReset()
        }

        // FIXME : 종속성에서 무시.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container MenuState={leftMenuShow}>
                <ManageSidebar />
                <ManageTopbar />
                <ManageHeaderStats />
                <CenterWapper>
                    <MainTabComponent />
                    {OutletLoading ? (
                        <ElementLoading FullScreen={true} />
                    ) : (
                        <Outlet />
                    )}
                </CenterWapper>
            </Container>
            {alertModel.state && (
                <AlertModal
                    modalTitle={alertModel.message}
                    okButtonClick={() => {
                        handlMainAlert({ state: false, message: `` })
                    }}
                />
            )}
        </>
    )
}

export default ManageLayoutComponent
