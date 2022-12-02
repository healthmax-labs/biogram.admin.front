import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { StplatListInterface } from '@Type/MangerTypes'

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
