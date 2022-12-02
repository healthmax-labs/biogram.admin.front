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
