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
    DISPLAY_CODE: string
    DISPLAY_CODE_NM: string
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
    CLICK_CNT: number
    DISPLAY_CNT: number
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
    DISPLAY_CODE: string
    GLAN_TY: string
    GLAN_VALUE: string
    POPUP_BGNDT: string
    POPUP_ENDDT: string
    EXPSR_AT: string
    USE_AT: string
    CLOSE_TYPE: string
    REGIST_DT: string
    REGIST_MBER_NO: number | null
    SMALL_IMG_ATCHMNFL_INFO: {
        ATCHMNFL_NO: string
        ATCHMNFL_NM: string
        ATCHMNFL_PATH: string
        ORIGINL_FILE_NM: string
        ATCHMNFL_DOWN_PATH: string
    }
    BIG_IMG_ATCHMNFL_INFO: {
        ATCHMNFL_NO: string
        ATCHMNFL_NM: string
        ATCHMNFL_PATH: string
        ORIGINL_FILE_NM: string
        ATCHMNFL_DOWN_PATH: string
    }
    UPDATE_DT: string | null
}

export interface PopupLinkListItemInterface {
    GROUP_CODE: string
    IEM_CODE: string
    IEM_NM: string
    USE_AT: string
}

// 앱 내 바로가기 링크 리스트 인터페이스
export interface PopupLinkListInterface {
    POPUP_CODE_LIST: PopupLinkListItemInterface[]
}

export interface ViewPageListItemInterface {
    GROUP_CODE: string
    IEM_CODE: string
    IEM_NM: string
    USE_AT: string
}

export interface ViewPageListInterface {
    POPUP_VIEW_PAGE_LIST: ViewPageListItemInterface[]
}

export interface PopupCountListItem {
    MBER_NO: string
    NM: string
    REGIST_DT: string
}

// 팝업 노출수 현황
export interface PopupViewMberListInterface {
    DISPLAY_MEMBER_LIST: PopupCountListItem[]
}

//팝업 클릭수 현황
export interface PopupClickMberListInterface {
    CLICK_MEMBER_LIST: PopupCountListItem[]
}

// 리워드 리스트 아이템
export interface BudgetListItemInterface {
    INST_NO: number
    BUDGET_ENDDE: string
    INST_NM: string
    BUDGET_BGNDE: string
    BUDGET_SN: number
    MAX_CASH: number
    BUDGET_ASIGN_AMOUNT: number
    BUTTON: string // 임시 버튼
}

// 리워드 리스트
export interface BudgetListInterface {
    BUDGET_ASIGN_INFO_LIST: Array<BudgetListItemInterface>
}

export interface BudgetgetDalyHistoryInteInterface {
    INST_NO: number
    BUDGET_AMOUNT: number
    BUDGET_USE_DE: string
    BUDGET_BLCE: number
}

export interface BudgetDalyHistoryListInterface {
    DALY_BUDGET_ASIGN_INFO_LIST: Array<BudgetgetDalyHistoryInteInterface>
}

export interface BudgetDetailInterface {
    INST_NO: string
    INST_NM: string
    BUDGET_ASIGN_AMOUNT: string
    BUDGET_BGNDE: string
    BUDGET_ENDDE: string
    MAX_CASH: string
}
