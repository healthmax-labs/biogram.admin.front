import { atom } from 'recoil'
import {
    DefaultStatus,
    DefaultYesNo,
    StplatKndCodeType,
    StplatSeCodeType,
} from '@CommonTypes'
import {
    StplatInfoHistListItemInterface,
    StplatInfoInterface,
    StplatListInterface,
} from '@Type/MangerTypes'

/**
 * manager 페이지.
 */

//이용 약관 현황
interface StplatSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number | null
    }
    list: StplatListInterface
}

interface StplatDetailInterface {
    status: DefaultStatus
    sub: {
        CUR_PAGE: number | null
    }
    detail: {
        STPLAT_KND_CODE: StplatKndCodeType | null
        STPLAT_SE_CODE_NM: string | null
        USE_AT: DefaultYesNo | null
        REGIST_ID: string | null
        STPLAT_CHANGE_DE: string | null
        STPLAT_SN: number | null
        STPLAT_CHANGE_RESN: string | null
        REGIST_DT: string | null
        STPLAT_SE_CODE: StplatSeCodeType | null
        STPLAT_KND_CODE_NM: string | null
        STPLAT_DC: string | null
        history: StplatInfoHistListItemInterface[] | null
    }
    origin: {
        STPLAT_KND_CODE: StplatKndCodeType | null
        STPLAT_SE_CODE_NM: string | null
        USE_AT: DefaultYesNo | null
        REGIST_ID: string | null
        STPLAT_CHANGE_DE: string | null
        STPLAT_SN: number | null
        STPLAT_CHANGE_RESN: string | null
        REGIST_DT: string | null
        STPLAT_SE_CODE: StplatSeCodeType | null
        STPLAT_KND_CODE_NM: string | null
        STPLAT_DC: string | null
        history: StplatInfoHistListItemInterface[] | null
    }
    info: StplatInfoInterface | null
}

export const StplatListState = atom<StplatSearchListInterface>({
    key: `managerPage/stplatList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
        },
        list: {
            STPLAT_MANAGE_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const StplatDetailState = atom<StplatDetailInterface>({
    key: `managerPage/stplatDetail`,
    default: {
        status: 'idle',
        sub: {
            CUR_PAGE: null,
        },
        detail: {
            STPLAT_KND_CODE: null,
            STPLAT_SE_CODE_NM: null,
            USE_AT: null,
            REGIST_ID: null,
            STPLAT_CHANGE_DE: null,
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: null,
            REGIST_DT: null,
            STPLAT_SE_CODE: null,
            STPLAT_KND_CODE_NM: null,
            STPLAT_DC: null,
            history: null,
        },
        origin: {
            STPLAT_KND_CODE: null,
            STPLAT_SE_CODE_NM: null,
            USE_AT: null,
            REGIST_ID: null,
            STPLAT_CHANGE_DE: null,
            STPLAT_SN: null,
            STPLAT_CHANGE_RESN: null,
            REGIST_DT: null,
            STPLAT_SE_CODE: null,
            STPLAT_KND_CODE_NM: null,
            STPLAT_DC: null,
            history: null,
        },
        info: null,
    },
})
