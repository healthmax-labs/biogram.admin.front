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
    UPPER_INST_NO?: string
    CHARGER_LIST?: Array<{
        CRUD: string | 'U'
        MBER_NO: string
        CONECT_IP: string
        CONECT_LMTT_AT: 'Y' | 'N'
        CNSLTNT_AT: 'Y' | 'N'
    }>
    INST_SHOW: 'Y' | 'N'
    INST_STPLAT_AT: 'Y' | 'N'
}
