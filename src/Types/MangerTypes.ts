import { DefaultYesNo, StplatKndCodeType, StplatSeCodeType } from '@CommonTypes'

//이용 약관 리스트
export interface StplatListItemInterface {
    STPLAT_SE_CODE: string
    STPLAT_SE_CODE_NM: string
    STPLAT_KND_CODE: string
    STPLAT_KND_CODE_NM: string
    STPLAT_SN: string
    STPLAT_CHANGE_DE: string
    STPLAT_CHANGE_RESN: string
}

export interface StplatListInterface {
    STPLAT_MANAGE_INFO_LIST: StplatListItemInterface[]
    TOTAL_COUNT: number
}

// 이용약관 상세

export interface StplatInfoHistListItemInterface {
    STPLAT_KND_CODE: StplatKndCodeType
    STPLAT_CHANGE_DE: string
    STPLAT_SN: number
    STPLAT_CHANGE_RESN: string
    STPLAT_SE_CODE: StplatSeCodeType
}

export interface StplatInfoInterface {
    STPLAT_MANAGE_HIST_LIST: StplatInfoHistListItemInterface[]
    STPLAT_MANAGE_INFO: {
        STPLAT_KND_CODE: StplatKndCodeType
        STPLAT_SE_CODE_NM: string
        USE_AT: DefaultYesNo
        REGIST_ID: string
        STPLAT_CHANGE_DE: string
        STPLAT_SN: number | null
        STPLAT_CHANGE_RESN: string
        REGIST_DT: string
        STPLAT_SE_CODE: StplatSeCodeType
        STPLAT_KND_CODE_NM: string
        STPLAT_DC: string
    }
}

//게시판 리스트 데이터
export interface NoticeListItemInterface {
    NM: null | string
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGIST_DT: null | string
    REGIST_ID: null | string
    TRGET_SVC_CODE: null | string
    TRGET_SVC_CODE_NM: null | string
}

//게시판 조회 리스트 데이터
export interface NoticeListInterface {
    NOTICE_LIST: NoticeListItemInterface[]
    TOTAL_COUNT: number
}

//게시판 상세 데이터
export interface NoticeItemInterface {
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGIST_DT: null | string
    REGIST_ID: null | string
    NOTI_DT: null | string
    NOTICE_CN: null | string
    PUSH_AT: null | string
    TRGET_SVC_CODE: null | string
    TRGET_SVC_CODE_NM: null | string
    USE_AT: null | string
}

// 팝업 관리 리스트 아이템 인터페이스
export interface PopupManageListItemInterface {
    PK: string
    POPUP_SJ: string
    POPUP_CN: string
    GLAN_TY: string
    GLAN_VALUE: string
    POPUP_BGNDT: string
    POPUP_ENDDT: string
    EXPSR_AT: string
    USE_AT: string
    CLOSE_TYPE: string
    SMALL_IMG_ATCHMNFL_NO: string
    BIG_IMG_ATCHMNFL_NO: string
    REGIST_DT: string
    REGIST_MBER_NO: number
}

// 팝업 관리 리스트 인터페이스
export interface PopupManageListInterface {
    POPUP_INFO: PopupManageListItemInterface[]
}

// 팝업 관리 상세 인터페이스
export interface PopupManageDetailInterface {
    PK: string
    POPUP_SJ: string
    POPUP_CN: string
    GLAN_TY: string
    GLAN_VALUE: string
    POPUP_BGNDT: string
    POPUP_ENDDT: string
    EXPSR_AT: string
    USE_AT: string
    CLOSE_TYPE: string
    SMALL_IMG_ATCHMNFL_NO: string
    BIG_IMG_ATCHMNFL_NO: string
    REGIST_DT: string
    REGIST_MBER_NO: number | null
}

export interface PopupLlinkListItemInterface {
    GROUP_CODE: string
    IEM_CODE: string
    IEM_NM: string
    USE_AT: string
}

// 앱 내 바로가기 링크 리스트 인터페이스
export interface PopupLlinkListInterface {
    POPUP_CODE_LIST: PopupLlinkListItemInterface[]
}
