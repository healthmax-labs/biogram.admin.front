import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { StplatListInterface } from '@Type/MangerTypes'
import { NoticeListInterface } from '@Type/NoticeTypes'

/**
 * manager 페이지.
 */

//이용 약관 현황
interface StplatSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number | null
    }
    memberList: StplatListInterface
}

export const StplatListState = atom<StplatSearchListInterface>({
    key: `managerPage/stplatList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
        },
        memberList: {
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
    key: `statusPage/NoticeList`,
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
