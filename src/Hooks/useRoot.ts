import { useEffect, useState } from 'react'
import { COLORLOG, getTokenInfo } from '@Helper'
import { systemHealthCheck } from '@Service/SystemService'
import { useSetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { v4 as uuid } from 'uuid'
import { getGeolocation } from '@Service/EtcService'
import { useAuth } from '@Hooks'
import { isEmpty, isNull } from 'lodash'

export default function useRoot() {
    const setAppRootState = useSetRecoilState(AtomRootState)
    const { handleGetLoginInfo, handleGetAuthorMenu } = useAuth()
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

            // 토큰이 있을때 토큰 정보 체크.
            let USID: null | string = null
            let NM: null | string = null
            let MBER_NO: null | number = null
            let INST_NM: null | string = null
            let AUTH_CODE: null | string = null

            if (tokenInfo.TOKEN_INFO) {
                const res = await handleGetLoginInfo()

                if (res) {
                    USID = res.USID
                    NM = res.NM
                    MBER_NO = res.MBER_NO
                    INST_NM = res.INST_NM
                    AUTH_CODE = res.AUTH_CODE
                }

                if (res) {
                    // 메뉴 불러오기.
                    await handleGetAuthorMenu({
                        authCode: res.AUTH_CODE,
                        menuCode: process.env.REACT_APP_MENU_CODE
                            ? process.env.REACT_APP_MENU_CODE
                            : '',
                    })
                }
            }

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
                userinfo: {
                    USID: !isEmpty(USID) ? USID : null,
                    NM: !isEmpty(NM) ? NM : null,
                    MBER_NO: !isNull(MBER_NO) ? MBER_NO : null,
                    AUTH_CODE: !isEmpty(AUTH_CODE) ? AUTH_CODE : null,
                    INST_NM: !isEmpty(INST_NM) ? INST_NM : null,
                },
            }))

            COLORLOG('info', ':: App Init Finish :: ')
            setAppBaseCheckState(true)

            console.log(`\x1b[7m┎───────────────────────────────────┐`)

            console.log(
                `\x1b[7m│ \x1b[32mApp \x1b[33mName \x1b[35m: \x1b[36m${process.env.REACT_APP_NAME}\x1b[0m \t\x1b[7m│`
            )

            console.log(
                `\x1b[7m│ \x1b[32mApp \x1b[33mVersion \x1b[35m: \x1b[36m${process.env.REACT_APP_VERSION}\x1b[0m \t\t\t\t\x1b[7m│`
            )

            console.log(
                `\x1b[7m│ \x1b[32mApp \x1b[33mNodeEnv \x1b[35m: \x1b[36m${process.env.NODE_ENV}\x1b[0m \t\t\x1b[7m│`
            )

            console.log(
                `\x1b[7m│ \x1b[32mApp \x1b[33mEnv \x1b[35m: \x1b[36m${process.env.NODE_ENV}\x1b[0m \t\t\t\x1b[7m│`
            )
            console.log(`\x1b[7m┖───────────────────────────────────┙`)
        }

        COLORLOG('info', ':: App Init Start :: ')

        appStart().then()
    }, [handleGetAuthorMenu, handleGetLoginInfo, setAppRootState])

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
