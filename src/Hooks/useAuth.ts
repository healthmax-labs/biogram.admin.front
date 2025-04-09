import { getAuthorMenu, login, logininfo } from '@Service/AuthService'
import { postTokenValidate } from '@Service/EtcService'
import { useRecoilState } from 'recoil'
import { AtomRootState } from '@Recoil/AppRootState'
import {
    add60Minutes,
    checkRemainingTime,
    getAccessToken,
    storageShowMenuInfo,
    getVtokenInfoToken,
    removeLoginExpirein,
    removeLoginToken,
    saveLoginToken,
    saveRefreshToken,
    storageMaster,
} from '@Helper'
import _ from 'lodash'
import { LoginInfoInterface } from '@CommonTypes'
import { useCallback } from 'react'
import Routers from '@Routers'
import Const from '@Const'

export default function useAuth() {
    const [appRootState, setAppRootState] = useRecoilState(AtomRootState)
    const handleLoginCheck = (): boolean => {
        return (
            appRootState.login &&
            !_.isEmpty(getAccessToken()) &&
            checkRemainingTime()
        )
    }

    // 로그인 정보 ( 토큰 사용자 정보 )
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
            usid,
        }: {
            authCode: string
            menuCode: string
            usid: string
        }) => {
            const menuShowInfo = storageShowMenuInfo.getMy({ usid: usid })

            const response = await getAuthorMenu({
                authCode: authCode,
                menuCode: menuCode,
            })

            console.log('getAuthorMenu response : ', response)

            const { AUTHOR_MENU_INFO_LIST, CHARGER_MENU_INFO } =
                response.payload

            setAppRootState(prevState => ({
                ...prevState,

                menuInfo: {
                    CHARGER_MENU_INFO: CHARGER_MENU_INFO,
                    AUTHOR_MENU_INFO_LIST: AUTHOR_MENU_INFO_LIST.map(el => {
                        const mainMenu = _.find(Routers.Main, {
                            menuCode: el.MENU_CODE,
                        })

                        return {
                            ...el,
                            reloadButton: false,
                            pathName: mainMenu ? mainMenu.pathName : '',
                            MENU_ORDR_GUBUN: Number(el.MENU_CODE.charAt(0)),
                        }
                    }),
                },
            }))

            console.log('appRootState : ', appRootState)

            if (menuShowInfo.length === 0) {
                storageShowMenuInfo.setMy({
                    usid: usid,
                    info: AUTHOR_MENU_INFO_LIST.filter(
                        e => e.SORT_ORDR === 1
                    ).map(el => {
                        return {
                            code: el.MENU_CODE,
                            show: true,
                        }
                    }),
                })
            }
        },
        [setAppRootState, appRootState]
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
            CLIENT_IP: appRootState.Geolocation.ip,
        })

        if (response.status) {
            const LoginExpireInTime = add60Minutes(
                Number(process.env.REACT_APP_LOGIN_EXPIRE_IN)
            )

            const {
                TOKEN_INFO,
                VTOKEN_INFO,
                TOKEN_LIMIT_TIME,
                CHARGER_LOGIN_INFO: {
                    USID,
                    NM,
                    MBER_NO,
                    AUTH_CODE,
                    INST_NM,
                    INST_NO,
                    NOT_FREE_YN,
                    END_DE,
                },
            } = response.payload

            saveLoginToken({
                TOKEN_INFO: !_.isEmpty(TOKEN_INFO) ? TOKEN_INFO : null,
                VTOKEN_INFO: !_.isEmpty(VTOKEN_INFO) ? VTOKEN_INFO : null,
                TOKEN_LIMIT_TIME: !_.isEmpty(TOKEN_LIMIT_TIME)
                    ? TOKEN_LIMIT_TIME
                    : 0,
                AUTHORIZE_CODE: null,
            })

            // 메뉴 불러오기.
            await handleGetAuthorMenu({
                authCode: AUTH_CODE,
                menuCode: process.env.REACT_APP_MENU_CODE
                    ? process.env.REACT_APP_MENU_CODE
                    : '',
                usid: USID,
            })

            setAppRootState(prevState => ({
                ...prevState,
                attemptLogout: false,
                logininfo: {
                    TOKEN_INFO: !_.isEmpty(TOKEN_INFO) ? TOKEN_INFO : null,
                    VTOKEN_INFO: !_.isEmpty(VTOKEN_INFO) ? VTOKEN_INFO : null,
                    TOKEN_LIMIT_TIME: !_.isEmpty(TOKEN_LIMIT_TIME)
                        ? TOKEN_LIMIT_TIME
                        : 0,
                    AUTHORIZE_CODE: null,
                },
                login: true,
                popup: {
                    //common: true,
                    common: false,
                },
                userinfo: {
                    USID: !_.isEmpty(USID) ? USID : null,
                    NM: !_.isEmpty(NM) ? NM : null,
                    MBER_NO: !_.isNull(MBER_NO) ? MBER_NO : null,
                    AUTH_CODE: !_.isEmpty(AUTH_CODE) ? AUTH_CODE : null,
                    INST_NM: !_.isEmpty(INST_NM) ? INST_NM : null,
                    INST_NO: !_.isEmpty(INST_NO) ? INST_NO : Const.MasterInstNo,
                    NOT_FREE_YN: NOT_FREE_YN,
                    END_DE: END_DE,
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
    const handleAttemptLogout = async ({
        attemptLogout,
    }: {
        attemptLogout: boolean
    }): Promise<{ status: boolean }> => {
        removeLoginToken()
        removeLoginExpirein()

        setAppRootState(prevState => ({
            ...prevState,
            login: false,
            attemptLogout: attemptLogout,
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
                INST_NO: null,
                NOT_FREE_YN: `N`,
                END_DE: null,
            },
        }))

        return {
            status: true,
        }
    }

    // 로그인 연장 토큰 리프래쉬?
    const handleTokenValidate = async (): Promise<{ status: boolean }> => {
        // Vtoken 체크
        const vtoken = getVtokenInfoToken()

        if (_.isEmpty(vtoken)) {
            return {
                status: false,
            }
        }

        const { status, payload } = await postTokenValidate()
        if (status) {
            const { TOKEN_LIMIT_TIME, AUTHORIZE_CODE, TOKEN_INFO } = payload

            saveRefreshToken({
                TOKEN_INFO: TOKEN_INFO,
                TOKEN_LIMIT_TIME: TOKEN_LIMIT_TIME,
                AUTHORIZE_CODE: AUTHORIZE_CODE,
            })

            storageMaster.set(
                'LOGIN_EXPIREIN',
                add60Minutes(Number(process.env.REACT_APP_LOGIN_EXPIRE_IN))
            )

            return {
                status: true,
            }
        } else {
            return {
                status: false,
            }
        }
    }

    return {
        handleAttemptLogin,
        handleAttemptLogout,
        handleLoginCheck,
        handleGetLoginInfo,
        handleGetAuthorMenu,
        handleTokenValidate,
    }
}
