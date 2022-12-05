import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { MsgSendListInterface } from '@Type/MsgTypes'

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
        FROM_MONTH: string | null
        FROM_DAY: string | null
        TO_DAY: string | null
        SNDNG_FAILR: string | null
        SNDNG_STDR: string | null
    }
    memberList: MsgSendListInterface
}

export const MsgSendListState = atom<MsgSendSearchListInterface>({
    key: `statusPage/MsgSendList`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            FROM_MONTH: null,
            FROM_DAY: null,
            TO_DAY: null,
            SNDNG_FAILR: null,
            SNDNG_STDR: null,
        },
        memberList: {
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
    memberList: MsgSendListInterface
}

export const MsgBookListState = atom<MsgBookListInterface>({
    key: `statusPage/MsgBookList`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            FROM_DAY: null,
            TO_DAY: null,
            SNDNG_STDR: null,
        },
        memberList: {
            SMS_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
