import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { NoticeListItemInterface } from '@Type/NoticeTypes'

// 게시판 리스트 조회
interface NoticeSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        search_Key: string | null
    }
    noticeList: {
        NOTICE_LIST: NoticeListItemInterface[]
    }
}

export const NoticeListState = atom<NoticeSearchListInterface>({
    key: `managerPage/notice-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            search_Key: null,
        },
        noticeList: {
            NOTICE_LIST: [],
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
