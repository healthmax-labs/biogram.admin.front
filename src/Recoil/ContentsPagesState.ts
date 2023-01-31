import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    MagazineListItemInterface,
    UhealthZoneChargerInfoInterface,
    UhealthzoneInfoInterface,
    UhealthZoneListItemInterface,
} from '@Type/ContentsTypes'
import { gmtTimeToTimeObject } from '@Helper'

const timeObject = gmtTimeToTimeObject(new Date())
// console.debug(timeObject)

// 매거진 리스트 조회
interface MagazineSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: string | null
        SEARCH_KEY: string | null
    }
    magazineList: {
        MISN_MAGAZINE_LIST: MagazineListItemInterface[]
    }
}

interface UhealthzoneDetailInterface {
    status: DefaultStatus
    sub: {
        instlPlaceCheck: boolean
        pstinst: {
            infoStep: string | 'step1' | 'step2' | 'step3'
            step1: string
            step2: string
            step3: string
        }
        image: {
            logo: {
                no: number | null
                path: string
                name: string
            }
            bcrn: {
                no: number | null
                path: string
                name: string
            }
        }
    }
    detail: UhealthzoneInfoInterface
    origin: UhealthzoneInfoInterface
    getInfo: UhealthZoneChargerInfoInterface | null
}

export const MagazineListState = atom<MagazineSearchListInterface>({
    key: `contentsPage/magazine-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: null,
            SEARCH_KEY: null,
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
    key: `contentsPage/magazine-detail`,
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
    key: `contentsPage/uhealthzone-list`,
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

export const UhealthzoneDetailState = atom<UhealthzoneDetailInterface>({
    key: `contentsPage/uhealthzone-detail`,
    default: {
        status: 'idle',
        sub: {
            instlPlaceCheck: false,
            pstinst: {
                infoStep: 'step1',
                step1: '',
                step2: '',
                step3: '',
            },
            image: {
                logo: {
                    no: null,
                    path: '',
                    name: '',
                },
                bcrn: {
                    no: null,
                    path: '',
                    name: '',
                },
            },
        },
        detail: {
            INSTL_PLACE: '',
            INST_NO: '',
            TELNO: '',
            INSTL_ADRES: '',
            LA: '',
            LO: '',
            MAP_ADRES: '',
            OPER_WIK_INFO: [
                {
                    TIME_KND_CODE: 'BSTM',
                    WIK_SE_CODE: 'BD',
                    WIK_CODE: '21',
                },
                {
                    TIME_KND_CODE: 'BMTM',
                    WIK_SE_CODE: 'RD',
                    WIK_CODE: '15',
                },
            ],
            OPER_TIME_INFO: [
                {
                    TIME_KND_CODE: 'BSTM',
                    TIME_SE_CODE: 'WD',
                    BEGIN_TIME: `${timeObject.hourPad}${timeObject.minutePad}`,
                    END_TIME: `${timeObject.hourPad}${timeObject.minutePad}`,
                },
                {
                    TIME_KND_CODE: 'BMTM',
                    TIME_SE_CODE: 'WD',
                    BEGIN_TIME: `${timeObject.hourPad}${timeObject.minutePad}`,
                    END_TIME: `${timeObject.hourPad}${timeObject.minutePad}`,
                },
            ],
            INSTL_TY_CD: 'P',
            LOGIN_AT: 'Y',
            EXTRL_PERSON_USE_AT: 'Y',
            OPEN_AT: 'Y',
            PRINT_AT: 'N',
            LOGO_ATCHMNFL_NO: 0,
            BCRN_ATCHMNFL_NO: 0,
            MHRLS_INFO: [],
            VEIN_RCIVR: [],
        },
        origin: {
            INSTL_PLACE: '',
            INST_NO: '',
            TELNO: '',
            INSTL_ADRES: '',
            LA: '',
            LO: '',
            MAP_ADRES: '',
            OPER_WIK_INFO: [],
            OPER_TIME_INFO: [],
            INSTL_TY_CD: '',
            LOGIN_AT: 'N',
            EXTRL_PERSON_USE_AT: 'N',
            OPEN_AT: 'N',
            PRINT_AT: 'N',
            LOGO_ATCHMNFL_NO: 0,
            BCRN_ATCHMNFL_NO: 0,
            MHRLS_INFO: [],
            VEIN_RCIVR: [],
        },
        getInfo: null,
    },
})
