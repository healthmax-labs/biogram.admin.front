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
    ATCHMNFL_NM: string
    ATCHMNFL_NO: number
    ATCHMNFL_PATH: string
    BEGIN_DT: string
    CN_ATCHMNFL_NM: string
    CN_ATCHMNFL_NO: number
    CN_ATCHMNFL_PATH: string
    END_DT: string
    MISN_CD: string
    MISN_COMPT_REWARD_POINT: number
    MISN_DC: null | string
    MISN_STEP: number
    MISN_SUBNAME1: string
    MISN_SUBNAME2: string
    MULTI_FILE_LIST: []
    MULTI_FILE_SN: null
    USE_AT: string | 'Y' | 'N'
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
    JOIN_AT: `C` | `J` | `G` | `N`
    LA: number
    LO: number
}

// 바이로그램 존 리스트
export interface UhealthZoneListInterface {
    UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
}

// 바이오그램존 샘플 인터페이스
export interface UhealthzoneInfoSampleInterface {
    INSTL_PLACE: '테스트지점'
    INST_NO: '1446'
    TELNO: '0212341234'
    INSTL_ADRES: '서울특별시 강남구 청담동 학동로 (학동로, 청담역)'
    LA: '37.519440'
    LO: '127.053644'
    MAP_ADRES: 'http://naver.me/FhyUhn1r'
    OPER_WIK_INFO: [
        {
            TIME_KND_CODE: 'BSTM'
            WIK_SE_CODE: 'RD'
            WIK_CODE: '15'
        },
        {
            TIME_KND_CODE: 'BSTM'
            WIK_SE_CODE: 'BD'
            WIK_CODE: '21'
        },
        {
            TIME_KND_CODE: 'BMTM'
            WIK_SE_CODE: 'RD'
            WIK_CODE: '15'
        }
    ]
    OPER_TIME_INFO: [
        {
            TIME_KND_CODE: 'BSTM'
            TIME_SE_CODE: 'WD'
            BEGIN_TIME: '0900'
            END_TIME: '1800'
        },
        {
            TIME_KND_CODE: 'BMTM'
            TIME_SE_CODE: 'WD'
            BEGIN_TIME: '1126'
            END_TIME: '0431'
        }
    ]
    INSTL_TY_CD: 'P'
    LOGIN_AT: 'Y'
    EXTRL_PERSON_USE_AT: 'Y'
    OPEN_AT: 'Y'
    PRINT_AT: 'N'
    LOGO_ATCHMNFL_NO: 1635
    BCRN_ATCHMNFL_NO: 1636
    MHRLS_INFO: [
        {
            MHRLS_CODE: 'KK'
        },
        {
            MHRLS_CODE: 'HT'
        },
        {
            MHRLS_CODE: 'IS'
        },
        {
            MHRLS_CODE: 'BP'
        },
        {
            MHRLS_CODE: 'BS'
        }
    ]
    VEIN_RCIVR: [
        {
            MHRLS_CODE: 'IS'
            SERIAL_NO: '12341234'
        }
    ]
}

export interface UhealthzoneInfoOperWikInfoInfoInterface {
    TIME_KND_CODE: string | 'BSTM' | 'BMTM'
    WIK_SE_CODE: string | 'RD' | 'BD'
    WIK_CODE: string
}

export interface UhealthzoneInfoOperTimeInfoInterface {
    TIME_KND_CODE: string | 'BSTM' | 'BMTM'
    TIME_SE_CODE: string | 'WD'
    BEGIN_TIME: string
    END_TIME: string
}

export interface UhealthzoneInfoMhrlsInfoInterface {
    MHRLS_CODE: string
}

export interface UhealthzoneInfoVeinRcivrInterface {
    MHRLS_CODE: string
    SERIAL_NO: string
}

