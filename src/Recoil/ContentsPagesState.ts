import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    MagazineListItemInterface,
    UhealthZoneListItemInterface,
} from '@Type/ContentsTypes'

// 매거진 리스트 조회
interface MagazineSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        search_Key: string | null
    }
    magazineList: {
        MISN_MAGAZINE_LIST: MagazineListItemInterface[]
    }
}

export const MagazineListState = atom<MagazineSearchListInterface>({
    key: `contentsPage/magazineList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            search_Key: null,
        },
        magazineList: {
            MISN_MAGAZINE_LIST: [],
        },
    },
})

// 매거진 상세
export interface MagazineDetailStateInterface {
    status: DefaultStatus
    info: {
        MISN_CD: null | string
        MISN_DC: null | string
        MISN_STEP: null | number
        ATCHMNFL_NO: null | number
        ATCHMNFL_NM: null | string
        ATCHMNFL_PATH: number | string
        CN_ATCHMNFL_NO: null | number
        CN_ATCHMNFL_NM: null | string
        CN_ATCHMNFL_PATH: number | string
        MISN_COMPT_REWARD_POINT: null | number
        MULTI_FILE_SN: null | string
        MISN_SUBNAME1: string
        MISN_SUBNAME1_u: null | string
        MISN_SUBNAME1_d: null | string
        MISN_SUBNAME2: string
        MISN_SUBNAME2_u: null | string
        MISN_SUBNAME2_d: null | string
        MULTI_FILE_LIST: []
        BEGIN_DT: null | string
        END_DT: null | string
        USE_AT: null | string
    }
    modal: {
        confirm: boolean
        delete: boolean
    }
}

export const MagazineDetailState = atom<MagazineDetailStateInterface>({
    key: `contentsPage/magazineDetail`,
    default: {
        status: 'idle',
        info: {
            MISN_CD: '',
            MISN_COMPT_REWARD_POINT: 0,
            MISN_STEP: 0,
            ATCHMNFL_NO: 0,
            ATCHMNFL_NM: '',
            ATCHMNFL_PATH: '',
            CN_ATCHMNFL_NO: 0,
            CN_ATCHMNFL_NM: '',
            CN_ATCHMNFL_PATH: '',
            MISN_DC: '',
            MISN_SUBNAME1: '',
            MISN_SUBNAME1_u: '',
            MISN_SUBNAME1_d: '',
            MISN_SUBNAME2: '',
            MISN_SUBNAME2_u: '',
            MISN_SUBNAME2_d: '',
            MULTI_FILE_SN: null,
            MULTI_FILE_LIST: [],
            BEGIN_DT: '',
            END_DT: '',
            USE_AT: '',
        },
        modal: {
            confirm: false,
            delete: false,
        },
    },
})

// 바이오그램 존 리스트 조회
interface UhealthzoneSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        search_Key: string | null
    }
    uhealthzoneList: {
        UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
    }
}

export const UhealthzoneListState = atom<UhealthzoneSearchListInterface>({
    key: `contentsPage/uhealthzoneList`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            search_Key: null,
        },
        uhealthzoneList: {
            UHEALTH_ZONE_LIST: [],
        },
    },
})
