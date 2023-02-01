import { atom } from 'recoil'
import {
    NoticeListInterface,
    StplatInfoHistListItemInterface,
    StplatInfoInterface,
    StplatListInterface,
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
        CUR_PAGE: number | null
    }
    list: StplatListInterface
}

interface StplatDetailInterface {
    status: DefaultStatus
    sub: {
        CUR_PAGE: number | null
    }
    detail: {
        STPLAT_KND_CODE: StplatKndCodeType | null
        STPLAT_SE_CODE_NM: string | null
        USE_AT: DefaultYesNo | null
        REGIST_ID: string | null
        STPLAT_CHANGE_DE: string | null
        STPLAT_SN: number | null
        STPLAT_CHANGE_RESN: string | null
        REGIST_DT: string | null
        STPLAT_SE_CODE: StplatSeCodeType | null
        STPLAT_KND_CODE_NM: string | null
        STPLAT_DC: string | null
        history: StplatInfoHistListItemInterface[] | null
    }
    origin: {
        STPLAT_KND_CODE: StplatKndCodeType | null
        STPLAT_SE_CODE_NM: string | null
        USE_AT: DefaultYesNo | null
        REGIST_ID: string | null
        STPLAT_CHANGE_DE: string | null
        STPLAT_SN: number | null
        STPLAT_CHANGE_RESN: string | null
        REGIST_DT: string | null
        STPLAT_SE_CODE: StplatSeCodeType | null
        STPLAT_KND_CODE_NM: string | null
        STPLAT_DC: string | null
        history: StplatInfoHistListItemInterface[] | null
    }
    info: StplatInfoInterface | null
}

export const StplatListState = atom<StplatSearchListInterface>({
    key: `managerPage/stplat-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
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
        CUR_PAGE: number | null
        ITEM_COUNT: number | null
        REGIST_DT: string | null
        TRGET_SVC_CODE: string | null
        TRGET_SVC_CODE_NM: string | null
        USE_AT: string | null
    }
    contentsList: NoticeListInterface
}

export const NoticeListState = atom<NoticeSearchListInterface>({
    key: `managerPage/notice-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            ITEM_COUNT: null,
            REGIST_DT: null,
            TRGET_SVC_CODE: null,
            TRGET_SVC_CODE_NM: null,
            USE_AT: null,
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
            STPLAT_KND_CODE: null,
            STPLAT_SE_CODE_NM: null,
            USE_AT: null,
            REGIST_ID: null,
            STPLAT_CHANGE_DE: null,
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: null,
            REGIST_DT: null,
            STPLAT_SE_CODE: null,
            STPLAT_KND_CODE_NM: null,
            STPLAT_DC: null,
            history: null,
        },
        origin: {
            STPLAT_KND_CODE: null,
            STPLAT_SE_CODE_NM: null,
            USE_AT: null,
            REGIST_ID: null,
            STPLAT_CHANGE_DE: null,
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: null,
            REGIST_DT: null,
            STPLAT_SE_CODE: null,
            STPLAT_KND_CODE_NM: null,
            STPLAT_DC: null,
            history: null,
        },
        info: null,
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
