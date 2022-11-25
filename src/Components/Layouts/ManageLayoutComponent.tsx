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
import { useAuth, useMainLayouts } from '@Hooks'

const { Container, CenterWapper } = LayoutStyle

const ManageLayoutComponent = () => {
    const navigate = useNavigate()
    const { handleLoginCheck, handleAttemptLogout } = useAuth()
    const { leftMenuShow, alertModel, handlMainAlert, OutletLoading } =
        useMainLayouts()

    // 로그인 체크
    useEffect(() => {
        const funcCheckLogin = async () => {
            const task = handleLoginCheck()
            if (!task) {
                await handleAttemptLogout().then()
                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                })
            }
        }

        funcCheckLogin().then()
    }, [handleAttemptLogout, handleLoginCheck, navigate])

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
