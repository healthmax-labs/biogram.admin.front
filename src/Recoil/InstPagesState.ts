import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { InstJoinListInterface, InstListInterface } from '@Type/InstTypes'

/**
 * inst join 페이지.
 */

//소속 가입 현황
interface InstJoinSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        INST_NO: string | null
        SEARCH_KEY: string | null
    }
    memberList: InstJoinListInterface
}

interface InstListStateInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
    }
    list: InstListInterface
}

export const InstJoinListState = atom<InstJoinSearchListInterface>({
    key: `instPage/instJoinList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            INST_NO: null,
            SEARCH_KEY: null,
        },
        memberList: {
            PSTINST_REQUEST_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 소속 현환 스테이트
export const InstListState = atom<InstListStateInterface>({
    key: `instPage/instList`,
    default: {
        status: 'idle',
        search: {
            INST_NO: null,
        },
        list: {
            TOTAL_COUNT: 0,
            INST_INFO_LIST: [],
        },
    },
})
