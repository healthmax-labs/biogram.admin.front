export interface InstJoinListItemInterface {
    WORK_TY_CODE: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MBTLNUM: null | string
    MBER_NO: null | number
    NM: null | string
}

//기기측정 현황
export interface InstJoinListInterface {
    PSTINST_REQUEST_INFO_LIST: InstJoinListItemInterface[]
    TOTAL_COUNT: number
}

export interface InstListItemInterface {
    INST_NO: 1000
    UPPER_INST_NO: null
    INST_TY_CODE: 'M'
    BUDGET_ASIGN_AMOUNT: 0
    MBER_CNT: 7
    INST_NM_1: '(주)헬스맥스'
    INST_NM_2: ''
    INST_NO_3: null
    BUDGET_ASIGN_AT: 'N'
    INST_NO_1: 1000
    INST_NM_3: ''
    INST_NO_2: null
    REGIST_DT: 1246579707000
    REQ_MBER_CNT: 0
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
}
