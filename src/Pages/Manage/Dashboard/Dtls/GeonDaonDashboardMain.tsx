import { useEffect } from 'react'
import GeonDaonDashboard from './GeonDaonDashboard'
import { useRecoilValue } from 'recoil'
import { useDashBoard } from '@Hooks'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'

const GeonDaonDashboardMain = () => {
    const { handleGetGeonDaonData } = useDashBoard()
    const dashBoardPageState = useRecoilValue(DashBoardPageState)

    useEffect(() => {
        const pageStart = () => {
            if (dashBoardPageState.status === 'idle') {
                handleGetGeonDaonData()
            }
        }

        pageStart()
    }, [dashBoardPageState.status, handleGetGeonDaonData])

    return <GeonDaonDashboard />
}

export default GeonDaonDashboardMain
