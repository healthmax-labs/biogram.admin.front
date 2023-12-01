import { atom } from 'recoil'
import {
    NoticeListInterface,
    StplatInfoHistListItemInterface,
    StplatInfoInterface,
    StplatListInterface,
    PopupManageListItemInterface,
    PopupManageDetailInterface,
    PopupLinkListItemInterface,
    ViewPageListItemInterface,
    PopupCountListItem,
} from '@Type/MangerTypes'
import {
    DefaultStatus,
    DefaultYesNo,
    StplatKndCodeType,
    StplatSeCodeType,
} from '@CommonTypes'

/**
 * manager 페이지.
 */

//이용 약관 현황
interface StplatSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number
    }
    list: StplatListInterface
}

interface StplatDetailInterface {
    status: DefaultStatus
    sub: {
        CUR_PAGE: number | null
    }
    detail: {
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
        history: StplatInfoHistListItemInterface[]
    }
    origin: {
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
        history: StplatInfoHistListItemInterface[]
    }
    info: StplatInfoInterface
}

export const StplatListState = atom<StplatSearchListInterface>({
    key: `managerPage/stplat-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
        },
        list: {
            STPLAT_MANAGE_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

/*
 * Notice 페이지.
 */

//게시판 테이블 데이터
interface NoticeSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number
        ITEM_COUNT: number
        REGIST_DT: string
        TRGET_SVC_CODE: string
        TRGET_SVC_CODE_NM: string
        USE_AT: string
    }
    contentsList: NoticeListInterface
}

export const NoticeListState = atom<NoticeSearchListInterface>({
    key: `managerPage/notice-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
            ITEM_COUNT: 30,
            REGIST_DT: '',
            TRGET_SVC_CODE: 'A',
            TRGET_SVC_CODE_NM: 'cpnoti',
            USE_AT: 'A',
        },
        contentsList: {
            NOTICE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const StplatDetailState = atom<StplatDetailInterface>({
    key: `managerPage/stplat-detail`,
    default: {
        status: 'idle',
        sub: {
            CUR_PAGE: null,
        },
        detail: {
            STPLAT_KND_CODE: 'II',
            STPLAT_SE_CODE_NM: '',
            USE_AT: 'Y',
            REGIST_ID: '',
            STPLAT_CHANGE_DE: '',
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: '',
            REGIST_DT: '',
            STPLAT_SE_CODE: 'HMAX',
            STPLAT_KND_CODE_NM: '',
            STPLAT_DC: '',
            history: [],
        },
        origin: {
            STPLAT_KND_CODE: 'II',
            STPLAT_SE_CODE_NM: '',
            USE_AT: 'Y',
            REGIST_ID: '',
            STPLAT_CHANGE_DE: '',
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: '',
            REGIST_DT: '',
            STPLAT_SE_CODE: 'HMAX',
            STPLAT_KND_CODE_NM: '',
            STPLAT_DC: '',
            history: [],
        },
        info: {
            STPLAT_MANAGE_HIST_LIST: [],
            STPLAT_MANAGE_INFO: {
                STPLAT_KND_CODE: 'II',
                STPLAT_SE_CODE_NM: '',
                USE_AT: 'Y',
                REGIST_ID: '',
                STPLAT_CHANGE_DE: '',
                STPLAT_SN: null,
                STPLAT_CHANGE_RESN: '',
                REGIST_DT: '',
                STPLAT_SE_CODE: 'HMAX',
                STPLAT_KND_CODE_NM: '',
                STPLAT_DC: '',
            },
        },
    },
})

//공지사항 상세
export interface NoticeDetailStateInterface {
    status: DefaultStatus
    info: {
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
    modal: {
        confirm: boolean
        delete: boolean
    }
}

export const NoticeDetailState = atom<NoticeDetailStateInterface>({
    key: `managerPage/notice-detail`,
    default: {
        status: 'idle',
        info: {
            NOTICE_NO: null,
            NOTICE_SJ: null,
            REGIST_DT: null,
            REGIST_ID: null,
            NOTI_DT: null,
            NOTICE_CN: null,
            PUSH_AT: null,
            TRGET_SVC_CODE: null,
            TRGET_SVC_CODE_NM: null,
            USE_AT: null,
        },
        modal: {
            confirm: false,
            delete: false,
        },
    },
})

interface PopupManageListStateInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number
    }
    list: {
        POPUP_INFO: PopupManageListItemInterface[]
    }
    countModal: {
        satus: DefaultStatus
        list: PopupCountListItem[]
    }
}

// 팝업 관리 리스트
export const PopupManageListState = atom<PopupManageListStateInterface>({
    key: `managerPage/popup-manage-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
        },
        list: {
            POPUP_INFO: [],
        },
        countModal: {
            satus: 'idle',
            list: [],
        },
    },
})

interface PopupManageDetailStateInterface {
    status: DefaultStatus
    info: PopupManageDetailInterface
    linkList: PopupLinkListItemInterface[]
    viewPageList: ViewPageListItemInterface[]
}

// 팝업 관리 상세
export const PopupManageDetailState = atom<PopupManageDetailStateInterface>({
    key: `managerPage/popup-manage-detail`,
    default: {
        status: 'idle',
        info: {
            PK: ``,
            POPUP_SJ: ``,
            POPUP_CN: ``,
            DISPLAY_CODE: ``,
            GLAN_TY: `A`,
            GLAN_VALUE: ``,
            POPUP_BGNDT: ``,
            POPUP_ENDDT: ``,
            EXPSR_AT: ``,
            USE_AT: `Y`,
            CLOSE_TYPE: `T`,
            REGIST_DT: ``,
            REGIST_MBER_NO: null,
            SMALL_IMG_ATCHMNFL_INFO: {
                ATCHMNFL_NO: ``,
                ATCHMNFL_NM: ``,
                ATCHMNFL_PATH: ``,
                ORIGINL_FILE_NM: ``,
                ATCHMNFL_DOWN_PATH: ``,
            },
            BIG_IMG_ATCHMNFL_INFO: {
                ATCHMNFL_NO: ``,
                ATCHMNFL_NM: ``,
                ATCHMNFL_PATH: ``,
                ORIGINL_FILE_NM: ``,
                ATCHMNFL_DOWN_PATH: ``,
            },
            UPDATE_DT: null,
        },
        linkList: [],
        viewPageList: [],
    },
})
