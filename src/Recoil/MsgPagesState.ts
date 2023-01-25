import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { MsgSendListInterface } from '@Type/MsgTypes'
import { getNowDate, getOneMonthAgo, getSearchDateObject } from '@Helper'

const searchDateObject = getSearchDateObject()

/*
 * Msg 페이지.
 */

//메세지 발송 현황
interface MsgSendSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        FROM_MONTH: string
        FROM_DAY: string
        TO_DAY: string
        SNDNG_FAILR: 'F' | null
        SNDNG_STDR: string | null
    }
    list: MsgSendListInterface
}

export const MsgSendListState = atom<MsgSendSearchListInterface>({
    key: `statusPage/msg-send-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            SNDNG_FAILR: null,
            SNDNG_STDR: null,
            FROM_MONTH: `${searchDateObject.start.year}${searchDateObject.start.month}`,
            FROM_DAY: `01`,
            TO_DAY: `19`,
        },
        list: {
            SMS_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

//메세지 예약 현황
interface MsgBookListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        FROM_DAY: string | null
        TO_DAY: string | null
        SNDNG_STDR: string | null
    }
    list: MsgSendListInterface
}

export const MsgBookListState = atom<MsgBookListInterface>({
    key: `statusPage/msg-book-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            FROM_DAY: getOneMonthAgo(),
            TO_DAY: getNowDate(),
            SNDNG_STDR: ``,
        },
        list: {
            SMS_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
