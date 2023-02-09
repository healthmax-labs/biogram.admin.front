import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { MainLayoutThemeType } from '@CommonTypes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'

const GeonDaonDashboard = lazy(() => import('./GeonDaonDashboard'))

const {
    DetailPage: { Container },
} = PageContainerStyle

const initializeState = {
    theme: '',
}

const DashboardMain = () => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [pageState, setPageState] = useState<{ theme: MainLayoutThemeType }>(
        initializeState
    )

    useEffect(() => {
        const funcSetDashBoard = (theme: MainLayoutThemeType) => {
            setPageState(prevState => ({
                ...prevState,
                theme: theme,
            }))
        }

        if (mainLayoutState.Theme !== pageState.theme) {
            funcSetDashBoard(mainLayoutState.Theme)
        }
    }, [mainLayoutState.Theme, pageState.theme])

    return (
        <Container>
            <div className="flex w-center-width bg-gray-100">
                <Suspense>
                    {(() => {
                        if (pageState.theme === 'GeonDaon') {
                            return <GeonDaonDashboard />
                        } else {
                            return <GeonDaonDashboard />
                        }
                    })()}
                </Suspense>
            </div>
        </Container>
    )
}

export default DashboardMain
