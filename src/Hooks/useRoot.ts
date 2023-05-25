import { useEffect, useState, version } from 'react'
import { COLORLOG, getTokenInfo } from '@Helper'
import { systemHealthCheck } from '@Service/SystemService'
import { useSetRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import { v4 as uuid } from 'uuid'
import { getGeolocation } from '@Service/EtcService'
import { useAuth } from '@Hooks'
import { isEmpty, isNull } from 'lodash'
import Const from '@Const'

export default function useRoot() {
    const setAppRootState = useSetRecoilState(AtomRootState)
    const { handleGetLoginInfo, handleGetAuthorMenu } = useAuth()
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false)
    const [ServerFailState, setServerFail] = useState<boolean>(false)

    // 최초 로딩시 앱 초기화.
    useEffect(() => {
        const appStart = async () => {
            console.clear()
            COLORLOG('warning', ':: App Server Check :: ')

            let geolocation = {
                ip: ``,
                country: ``,
                'geo-ip': ``,
                'API Help': ``,
            }

            // 기본 서버 체크.
            const { status } = await systemHealthCheck()

            if (status) {
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
                let INST_NO: null | string = null
                let AUTH_CODE: null | string = null

                if (tokenInfo.TOKEN_INFO) {
                    const res = await handleGetLoginInfo()

                    if (res) {
                        USID = res.USID
                        NM = res.NM
                        MBER_NO = res.MBER_NO
                        INST_NM = res.INST_NM
                        INST_NO = res.INST_NO
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
                        INST_NO: !isEmpty(INST_NO)
                            ? INST_NO
                            : Const.MasterInstNo,
                    },
                }))

                COLORLOG('info', ':: App Init Finish :: ')
                setAppBaseCheckState(true)

                const styles = [
                    'min-width: 20px',
                    'font-size: 12px',
                    'font-family: monospace',
                    'background: white',
                    'display: inline-block',
                    'color: black',
                    'padding: 8px 19px',
                    'border: 1px dashed;',
                ].join(';')

                const appNameMsg = `%c Hi 👋! Welcome to BioGram Admin! \t\t \n App Name : ${process.env.REACT_APP_NAME} \t\t \n App Version : ${process.env.REACT_APP_VERSION} \t\t\t\t\t \n React Version : ${version} \t\t\t\t \n App NodeEnv : ${process.env.NODE_ENV} \t\t\t\t \n App Env : ${process.env.REACT_APP_ENV} \t\t\t\t\t `
                console.log(appNameMsg, styles)
            } else {
                COLORLOG('error', ':: App Init Failure :: ')
                setServerFail(true)
                return
            }
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
