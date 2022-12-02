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
