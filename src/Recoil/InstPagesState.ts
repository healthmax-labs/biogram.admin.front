import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { InstJoinListInterface } from '@Type/InstTypes'

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
