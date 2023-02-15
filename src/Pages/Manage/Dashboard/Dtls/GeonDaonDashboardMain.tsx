import { useEffect } from 'react'
import GeonDaonDashboard from './GeonDaonDashboard'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useDashBoard } from '@Hooks'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'

const GeonDaonDashboardMain = () => {
    const { handleGetGeonDaonData } = useDashBoard()
    const dashBoardPageState = useRecoilValue(DashBoardPageState)
    const [pageTabState, setPageTabState] = useRecoilState(AtomPageTabState)

    useEffect(() => {
        const pageStart = () => {
            if (dashBoardPageState.status === 'idle') {
                handleGetGeonDaonData()
            }
        }

        pageStart()
    }, [dashBoardPageState.status, handleGetGeonDaonData])

    useEffect(() => {
        const { name, action } = pageTabState.reloadTask

        if (name === '/manage/dashboard' && action) {
            handleGetGeonDaonData()

            setPageTabState(prevState => ({
                ...prevState,
                reloadTask: {
                    name: '',
                    action: false,
                },
            }))
        }
    }, [handleGetGeonDaonData, pageTabState.reloadTask, setPageTabState])

    return <GeonDaonDashboard />
}

export default GeonDaonDashboardMain
