// 매거진 리스트 항목
export interface MagazineListItemInterface {
    MISN_STEP: null | number
    OPEN_STATUS: null | string
    MISN_SUBNAME1: number | string
    BEGIN_DE: null | string
    END_DE: null | string
    MISN_COMPT_REWARD_POINT: null | number
    REGIST_DT: null | string
}
// 매거진 리스트
export interface MagazineListInterface {
    MISN_MAGAZINE_LIST: MagazineListItemInterface[]
}

// 매거진 상세 항목
export interface MagazineItemInterface {
    MISN_CD: null | string
    MISN_COMPT_REWARD_POINT: null | number
    MISN_DC: null | string
    MISN_STEP: null | number
    ATCHMNFL_NO: null | number
    ATCHMNFL_NM: null | string
    ATCHMNFL_PATH: number | string
    CN_ATCHMNFL_NO: null | number
    CN_ATCHMNFL_NM: null | string
    CN_ATCHMNFL_PATH: number | string
    BEGIN_DT: null | string
    END_DT: null | string
    MISN_SUBNAME1: string
    MISN_SUBNAME2: string
    MULTI_FILE_SN: null
    MULTI_FILE_LIST: []
    EXPOSCD: null | string
    MISN_NAME: null | string
    FIX_AT: null | string
    USE_AT: null | string
}

// 바이로그램 존 리스트 항목
export interface UhealthZoneListItemInterface {
    UHEALTH_ZONE_NO: null | string
    INSTL_PLACE: null | string
    INSTL_ADRES: number | string
    EXTRL_PERSON_USE_AT: null | string
    LOGIN_AT: null | string
    REGIST_DT: null | string
    MHRLS_NM: null | string
    MHRLS_CNT: null | string
}
// 바이로그램 존 리스트
export interface UhealthZoneListInterface {
    UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
}
