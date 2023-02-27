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
import { useRecoilState, useRecoilValue } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { MemberListState } from '@Recoil/MemberPagesState'

const { Container, CenterWapper } = LayoutStyle

const ManageLayoutComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { fullRecoilReset } = useRecoilReset()
    const appRootState = useRecoilValue(AtomRootState)
    const { handleLoginCheck, handleAttemptLogout } = useAuth()
    const { leftMenuShow, alertModel, handlMainAlert, OutletLoading } =
        useMainLayouts()

    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [memberlistState, setMemberListState] =
        useRecoilState(MemberListState)

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

    useEffect(() => {
        // 건다온일 경우 회원 리스트 검색날짜를 20090101으로 변경 (임시)
        if (
            mainLayoutState.Theme === 'GeonDaon' &&
            memberlistState.status === 'idle'
        ) {
            setMemberListState(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    registDtFrom: `20090101`,
                },
            }))
        }
    }, [memberlistState.status, mainLayoutState, setMemberListState])

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
