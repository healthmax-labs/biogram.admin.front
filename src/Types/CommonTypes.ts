export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure'
export type defaultYesNo = 'Y' | 'N'
export type InputWidthType =
    | 'w10'
    | 'w12'
    | 'w32'
    | 'w40'
    | 'w52'
    | 'w60'
    | 'w64'
    | 'w72'
    | 'w80'
    | 'w96'
    | 'w1012'
    | 'w212'
export type BgColorType = `mBlue` | `mBBlue` | `mDipBlue`

export type PaddingStyleType = 'pl0' | 'pl1'

// page tab
export interface TabInterface {
    active: boolean
    name: string
    pathname: string
    component: string
    routePath: string
}

// router match

export interface RouterMatchItemInterface {
    pathname: string
    pathnameBase: string
    route: { path: string }
}

// 서버 결과.
export interface ServicesDefaultResult<T> {
    status: boolean
    message: string
    payload: T
}

// 로그인 토큰정보
export interface LoginTokenInterface {
    TOKEN_INFO: string | null
    VTOKEN_INFO: string | null
    TOKEN_LIMIT_TIME: number | 0
    AUTHORIZE_CODE: string | null
}

export interface ConHistoryInterface {
    CONECT_MTH: string
    CONECT_DT: string
    UHEALTH_ZONE_NO: number
    NM: string
}

export interface InstdeptListInterface {
    BRTHDY: string
    CONFM_AT: string
    CONFM_DE: string
    DEPT_NM: null
    DEPT_NO: null
    INST_NM: string
    INST_NO: number
    MBER_NO: number
    MBTLNUM: string
    MEBER_NM: string
    NO: string
    SEXDSTN: string
    STAT: string
}

// ip 정보.
export interface GeolocationDbInterface {
    IPv4: string
    city: string
    country_code: string
    country_name: string
    latitude: number
    longitude: number
    postal: boolean
    state: string
}

// 로그인 사용자
export interface LoginInfoInterface {
    INST_NM: string
    AUTH_CODE: string
    CONECT_LMTT_AT: string
    IM_AUTH_CNT: number
    AUTH_INST_LIST: boolean
    MBER_NO: number
    SM_AUTH_CNT: number
    IM_INST_NO: string
    CONECT_IP: string
    TOP_INST_NO: string
    NCM: string
    MBTLNUM: string
    SM_INST_NO: string
    MIDDLE_INST_NO: string
    MS_AUTH_CNT: number
    USID: string
    NM: string
}

// 로그인 결과.
export interface LoginInterface {
    TOKEN_INFO: string | null
    TOKEN_LIMIT_TIME: number | 0
    VTOKEN_INFO: string | null
    CHARGER_LOGIN_INFO: LoginInfoInterface
    VTOKEN_LIMIT: number | null
}

// 메뉴아이템 인터페이스
export interface AuthorMenuItemInterface {
    SORT_ORDR: number
    MENU_COURS: string
    MENU_NM: string
    MENU_CODE: string
}

// 메뉴 리스트 호출 결과 .
export interface AuthorMenuInterface<T> {
    CHARGER_MENU_INFO: {
        AUTHOR_CODE: string | null
        MENU_COURS: string | null
        INST_NM: string | null
        MENU_NM: string | null
        MENU_CODE: string | null
        AUTHOR_NM: string | null
        NM: string | null
    }
    AUTHOR_MENU_INFO_LIST: T[]
}

// 메뉴 아이템
export interface MenuItemInterface {
    SORT_ORDR: number
    MENU_COURS: string
    MENU_NM: string
    MENU_CODE: string
    MENU_ORDR_GUBUN: number
    pathName: string
}

// 공통 스테이트 인터페이스.
export interface AppRootStateInterface {
    init: boolean
    uuid: string
    login: boolean
    Geolocation: GeolocationDbInterface
    ConHistory: ConHistoryInterface[]
    logininfo: LoginTokenInterface
    userinfo: {
        USID: string | null
        NM: string | null
        MBER_NO: number | null
        AUTH_CODE: string | null
        INST_NM: string | null
    }
    menuInfo: AuthorMenuInterface<MenuItemInterface>
}
