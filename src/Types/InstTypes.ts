export interface InstJoinListItemInterface {
    WORK_TY_CODE: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MBTLNUM: null | string
    MBER_NO: null | number
    NM: null | string
    INST_NO: number
}

//소속 가입 신청 리스트
export interface InstJoinListInterface {
    PSTINST_REQUEST_INFO_LIST: InstJoinListItemInterface[]
    TOTAL_COUNT: number
}

export interface InstListItemInterface {
    INST_NO: number
    UPPER_INST_NO: null
    INST_TY_CODE: string
    BUDGET_ASIGN_AMOUNT: number
    MBER_CNT: number
    INST_NM_1: ''
    INST_NM_2: ''
    INST_NO_3: null
    BUDGET_ASIGN_AT: string | 'N' | 'Y'
    INST_NO_1: number
    INST_NM_3: ''
    INST_NO_2: null
    REGIST_DT: number
    REQ_MBER_CNT: number
}

export interface InstListInterface {
    TOTAL_COUNT: number
    INST_INFO_LIST: InstListItemInterface[]
}

// 소속 등록
export interface InstInfoInterface {
    INST_NO?: string
    ATCHMNFL_NO: number | null
    BIZ_INFO: string
    INST_NM: string
    INST_TY_CODE: string | 'M' | 'O'
    REPRSNT_TELNO: string
    SIGUNGU_CD: string
    SPUSE_STPLAT_AT: string | 'Y' | 'N'
    TOP_INST_NO?: string
    MIDDLE_INST_NO?: string
    EAP_DISPLAY_YN: string | 'Y' | 'N'
    UPPER_INST_NO?: string
    CHARGER_LIST?: Array<{
        CRUD: string | 'U'
        MBER_NO: string
        CONECT_IP: string
        CONECT_LMTT_AT: 'Y' | 'N'
        CNSLTNT_AT: 'Y' | 'N'
        NOT_FREE_YN: 'Y' | 'N'
        END_DE: string | null
        AUTHOR_CODE: null | string
        SMS_CNT_ADD: number
    }>
    INST_SHOW: 'Y' | 'N'
    INST_STPLAT_AT: 'Y' | 'N'
    INST_NO_LEVEL1?: string
    INST_NO_LEVEL2?: string
    INST_NO_LEVEL3?: string
}

export interface EapListItemInterface {
    EAP_INST_REGISTER_NO: string
    INST_NO: string
    INST_NM: string
    MIND_YN: 'Y' | 'N'
    MIND_CURRENT_COUNT: string
    MIND_MAX_COUNT: string
    MIND_URL: null | string
    MIND_CODE: null | string
    HEALTH_YN: 'Y' | 'N'
    HEALTH_CURRENT_COUNT: string
    HEALTH_MAX_COUNT: string
    HEALTH_URL: null | string
    START_DE: string
    END_DE: string
    IS_LIVE: 'N' | 'Y'
    DELETE_YN: null
    REGIST_DT: null
    REGIST_ID: null
    UP_DT: null
    UP_ID: null
    DELETE_DT: null
    DELETE_ID: null
    EAP_DISPLAY_YN: null
}

// Eap 현황 리스트
export interface EapListInterface {
    EAP_INFO_LIST: EapListItemInterface[]
}

// Eap 상세
export interface EapDetailInterface {
    EAP_INST_REGISTER_NO: string
    INST_NO: string
    INST_NM: string
    MIND_YN: string | 'Y' | 'N'
    MIND_CURRENT_COUNT: string
    MIND_MAX_COUNT: string
    MIND_URL: string
    MIND_CODE: string
    HEALTH_YN: 'Y' | 'N'
    HEALTH_CURRENT_COUNT: string
    HEALTH_MAX_COUNT: string
    HEALTH_URL: string
    START_DE: string
    END_DE: string
    IS_LIVE: 'Y' | 'N'
    DELETE_YN: 'N' | 'Y'
    REGIST_DT: string
    REGIST_ID: string
    UP_DT: string
    UP_ID: string
    DELETE_DT: string
    DELETE_ID: string
    EAP_DISPLAY_YN: 'N' | 'Y'
}
