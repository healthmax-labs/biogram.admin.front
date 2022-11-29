// 소속 선택 리스트.

export interface PstinstInfoItemInterface {
    CHK_INST_1: 'Y' | 'N'
    CHK_INST_2: 'Y' | 'N'
    CHK_INST_3: 'Y' | 'N'
    INST_NM_1: string
    INST_NM_2: string
    INST_NM_3: string
    INST_NO: number
    INST_NO_1: null | number
    INST_NO_2: null | number
    INST_NO_3: null | number
    UPPER_INST_NO: number
}

export interface MesureInfoItem {
    COLOR_CODE_VALUE: string
    MVL: string
    INCRS_QY: string
    MNVL: string
    DATAS: null
    MESURE_DT: string
    MESURE_CODE_NM: string
    GOAL_VALUE: null
    GOAL_INCRS_QY: null
    MESURE_GRAD_NM: string
    MESURE_MTHD_NM: string
    MESURE_CODE: string
}

//회원 리스트
// export interface MemberInfoListItemInterface {
//     INST_NO: 1365
//     INST_NM: '테슷트 소속'
//     MBER_NO: 87334
//     MBTLNUM_CRTFC_AT_NM: '인증'
//     BRTHDY: '1980-02-02'
//     SEXDSTN: 'M'
//     SEXDSTN_NM: '남'
//     CONECT_DT: '2022-11-15'
//     TOT_CASH: '0'
//     MBTLNUM: '010-6248-4549'
//     REGIST_DT: '2022-10-24 10:41:06'
//     USID: 'testcs3'
//     MBTLNUM_CRTFC_AT: 'Y'
//     ACCML_POINT: 0
//     NM: '최현소속관2'
// }
export interface MemberInfoListItemInterface {
    INST_NO: number
    INST_NM: string
    MBER_NO: number
    MBTLNUM_CRTFC_AT_NM: `인증` | `미인증`
    BRTHDY: string
    SEXDSTN: 'M' | 'F'
    SEXDSTN_NM: '남' | '여'
    CONECT_DT: string
    TOT_CASH: string
    MBTLNUM: string
    REGIST_DT: string
    USID: string
    MBTLNUM_CRTFC_AT: 'Y' | 'N'
    ACCML_POINT: number
    NM: string
}

export interface MemberInfoListInterface {
    MBER_INFO_LIST: MemberInfoListItemInterface[]
    TOTAL_COUNT: number
}

export interface ConsultInfoListItemInterface {
    INST_NO: 1443
    INST_NM: '건다온'
    MBER_NO: 87335
    MBTLNUM_CRTFC_AT_NM: '인증'
    BRTHDY: '2022-11-29'
    SEXDSTN: 'M'
    RISK_FCTR: 'BMI'
    SEXDSTN_NM: '남'
    MESURE_DT: '20221129095659'
    MBTLNUM: '010-9279-0312'
    REGIST_DT: '2022-11-29 09:56:59'
    USID: 'geondaon'
    MBTLNUM_CRTFC_AT: 'Y'
    NM: '건다온'
}

// 회원
export interface ConsultInfoListInterface {
    MBER_INFO_LIST: ConsultInfoListItemInterface[]
    TOTAL_COUNT: number
}

