import { useState, useEffect } from 'react'
import { COLORLOG } from '@Helper'
import { systemHealthCheck } from '@Service/SystemService'

export default function useRoot() {
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false)
    const [ServerFailState, setServerFail] = useState<boolean>(false)

    // 최초 로딩시 앱 초기화.
    useEffect(() => {
        const appStart = async () => {
            COLORLOG('warning', ':: App Server Check :: ')

            // 기본 서버 체크.
            const { status } = await systemHealthCheck()
            if (!status) {
                setServerFail(true)
                return
            }

            COLORLOG('info', ':: App Init Finish :: ')
            setAppBaseCheckState(true)
        }

        COLORLOG('info', ':: App Init Start :: ')
        appStart().then()
    }, [])

    useEffect(() => {
        if (ServerFailState) {
            // TODO : 서버 체크후 이전 로그인 어떻게 할것 인지?
        }
    }, [ServerFailState])

    return {
        AppBaseCheckState,
        ServerFailState,
    }
}
