import { Outlet, useNavigate } from 'react-router-dom'
import { ManageHeaderStats, ManageSidebar, ManageTopbar } from '@Elements'
import { LayoutStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'
import MainTabComponent from '@Element/Layouts/MainTabComponent'
import { useEffect } from 'react'
import { useAuth } from '@Hooks'

const { Container, CenterWapper } = LayoutStyle

const ManageLayoutComponent = () => {
    const navigate = useNavigate()
    const { handleLoginCheck, handleAttemptLogout } = useAuth()
    // 왼쪽 메뉴 보이기 상태.
    const { leftMenuShow } = useRecoilValue(SelectMainLayoutState)

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
                    <Outlet />
                </CenterWapper>
            </Container>
        </>
    )
}

export default ManageLayoutComponent
