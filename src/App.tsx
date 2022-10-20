import React, { useState } from 'react'
import '@Style/global.css'
import '@Style/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { RootRoutes } from '@Modules'
import SplashComponent from '@Component/SplashComponent'
import UnderConstructionComponent from '@Component/UnderConstructionComponent'

function App() {
    const [AppLoading, setAppLoading] = useState<boolean>(true)
    const [serverFail, setServerFail] = useState<boolean>(false)

    const handleAppLoading = () => {
        if (!AppLoading) {
            setAppLoading(true)
        } else {
            setAppLoading(false)
        }
    }

    const handleServerFail = () => {
        setServerFail(true)
    }

    return (
        <>
            {(function () {
                if (serverFail) {
                    return <UnderConstructionComponent />
                }

                if (AppLoading) {
                    return (
                        <SplashComponent
                            appLoading={handleAppLoading}
                            serverFail={handleServerFail}
                        />
                    )
                }

                return <RootRoutes />
            })()}
        </>
    )
}

export default App
