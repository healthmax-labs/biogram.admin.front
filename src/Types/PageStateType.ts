// 소속 리스트?
export interface PstinstInfoInterface {
    CONFM_AT: 'Y' | 'N' | null
    CONFM_DE: string | null
    INST_NM: string | null
    INST_NO: number | null
    MBER_NO: number | null
}

// 회원 상세
export interface MemberDetailInterface {
    NM: string | null
    MBER_NO: number | null
    MBTLNUM: string | null
    MBTLNUM_CRTFC_AT: 'Y' | 'N' | null
    EMAIL_ADRES: string | null
    BRTHDY: string | null
    SEX: 'M' | 'F' | null
    REGIST_DT: string | null
    USID: string | null
    MEMO: string | null
    PSTINST_INFO_LIST: PstinstInfoInterface[]
    MBTLNUM_CNT: number | null
    TOT_CASH: string
    TOT_SCORE: null | number
    USE_STPLAT_AGRE_AT: 'Y' | 'N' | null // 약관 (필수)
    INDVDLINFO_AGRE_AT: 'Y' | 'N' | null // 약관 (필수)
    SNSTIIVEINFO_AGRE_AT: 'Y' | 'N' | null // 약관 (필수)
    INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N' | null // 약관 (필수)
    SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N' | null // 약관 (필수)
    MARKTINFO_AGRE_AT: 'Y' | 'N' | null // 약관 (선택)
    MARKTINFO_PURPOSE_AGRE_AT: 'Y' | 'N' | null // 약관 (선택)
}
