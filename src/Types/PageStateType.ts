// 소속 리스트?
export interface PstinstInfoInterface {
    CONFM_AT: 'Y' | 'N' | null
    CONFM_DE: string | null
    INST_NM: string | null
    INST_NO: number | null
    MBER_NO: number | null
}

// 회원 상세
export interface MemberDetailInfoInterface {
    NM: string
    MBER_NO: number | null
    MBTLNUM: string
    MBTLNUM_CRTFC_AT: string | 'Y' | 'N'
    EMAIL_ADRES: string
    BRTHDY: string
    SEX: string | 'M' | 'F'
    REGIST_DT: string
    USID: string
    MEMO: string
    PSTINST_INFO_LIST: PstinstInfoInterface[]
    MBTLNUM_CNT: number | null
    TOT_CASH: string
    TOT_SCORE: null | number
    USE_STPLAT_AGRE_AT: string | 'Y' | 'N' // 약관 (필수)
    INDVDLINFO_AGRE_AT: string | 'Y' | 'N' // 약관 (필수)
    SNSTIIVEINFO_AGRE_AT: string | 'Y' | 'N' // 약관 (필수)
    INDVDLINFO_THIRD_AGRE_AT: string | 'Y' | 'N' // 약관 (필수)
    SNSTIIVEINFO_THIRD_AGRE_AT: string | 'Y' | 'N' // 약관 (필수)
    MARKTINFO_AGRE_AT: string | 'Y' | 'N' // 약관 (선택)
    MARKTINFO_PURPOSE_AGRE_AT: string | 'Y' | 'N' // 약관 (선택)
    WORK_TY_CODE: string | 'I' | 'O' | 'N' //내/외근직 구분

    // 등록시 필요
    PASSWORD?: string | null
    PASSWORD_CHK?: string | null
    HEIGHT?: number | null
    BDWGH?: number | null
    WAIST_CRCMFRNC?: number | null
}
