import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    HelperNoticeListInterface,
    HelperNoticeDetailInterface,
} from '@Type/HelperTypes'

interface NoticeListStateInterface {
    status: DefaultStatus
    list: HelperNoticeListInterface
}

interface NoticeDetailStateInterface {
    status: DefaultStatus
    detail: HelperNoticeDetailInterface
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

export const NoticeDetailStateinitialize: HelperNoticeDetailInterface = {
    POST_ID: '',
    POST_TYPE: '',
    TITLE: '',
    CONTENT: '',
    VIEW_CNT: '',
    USE_YN: 'N',
    REGIST_DT: '',
    UPDT_DT: '',
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: '',
        ATCHMNFL_NM: '',
        ATCHMNFL_PATH: '',
        ORIGINL_FILE_NM: '',
        ATCHMNFL_DOWN_PATH: '',
    },
}

export const NoticeDetailState = atom<NoticeDetailStateInterface>({
    key: `helperPage/notice-detail`,
    default: {
        status: `idle`,
        detail: NoticeDetailStateinitialize,
    },
})