// 바이오그램 존 등록 인터페이스
export interface UhealthzoneInfoInterface {
    INSTL_PLACE: string
    INST_NO: string
    TELNO: string
    INSTL_ADRES: string
    LA: string
    LO: string
    MAP_ADRES: string
    OPER_WIK_INFO: UhealthzoneInfoOperWikInfoInfoInterface[]
    OPER_TIME_INFO: UhealthzoneInfoOperTimeInfoInterface[]
    INSTL_TY_CD: string | 'P' | 'B'
    LOGIN_AT: string | 'Y' | 'N'
    EXTRL_PERSON_USE_AT: string | 'Y' | 'N'
    OPEN_AT: string | 'Y' | 'N'
    PRINT_AT: string | 'Y' | 'N'
    JOIN_AT: string | 'G' | 'C' | 'J'
    LOGO_ATCHMNFL_NO: number
    BCRN_ATCHMNFL_NO: number
    MHRLS_INFO: UhealthzoneInfoMhrlsInfoInterface[]
    VEIN_RCIVR: UhealthzoneInfoVeinRcivrInterface[]
}

// 바이오그램 존 상세 인터페이스
export interface UhealthZoneChargerInfoInterface {
    UHEALTH_ZONE_VEIN_RCIVR_LIST: Array<{
        MHRLS_CODE: string
        SERIAL_NO: string
        UHEALTH_ZONE_NO: number
        MHRLS_CODE_NM: string
    }>
    UHEALTH_ZONE_INFO: {
        INST_NO: number | null
        LO: string
        PRINT_AT: 'N' | 'Y'
        INSTL_PLACE: string
        LOGO_ATCHMNFL_PATH: string
        OPEN_AT: 'Y' | 'N'
        LOGO_ATCHMNFL_NM: string
        INSTL_TY_CD: string
        EXTRL_PERSON_USE_AT_NM: string
        LOGO_ATCHMNFL_NO: number
        INSTL_ADRES: string
        TOP_INST_NO: number
        BCRN_ATCHMNFL_NO: number
        LA: string
        BCRN_ATCHMNFL_NM: string
        EXTRL_PERSON_USE_AT: 'Y' | 'N'
        UHEALTH_ZONE_NO: number
        BCRN_ATCHMNFL_PATH: string
        MIDDLE_INST_NO: number | null
        TELNO: string
        BOTTOM_INST_NO: number | null
        MAP_ADRES: string
        LOGIN_AT: 'Y' | 'N'
        JOIN_AT: 'G' | 'C' | 'J'
    }
    UHEALTH_ZONE_MHRLS_LIST: Array<{
        MHRLS_CODE: string
        UHEALTH_ZONE_NO: number
        MHRLS_CODE_NM: string
    }>
    UHEALTH_ZONE_OPER_BMTM: {
        TIME_SE_CODE_NM: string
        BEGIN_TIME_H: string
        WIK_LIST: Array<{
            WIK_SE_CODE: string
            WIK_CODE: string
            UHEALTH_ZONE_NO: number
            WIK_SE_CODE_NM: string
            WIK_CODE_NM: string
            TIME_KND_CODE: string
        }>
        END_TIME: string
        BEGIN_TIME: string
        UHEALTH_ZONE_NO: number
        END_TIME_M: string
        TIME_KND_CODE: string
        TIME_KND_CODE_NM: string
        BEGIN_TIME_M: string
        END_TIME_H: string
    }
    UHEALTH_ZONE_OPER_BSTM: {
        TIME_SE_CODE_NM: string
        BEGIN_TIME_H: string
        WIK_LIST: Array<{
            WIK_SE_CODE: string
            WIK_CODE: string
            UHEALTH_ZONE_NO: number
            WIK_SE_CODE_NM: string
            WIK_CODE_NM: string
            TIME_KND_CODE: string
        }>
        END_TIME: string
        BEGIN_TIME: string
        UHEALTH_ZONE_NO: number
        END_TIME_M: string
        TIME_KND_CODE: string
        TIME_KND_CODE_NM: string
        BEGIN_TIME_M: string
        END_TIME_H: string
    }
}
