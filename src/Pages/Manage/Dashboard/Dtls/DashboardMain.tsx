import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { MainLayoutThemeType } from '@CommonTypes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'

const GeonDaonDashboardMain = lazy(() => import('./GeonDaonDashboardMain'))

const {
    DetailPage: { Container },
} = PageContainerStyle

const {
    GeonDaonStyle: { MainWapper },
} = DashboardStyle

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
            <MainWapper>
                <Suspense>
                    {(() => {
                        if (pageState.theme === 'GeonDaon') {
                            return <GeonDaonDashboardMain />
                        } else {
                            return <GeonDaonDashboardMain />
                        }
                    })()}
                </Suspense>
            </MainWapper>
        </Container>
    )
}

export default DashboardMain
