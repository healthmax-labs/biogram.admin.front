import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { NoticeListInterface } from '@Type/NoticeTypes'

/*
 * Notice 페이지.
 */

//게시판 테이블 데이터
interface NoticeSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number | null
        ITEM_COUNT: number | null
        TRGET_SVC_CODE: number | null
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
            TRGET_SVC_CODE: null,
            USE_AT: null,
        },
        contentsList: {
            NOTICE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