// 회원 정보.
export interface MemberInfoInterface {
    MBER_INFO: {
        EMAIL_ADRES: string
        SEX: 'M' | 'F'
        MBER_NO: number
        SNSTIIVEINFO_AGRE_AT: 'Y' | 'N'
        BRTHDY: string
        MARKTINFO_AGRE_AT: 'Y' | 'N'
        SEXDSTN: '남' | '여'
        TOT_CASH: string
        MBTLNUM: string
        VEIN_REGIST_AT: 'Y' | 'N'
        USID: string
        MEMO: null | string
        AGE: string
        WORK_TY_CODE: null
        MBTLNUM_CNT: number
        TOT_SCORE: null | number
        PSTINST_INFO_LIST: Array<{
            INST_NO: number
            INST_NM: string
            CONFM_DE: string
            CONFM_AT: 'Y' | 'N'
            MBER_NO: number
        }>
        SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N'
        MARKTINFO_PURPOSE_AGRE_AT: 'Y' | 'N'
        INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N'
        SERIAL_AT: 'Y' | 'N'
        USE_STPLAT_AGRE_AT: 'Y' | 'N'
        REGIST_DT: string
        INDVDLINFO_AGRE_AT: 'Y' | 'N'
        MBTLNUM_CRTFC_AT: 'Y' | 'N'
        NM: string
    }
    MESURE_INFO: {
        T_CHOL_INFO: MesureInfoItem
        SYSTOLIC_INFO: MesureInfoItem
        EST_BN_MAS_INFO: MesureInfoItem
        BDHEAT_INFO: MesureInfoItem
        STRS_CNTRMSR_ABLTY_INFO: MesureInfoItem
        BB_FNCT_IMAGE_INFO: MesureInfoItem
        HEIGHT_INFO: MesureInfoItem
        HBA1C_INFO: MesureInfoItem
        CB_FNCT_IMAGE_INFO: MesureInfoItem
        BH_TNT_SCORE_INFO: MesureInfoItem
        LDLC_INFO: MesureInfoItem
        BMI_INFO: MesureInfoItem
        BLDVSS_STEP_INFO: MesureInfoItem
        CB_ABLTY_SCORE_INFO: MesureInfoItem
        BBF_ADJST_TIME_INFO: MesureInfoItem
        VFL_INFO: MesureInfoItem
        CH_GRAPH_IMAGE_INFO: MesureInfoItem
        BBF_FNCT_SCORE_INFO: MesureInfoItem
        ELSTC_DGREE_INFO: MesureInfoItem
        RBV_QY_INFO: MesureInfoItem
        WAIST_CRCMFRNC_INFO: MesureInfoItem
        BDWGH_INFO: MesureInfoItem
        HDLC_INFO: MesureInfoItem
        SLM_INFO: MesureInfoItem
        PP2_INFO: MesureInfoItem
        FAT_MAS_INFO: MesureInfoItem
        MNTL_STRS_INFO: MesureInfoItem
        DIASTOLIC_INFO: MesureInfoItem
        CB_FNCT_INFO: MesureInfoItem
        TG_INFO: MesureInfoItem
        PHYSIC_STRS_INFO: MesureInfoItem
        PBF_INFO: MesureInfoItem
        STRS_SCORE_INFO: MesureInfoItem
        CAD_OUTPUT_IN_INFO: MesureInfoItem
        FBS_INFO: MesureInfoItem
        CB_ABLTY_INFO: MesureInfoItem
        PULS_INFO: MesureInfoItem
        BB_FNCT_INFO: MesureInfoItem
    }
    QUSTNR_ANSWER_LIST: Array<{
        QUSTNR_SN: number
        QESTN_SUMRY_1: string
        QESTN_SUMRY_2: string
        MBER_NO: number
        QUSTNR_SE_CODE: string
        QESTN_ANSWER_2: string
        QUSTNR_SE_CODE_NM: string
        QESTN_ANSWER_1: string
        QESTN_SUMRY_3: string
        QESTN_SUMRY_4: string
        QESTN_SUMRY_5: string
        QESTN_SUMRY_6: string
        QESTN_ANSWER_4: string
        QESTN_ANSWER_3: string
        QESTN_ANSWER_6: string
        QESTN_ANSWER_5: string
    }>
}

// 회원 이용약관 인터페이스
export interface StplatItemInterface {
    USE_STPLAT_AGRE_AT: 'Y' | 'N' | string
    INDVDLINFO_AGRE_AT: 'Y' | 'N' | string
    SNSTIIVEINFO_AGRE_AT: 'Y' | 'N' | string
    INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N' | string
    SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N' | string
    MARKTINFO_AGRE_AT: 'Y' | 'N' | string
    MARKTINFO_PURPOSE_AGRE_AT: 'Y' | 'N' | string
}

// 소속 이용용약관 인터페이스
export interface ThptyStplatInfoInterface {
    INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N' | string
    SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N' | string
}
