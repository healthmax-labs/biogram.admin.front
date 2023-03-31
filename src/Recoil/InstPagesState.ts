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
        CUR_PAGE: number
        INST_NO: string
        SEARCH_KEY: string
    }
    list: InstJoinListInterface
    manage: {
        checkRow: string[]
    }
}

interface InstListStateInterface {
    status: DefaultStatus
    search: {
        instNo: string
        instNm: string
        searchName: string
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
        CHARGER_LIST: Array<{
            Already?: boolean
            AUTHOR_CODE: string
            AUTHOR_NM: string
            BRTHDY: string
            CNSLTNT_AT: 'N' | 'Y'
            CONECT_IP: string | null
            CONECT_LMTT_AT: 'N' | 'Y'
            INST_NM: string
            INST_NO: number
            MBER_NO: number
            MBTLNUM: string
            MBTLNUM_CRTFC_AT: 'Y' | 'N'
            NM: string
            REGIST_DT: number
            SEXDSTN: '남' | '여'
            USID: string
        }>
    }
    infoStep: string | 'step1' | 'step2' | 'step3'
}

export const InstJoinListState = atom<InstJoinSearchListInterface>({
    key: `instPage/inst-join-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
            INST_NO: '',
            SEARCH_KEY: '',
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
            instNo: '',
            instNm: '',
            searchName: '',
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
            CHARGER_LIST: [],
        },
        infoStep: 'step1',
    },
})
