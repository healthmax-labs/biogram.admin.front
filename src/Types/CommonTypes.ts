export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure' | 'ready'
export type MainLayoutThemeType = string | '' | 'GeonDaon' // 테마 타입 테마 추가시 추가 팔요함
export type DefaultYesNo = 'Y' | 'N'
export type DefaultConditionsType =
    | `매우좋음`
    | `좋음`
    | `주의`
    | `나쁨`
    | `매우 나쁨`
    | `관리`
    | `보통`
    | `양호`
export type WidthType =
    | 'w0'
    | 'w1'
    | 'w2'
    | 'w3'
    | 'w4'
    | 'w5'
    | 'w6'
    | 'w7'
    | 'w8'
    | 'w9'
    | 'w10'
    | 'w12'
    | 'w16'
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
    | 'w036'
    | 'w1012'
    | 'w212'
    | 'full'
    | 'wMin'
    | 'wMax'

// css 타입
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

// css 타입
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

// 이용약관 se code
export type StplatSeCodeType =
    | 'HMAX'
    | 'SAMC'
    | 'MDAG'
    | 'MPAS'
    | 'PSIS'
    | 'SUBS'

// 이용약관 knd code
export type StplatKndCodeType = 'II' | 'MI' | 'MP' | 'SI' | 'US' | 'IT' | 'ST'

export type RecoilStateKeyNameType = 'memberPage/member-detail'

export type BgColorType = `blueberry` | `eggplant` | `steel`
export type InputBgColorType = `white` | `gray1` | `gray2`
export type TextColorType =
    | string
    | `gray`
    | `white`
    | `green`
    | `orange`
    | `blue`
    | `pink`
export type TextAlignType = `left` | `center` | `right`

export type PaddingStyleType = 'pl0' | 'pl1'
export type ContentType = 'default' | 'search'
export type DatePickerShowType = `default` | `time` | `year, month` | `date`

export type ButtonType = `button` | `info` | `manage` | `default`

// page tab
export interface TabItemInterface {
    active: boolean
    name: string
    pathname: string
    component: string
    routePath: string
    reloadButton: boolean
}

export interface TabInterface {
    list: TabItemInterface[]
    close: {
        closeIndex: null | number
        recoilKey: null | string
        recoilResetWhere: null | 'mainTab' | 'mainComponent' // recoil 리셋할 타이밍? MainTabComponent 에서 할지 각 페이지에서 할지 결정
    }
    reloadTask: {
        name: string
        action: boolean
    }
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
    ip: string
    country: string
    'geo-ip': string
    'API Help': string
}

// 로그인 사용자
export interface LoginInfoInterface {
    INST_NM: string
    INST_NO: string
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
}

// 공통 스테이트 인터페이스.
export interface AppRootStateInterface {
    init: boolean
    uuid: string
    login: boolean
    attemptLogout: boolean
    Geolocation: GeolocationDbInterface
    logininfo: LoginTokenInterface
    userinfo: {
        USID: string | null
        NM: string | null
        MBER_NO: number | null
        AUTH_CODE: string | null
        INST_NM: string | null
        INST_NO: string | null
    }
    menuInfo: AuthorMenuInterface<MenuItemInterface>
}

// 약관 코드
export type StplatInfoKndCode = 'US' | 'IT' | 'ST' | 'II' | 'SI' | 'MP' | 'MI'

// 약관 인터페이스
export interface StplatInfoItem {
    STPLAT_KND_CODE: StplatInfoKndCode
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

export interface SendSmsItemInterface {
    MBER_NO: string
    NM: string
    USID: string
    MBTLNUM: string
    MBTLNUM_CRTFC_AT: 'Y' | 'N'
    SV00_NTCN_AT: 'Y' | 'N' // 전송 동의한 회원 인지.
}

// 메시지 발송
export interface SendSmsInterface {
    SMS_SJ: string
    SMS_CN: string
    SNDNG_NO: string
    SNDNG_DT: string
    SEND_ALL_MBER: 'N' | 'Y'
    SEND_MBER_INFO_LIST: SendSmsItemInterface[]
}

// 다음 주소 검색
export interface DaumPostCodeInterface {
    address: string
    addressEnglish: string
    addressType: string
    apartment: string
    autoJibunAddress: string
    autoJibunAddressEnglish: string
    autoRoadAddress: string
    autoRoadAddressEnglish: string
    bcode: string
    bname: string
    bname1: string
    bname1English: string
    bname2: string
    bname2English: string
    bnameEnglish: string
    buildingCode: string
    buildingName: string
    hname: string
    jibunAddress: string
    jibunAddressEnglish: string
    noSelected: string
    postcode: string
    postcode1: string
    postcode2: string
    postcodeSeq: string
    query: string
    roadAddress: string
    roadAddressEnglish: string
    roadname: string
    roadnameCode: string
    roadnameEnglish: string
    sido: string
    sidoEnglish: string
    sigungu: string
    sigunguCode: string
    sigunguEnglish: string
    userLanguageType: string
    userSelectedType: string
    zonecode: string
}

// KaKao Address Info
export interface KaKaoAddressSearchItemInterface {
    address: {
        address_name: string
        b_code: string
        h_code: string
        main_address_no: string
        mountain_yn: string
        region_1depth_name: string
        region_2depth_name: string
        region_3depth_h_name: string
        region_3depth_name: string
        sub_address_no: string
        x: string
        y: string
    }
    address_name: string
    address_type: string
    road_address: {
        address_name: string
        building_name: string
        main_building_no: string
        region_1depth_name: string
        region_2depth_name: string
        region_3depth_name: string
        road_name: string
        sub_building_no: string
        underground_yn: string
        x: string
        y: string
        zone_no: string
    }
    x: string
    y: string
}

export interface KaKaoAddressSearchInterface {
    documents: KaKaoAddressSearchItemInterface[]
    meta: {
        is_end: boolean
        pageable_count: number
        total_count: number
    }
}

// 토큰 리프레시
export interface TokenValidateInterface {
    TOKEN_INFO: string
    TOKEN_LIMIT_TIME: number
    AUTHORIZE_CODE: string
}

// 회원 검색 인터페이스
export interface MemberSearchItemInterface {
    SMS_SNDNG_AT?: string | 'Y' | 'N' // 회원 검색 결과에선 내려오지만 sms, push 보낼떄는 payload 에 필요 없어서 ? 처리
    MBTLNUM: string
    MBER_NO: number
    SV00_NTCN_AT: string | 'Y' | 'N'
    USID: string
    MBTLNUM_CRTFC_AT: string | 'Y' | 'N'
    NM: string
}

// 엑셀 다운로드 프롭스 타입
export interface ExcelDownloadPropsInterface {
    FileName: string
    SheetName: string
    Header: Array<string[]>
    MergeCells?: string[]
    Data: Array<string[]>
    SpliceColumn?: boolean
    SpliceColumns?: Array<{ start: number; end: number }>
    SpliceMergeCells?: string[]
    DownloadEnd?: () => void
}

export interface CommonGetFileInfoInterface {
    ATCHMNFL_NO: number
    ATCHMNFL_PATH: string
    ATCHMNFL_DOWN_PATH: string
    ORGINL_FILE_NM: string
    ATCHMNFL_NM: string
}
