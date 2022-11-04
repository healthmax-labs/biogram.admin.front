import { useEffect, useState } from 'react'
import { COLORLOG, getTokenInfo } from '@Helper'
import { systemHealthCheck } from '@Service/SystemService'
import { useSetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { v4 as uuid } from 'uuid'
import { getGeolocation } from '@Service/EtcService'

export default function useRoot() {
    const setAppRootState = useSetRecoilState(AtomRootState)
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false)
    const [ServerFailState, setServerFail] = useState<boolean>(false)

    // 최초 로딩시 앱 초기화.
    useEffect(() => {
        const appStart = async () => {
            COLORLOG('warning', ':: App Server Check :: ')

            let geolocation = {
                IPv4: ``,
                city: ``,
                country_code: ``,
                country_name: ``,
                latitude: 0,
                longitude: 0,
                postal: false,
                state: '',
            }

            // 기본 서버 체크.
            const {
                status,
                payload: { CON_HISTORY },
            } = await systemHealthCheck()

            if (!status) {
                setServerFail(true)
                return
            }

            const resGeolocation = await getGeolocation()
            if (resGeolocation.status) {
                geolocation = resGeolocation.payload
            }

            // 로그인 체크.
            const tokenInfo = getTokenInfo()

            // TODO : 토큰이 있을때 토큰 정보 체크.

            // TODO : 메뉴 불러오기.

            setAppRootState(prevState => ({
                ...prevState,
                init: true,
                uuid: uuid(),
                login: !!tokenInfo.TOKEN_INFO,
                ConHistory: CON_HISTORY,
                Geolocation: geolocation,
                logininfo: {
                    TOKEN_INFO: tokenInfo.TOKEN_INFO,
                    VTOKEN_INFO: tokenInfo.VTOKEN_INFO,
                    TOKEN_LIMIT_TIME: tokenInfo.TOKEN_LIMIT_TIME,
                    AUTHORIZE_CODE: tokenInfo.AUTHORIZE_CODE,
                },
            }))

            COLORLOG('info', ':: App Init Finish :: ')
            setAppBaseCheckState(true)
        }

        COLORLOG('info', ':: App Init Start :: ')
        appStart().then()
    }, [])

    // 서버 체크 에러 났을때.
    useEffect(() => {
        if (ServerFailState) {
            // TODO : 서버 에러 났을때. 처리?
        }
    }, [ServerFailState])

    return {
        AppBaseCheckState,
        ServerFailState,
    }
}
