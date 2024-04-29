import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    HelperNoticeListInterface,
    HelperNoticeDetailInterface,
    HelperQnaListInterface,
    HelperQnaDetailInterface,
    HelperDownloadListItemInterface,
    HelperDownloadDetailInterface,
} from '@Type/HelperTypes'

interface NoticeListStateInterface {
    status: DefaultStatus
    list: HelperNoticeListInterface
}

interface NoticeDetailStateInterface {
    status: DefaultStatus
    detail: HelperNoticeDetailInterface
}

interface QnaListStateInterface {
    status: DefaultStatus
    search: {
        TITLE: null | string
        COMPLETE_YN: string | `A` | `Y` | `N`
    }
    list: HelperQnaListInterface
}

interface QnaDetailStateInterface {
    status: DefaultStatus
    detail: HelperQnaDetailInterface
}

interface DownloadListStateInterface {
    status: DefaultStatus
    list: Array<HelperDownloadListItemInterface>
}

interface DownloadListDetailStateInterface {
    status: DefaultStatus
    detail: HelperDownloadDetailInterface
}

export const NoticeListState = atom<NoticeListStateInterface>({
    key: `helperPage/notice-list`,
    default: {
        status: `idle`,
        list: {
            POST_NOTICE_INFO: [],
        },
    },
})

export const NoticeDetailStateInitialize: HelperNoticeDetailInterface = {
    POST_ID: '',
    POST_TYPE: '',
    TITLE: '',
    CONTENT: '',
    VIEW_CNT: '',
    USE_YN: 'N',
    REGIST_DT: '',
    UPDT_DT: '',
    POPUP_YN: 'N',
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: '',
        ATCHMNFL_NM: '',
        ATCHMNFL_PATH: '',
        ORIGINL_FILE_NM: '',
        ATCHMNFL_DOWN_PATH: '',
    },
}

export const QnaDetailStateInitialize = {
    POST_ID: 0,
    INST_NM: ``,
    INST_NO: 0,
    TITLE: ``,
    CONTENT: ``,
    REGIST_DT: ``,
    COMPLETE_YN: 'N',
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: 0,
        ATCHMNFL_NM: ``,
        ATCHMNFL_PATH: ``,
        ORIGINL_FILE_NM: ``,
        ATCHMNFL_DOWN_PATH: ``,
    },
    COMMENTS: null,
    COMMENT: {
        COMMENT_ID: 0,
        POST_ID: 0,
        CONTENT: ``,
        ATCHMNFL_INFO: {
            ATCHMNFL_NO: null,
            ATCHMNFL_NM: null,
            ATCHMNFL_PATH: null,
            ORIGINL_FILE_NM: null,
            ATCHMNFL_DOWN_PATH: null,
        },
    },
}

export const DownloadDetailStateInitialize = {
    POST_ID: ``,
    POST_TYPE: ``,
    TITLE: ``,
    CONTENT: ``,
    REGIST_DT: ``,
    UPDT_DT: ``,
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: ``,
        ATCHMNFL_NM: ``,
        ATCHMNFL_PATH: ``,
        ORIGINL_FILE_NM: ``,
        ATCHMNFL_DOWN_PATH: ``,
    },
}

export const NoticeDetailState = atom<NoticeDetailStateInterface>({
    key: `helperPage/notice-detail`,
    default: {
        status: `idle`,
        detail: NoticeDetailStateInitialize,
    },
})

export const QnaListState = atom<QnaListStateInterface>({
    key: `helperPage/qna-list`,
    default: {
        status: `idle`,
        search: {
            TITLE: null,
            COMPLETE_YN: `A`,
        },
        list: {
            QUESTION_LIST: [],
        },
    },
})

export const QnaDetailState = atom<QnaDetailStateInterface>({
    key: `helperPage/qna-detail`,
    default: {
        status: `idle`,
        detail: QnaDetailStateInitialize,
    },
})

// 자료실 리스트
export const DownloadListState = atom<DownloadListStateInterface>({
    key: `helperPage/download-list`,
    default: {
        status: `idle`,
        list: [],
    },
})

export const DownloadlistDetailState = atom<DownloadListDetailStateInterface>({
    key: `helperPage/download-list-detail`,
    default: {
        status: `idle`,
        detail: DownloadDetailStateInitialize,
    },
})
