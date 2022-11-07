import { getAuthorMenu, login, logininfo } from '@Service/AuthService'
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
import { LoginInfoInterface } from '@CommonTypes'
import { useCallback } from 'react'
import Const from '@Const'

export default function useAuth() {
    const [appRootState, setAppRootState] = useRecoilState(AtomRootState)

    const handleLoginCheck = (): boolean => {
        return (
            appRootState.login &&
            !isEmpty(getAccessToken()) &&
            checkRemainingTime()
        )
    }

    const handleGetLoginInfo = useCallback(async (): Promise<
        LoginInfoInterface | false
    > => {
        const { status, payload } = await logininfo()
        if (status) {
            return payload.CHARGER_INFO
        } else {
            return false
        }
    }, [])

    // 로그인 메뉴 불러오기.
    const handleGetAuthorMenu = useCallback(
        async ({
            authCode,
            menuCode,
        }: {
            authCode: string
            menuCode: string
        }) => {
            const response = await getAuthorMenu({
                authCode: authCode,
                menuCode: menuCode,
            })

            const { AUTHOR_MENU_INFO_LIST, CHARGER_MENU_INFO } =
                response.payload

            setAppRootState(prevState => ({
                ...prevState,

                menuInfo: {
                    CHARGER_MENU_INFO: CHARGER_MENU_INFO,
                    AUTHOR_MENU_INFO_LIST: AUTHOR_MENU_INFO_LIST.map(el => {
                        const ckIndex = Const.Routers.findIndex(
                            rt => rt.menuCode === el.MENU_CODE
                        )

                        return {
                            ...el,
                            pathName:
                                ckIndex > -1
                                    ? Const.Routers[ckIndex].pathName
                                    : '',
                            MENU_ORDR_GUBUN: Number(el.MENU_CODE.charAt(0)),
                        }
                    }),
                },
            }))
        },
        [setAppRootState]
    )

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

            const {
                TOKEN_INFO,
                VTOKEN_INFO,
                TOKEN_LIMIT_TIME,
                CHARGER_LOGIN_INFO: { USID, NM, MBER_NO, AUTH_CODE, INST_NM },
            } = response.payload

            // TODO : 메뉴 불러오기.

            saveLoginToken({
                TOKEN_INFO: !isEmpty(TOKEN_INFO) ? TOKEN_INFO : null,
                VTOKEN_INFO: !isEmpty(VTOKEN_INFO) ? VTOKEN_INFO : null,
                TOKEN_LIMIT_TIME: !isEmpty(TOKEN_LIMIT_TIME)
                    ? TOKEN_LIMIT_TIME
                    : 0,
                AUTHORIZE_CODE: null,
            })

            await handleGetAuthorMenu({
                authCode: AUTH_CODE,
                menuCode: process.env.REACT_APP_MENU_CODE
                    ? process.env.REACT_APP_MENU_CODE
                    : '',
            })

            setAppRootState(prevState => ({
                ...prevState,
                logininfo: {
                    TOKEN_INFO: !isEmpty(TOKEN_INFO) ? TOKEN_INFO : null,
                    VTOKEN_INFO: !isEmpty(VTOKEN_INFO) ? VTOKEN_INFO : null,
                    TOKEN_LIMIT_TIME: !isEmpty(TOKEN_LIMIT_TIME)
                        ? TOKEN_LIMIT_TIME
                        : 0,
                    AUTHORIZE_CODE: null,
                },
                login: true,
                userinfo: {
                    USID: !isEmpty(USID) ? USID : null,
                    NM: !isEmpty(NM) ? NM : null,
                    MBER_NO: !isEmpty(MBER_NO) ? MBER_NO : null,
                    AUTH_CODE: !isEmpty(AUTH_CODE) ? AUTH_CODE : null,
                    INST_NM: !isEmpty(INST_NM) ? INST_NM : null,
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
        await removeLoginToken()
        await removeLoginExpirein()

        setAppRootState(prevState => ({
            ...prevState,
            login: false,
            logininfo: {
                TOKEN_INFO: null,
                VTOKEN_INFO: null,
                TOKEN_LIMIT_TIME: 0,
                AUTHORIZE_CODE: null,
            },
            userinfo: {
                USID: null,
                NM: null,
                MBER_NO: null,
                AUTH_CODE: null,
                INST_NM: null,
            },
        }))

        return {
            status: true,
        }
    }

    return {
        handleAttemptLogin,
        handleAttemptLogout,
        handleLoginCheck,
        handleGetLoginInfo,
        handleGetAuthorMenu,
    }
}
