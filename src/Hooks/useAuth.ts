import { login } from '@Service/AuthService'
import { useRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import {
    add60Minutes,
    checkRemainingTime,
    getAccessToken,
    removeLoginExpirein,
    removeLoginToken,
    saveLoginToken,
    storageMaster,
} from '@Helper'
import { isEmpty } from 'lodash'

export default function useAuth() {
    const [appRootState, setAppRootState] = useRecoilState(AtomRootState)

    const handleLoginCheck = (): boolean => {
        return (
            appRootState.login &&
            !isEmpty(getAccessToken()) &&
            checkRemainingTime()
        )
    }

    // 로그인 시도.
    const handleAttemptLogin = async ({
        usid,
        pass,
        rememberme,
    }: {
        usid: string
        pass: string
        rememberme: boolean
    }): Promise<{ status: boolean; error: boolean; errorMessage: string }> => {
        const response = await login({
            usid: usid,
            pass: pass,
            CLIENT_IP: appRootState.Geolocation.IPv4,
        })

        if (response.status) {
            const LoginExpireInTime = add60Minutes(
                Number(process.env.REACT_APP_LOGIN_EXPIRE_IN)
            )

            saveLoginToken({
                TOKEN_INFO: response.payload.TOKEN_INFO,
                VTOKEN_INFO: response.payload.VTOKEN_INFO,
                TOKEN_LIMIT_TIME: response.payload.TOKEN_LIMIT_TIME,
                AUTHORIZE_CODE: null,
            })

            setAppRootState(prevState => ({
                ...prevState,
                logininfo: {
                    TOKEN_INFO: response.payload.TOKEN_INFO,
                    VTOKEN_INFO: response.payload.VTOKEN_INFO,
                    TOKEN_LIMIT_TIME: response.payload.TOKEN_LIMIT_TIME,
                    AUTHORIZE_CODE: null,
                },
                login: true,
                userinfo: {
                    USID: response.payload.CHARGER_LOGIN_INFO.USID,
                    NM: response.payload.CHARGER_LOGIN_INFO.NM,
                    MBER_NO: response.payload.CHARGER_LOGIN_INFO.MBER_NO,
                    AUTH_CODE: response.payload.CHARGER_LOGIN_INFO.AUTH_CODE,
                    INST_NM: response.payload.CHARGER_LOGIN_INFO.INST_NM,
                },
            }))

            // 아이디 저장.
            if (rememberme) {
                storageMaster.set('USID', usid)
            }

            // 로그인 만료 시간 저장.
            storageMaster.set('LOGIN_EXPIREIN', LoginExpireInTime)

            return {
                status: true,
                error: false,
                errorMessage: '',
            }
        } else {
            // 로그인 싪패
            return {
                status: false,
                error: true,
                errorMessage: '없는 아이디 입니다. 다시 한번 확인해 주세요!',
            }
        }
    }

    // 로그아웃 처리.
    const handleAttemptLogout = async (): Promise<{ status: boolean }> => {
        //
        await removeLoginToken()
        await removeLoginExpirein()
        return {
            status: true,
        }
    }

    return {
        handleAttemptLogin,
        handleAttemptLogout,
        handleLoginCheck,
    }
}
