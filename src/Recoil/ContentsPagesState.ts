import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    MagazineListItemInterface,
    UhealthZoneChargerInfoInterface,
    UhealthzoneInfoInterface,
    UhealthZoneListItemInterface,
} from '@Type/ContentsTypes'
import { gmtTimeToTimeObject, getNowDate } from '@Helper'

const timeObject = gmtTimeToTimeObject(new Date())

// 매거진 리스트 조회
interface MagazineSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number
        SEARCH_KEY: string
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

// 바이오그램 존 리스트 조회
interface UhealthzoneSearchListInterface {
    status: DefaultStatus
    search: {
        CUR_PAGE: number
        search_Key: string
    }
    uhealthzoneList: {
        UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
    }
}

// 매거진 상세
export interface MagazineDetailStateInterface {
    status: DefaultStatus
    info: {
        ATCHMNFL_NM: string
        ATCHMNFL_NO: number | null
        ATCHMNFL_PATH: string
        BEGIN_DT: string
        CN_ATCHMNFL_NM: string
        CN_ATCHMNFL_NO: number | null
        CN_ATCHMNFL_PATH: string
        END_DT: string
        MISN_CD: string
        MISN_COMPT_REWARD_POINT: number | null
        MISN_DC: string
        MISN_STEP: number | null
        MISN_SUBNAME1: {
            first: string
            second: string
        }
        MISN_SUBNAME2: {
            first: string
            second: string
        }
        USE_AT: string | 'Y' | 'N'
    }
}

export const MagazineListState = atom<MagazineSearchListInterface>({
    key: `contentsPage/magazine-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
            SEARCH_KEY: '',
        },
        magazineList: {
            MISN_MAGAZINE_LIST: [],
        },
    },
})

export const MagazineDetailState = atom<MagazineDetailStateInterface>({
    key: `contentsPage/magazine-detail`,
    default: {
        status: 'idle',
        info: {
            ATCHMNFL_NM: '',
            ATCHMNFL_NO: null,
            ATCHMNFL_PATH: '',
            BEGIN_DT: getNowDate(),
            CN_ATCHMNFL_NM: '',
            CN_ATCHMNFL_NO: null,
            CN_ATCHMNFL_PATH: '',
            END_DT: getNowDate(),
            MISN_CD: '',
            MISN_COMPT_REWARD_POINT: null,
            MISN_DC: '',
            MISN_STEP: null,
            MISN_SUBNAME1: {
                first: '',
                second: '',
            },
            MISN_SUBNAME2: {
                first: '',
                second: '',
            },
            USE_AT: 'Y',
        },
    },
})

export const UhealthzoneListState = atom<UhealthzoneSearchListInterface>({
    key: `contentsPage/uhealthzone-list`,
    default: {
        status: 'idle',
        search: {
            CUR_PAGE: 0,
            search_Key: '',
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
                    WIK_CODE: '15',
                },
                {
                    TIME_KND_CODE: 'BMTM',
                    WIK_SE_CODE: 'BD',
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
            JOIN_AT: 'C',
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
            JOIN_AT: 'C',
            LOGO_ATCHMNFL_NO: 0,
            BCRN_ATCHMNFL_NO: 0,
            MHRLS_INFO: [],
            VEIN_RCIVR: [],
        },
        getInfo: null,
    },
})
