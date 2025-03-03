import React, { useState } from 'react'
import { RecoilRoot } from 'recoil'
import '@Style/global.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-quill/dist/quill.snow.css'

import SplashComponent from '@Component/SplashComponent'
import UnderConstructionComponent from '@Component/UnderConstructionComponent'
import { RootRoutes } from '@Modules'

const App = () => {
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
        <RecoilRoot>
            {(() => {
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
        </RecoilRoot>
    )
}

export default App
