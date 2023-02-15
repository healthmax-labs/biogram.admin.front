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
    list: InstJoinListInterface
    manage: {
        checkRow: string[]
    }
}

interface InstListStateInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
    }
    list: InstListInterface
}

interface InstDetailStateInterface {
    status: DefaultStatus
    info: {
        INST_NO: number | null
        ATCHMNFL_NO: number | null
        BIZ_INFO: string
        INST_NM: string
        INST_TY_CODE: string | 'M' | 'O'
        REPRSNT_TELNO: string
        SIGUNGU_CD: string
        SPUSE_STPLAT_AT: string | 'Y' | 'N'
        INST_NM_CHECK: boolean
        TOP_INST_NO: string
        MIDDLE_INST_NO: string
        UPPER_INST_NO: string
        ATCHMNFL_PATH: string
        ORGINL_FILE_NM: string
    }
    infoStep: string | 'step1' | 'step2' | 'step3'
    modal: {
        confirm: boolean
        delete: boolean
    }
}

export const InstJoinListState = atom<InstJoinSearchListInterface>({
    key: `instPage/inst-join-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            INST_NO: null,
            SEARCH_KEY: null,
        },
        list: {
            PSTINST_REQUEST_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
        manage: {
            checkRow: [],
        },
    },
})

// 소속 현황 스테이트
export const InstListState = atom<InstListStateInterface>({
    key: `instPage/inst-list`,
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

export const InstDetailState = atom<InstDetailStateInterface>({
    key: `instPage/inst-detail`,
    default: {
        status: 'idle',
        info: {
            INST_NO: null,
            ATCHMNFL_NO: null,
            BIZ_INFO: '',
            INST_NM: '',
            INST_TY_CODE: 'O',
            REPRSNT_TELNO: '',
            SIGUNGU_CD: '',
            SPUSE_STPLAT_AT: 'N',
            TOP_INST_NO: '',
            MIDDLE_INST_NO: '',
            UPPER_INST_NO: '',
            ATCHMNFL_PATH: '',
            ORGINL_FILE_NM: '',
            INST_NM_CHECK: false,
        },
        infoStep: 'step1',
        modal: {
            confirm: false,
            delete: false,
        },
    },
})
