export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure'
export type DefaultYesNo = 'Y' | 'N'
export type InputWidthType =
    | 'w10'
    | 'w12'
    | 'w20'
    | 'w24'
    | 'w28'
    | 'w32'
    | 'w36'
    | 'w40'
    | 'w52'
    | 'w60'
    | 'w64'
    | 'w72'
    | 'w80'
    | 'w96'
    | 'w1012'
    | 'w212'

export type MaxWidthType =
    | 'sm'
    | 'lg'
    | 'md'
    | 'max'
    | 'xl'
    | 'xl2'
    | 'xl3'
    | 'xl4'
    | 'xl5'
    | 'xl6'
    | 'xl7'
    | 'full'

export type MaxHeightType =
    | 'sm'
    | 'lg'
    | 'md'
    | 'max'
    | 'xl'
    | 'xl2'
    | 'xl3'
    | 'xl4'
    | 'xl5'
    | 'xl6'
    | 'xl7'
    | 'full'

export type BgColorType = `mBlue` | `mBBlue` | `mDipBlue`
export type InputBgColorType = `white` | `gray1` | `gray2`

export type PaddingStyleType = 'pl0' | 'pl1'
export type ContentType = 'default' | 'search'

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

// 약관 인터페이스
export interface StplatInfoItem {
    STPLAT_KND_CODE: 'US' | 'IT' | 'ST' | 'II' | 'SI' | 'MP' | 'MI'
    STPLAT_KND_CODE_NM: string
    STPLAT_DC: string
}

// 내몸관리 지수 아이템
export interface MybodyManageScoreItemInterface {
    CALC_DT: string
    TOT_SCORE: number
    HDLC_SCORE: number
    MBER_NO: number
    BP_SCORE: number
    FBS_SCORE: number
    TG_SCORE: number
    WAIST_SCORE: number
}

// 내몸관리 지수
export interface MybodyManageScoreInterface {
    TOTAL_COUNT: number
    MYBODY_MANAGE_SCORE_LIST: MybodyManageScoreItemInterface[]
}

export interface MberCashInfoItemInterface {
    CHANGE_CASH: string
    CHANGE_TIME: string
    CHANGE_RESN: string
    CHANGE_DE: string
    CHANGE_SE_CODE: 'P' | 'M'
    MBER_NO: number
    CHANGE_SE_CODE_NM: string
}

// 회원 캐시 리스트
export interface MberCashInfoInterface {
    MBER_CASH_INFO: {
        ACCML_CASH: number
        TOT_CASH: number
        MBTLNUM: string
        USE_CASH: number
        MBER_NO: number
        EXTSH_CASH: 0
    }
    MBER_CASH_LIST: MberCashInfoItemInterface[]
}

// 소속 상위 리스트 아이템
export interface InstInstCodeItemInterface {
    INST_NO: number
    INST_NM: string
}

// 소속 상위 초크 리스트.
export interface InstTopInstCodeInterface {
    INST_CODE_LIST: InstInstCodeItemInterface[]
}

// 소속 하위 코드.
export interface InstLowInstCodeInterface {
    INST_CODE_LIST: InstInstCodeItemInterface[]
    INST_INFO: {
        INST_NO: number
        REPRSNT_TELNO: string
        SIGUNGU_CD: string
        MBER_CNT: number
    }
}

// 시군구 그룹 코드
export interface SiGunGroupItemInterface {
    IEM_CODE: string
    GROUP_CODE: string
    IEM_NM: string
}

export interface SiGunGroupInterface {
    IEM_CODE_LIST: SiGunGroupItemInterface[]
}

// 시군구 코드
export interface SiGunGuCodeItemInterface {
    IEM_CODE: string
    IEM_NM: string
    GROUP_CODE: string
}

export interface SiGunGuCodeInterface {
    IEM_CODE_LIST: SiGunGuCodeItemInterface[]
    RequestVO: null
}
