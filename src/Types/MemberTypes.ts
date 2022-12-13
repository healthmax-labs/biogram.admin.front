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
        //측정정보
        BDWGH_INFO: MesureInfoItem //[체성분]체중(몸무게) 6021
        SLM_INFO: MesureInfoItem //[체성분]근육량 6023
        PBF_INFO: MesureInfoItem //[체성분]체지방률 6022
        FAT_MAS_INFO: MesureInfoItem //[체성분]체지방량 8010
        VFL_INFO: MesureInfoItem //[체성분]내장지방레벨 6026
        BMI_INFO: MesureInfoItem //[체성분]BMI 6056
        EST_BN_MAS_INFO: MesureInfoItem //[체성분]추정골량 6029
        SYSTOLIC_INFO: MesureInfoItem //[혈압]수축기(최고 혈압) 622E
        DIASTOLIC_INFO: MesureInfoItem //[혈압]이완기(최저 혈압) 622F
        PULS_INFO: MesureInfoItem //[혈압]맥박 6230
        FBS_INFO: MesureInfoItem //[혈당]식전혈당 624A
        PP2_INFO: MesureInfoItem //[혈당]식후혈당 624B
        HBA1C_INFO: MesureInfoItem //[혈당]당화혈색소 624M
        T_CHOL_INFO: MesureInfoItem //[콜레스테롤]총콜레스테롤 624C
        HDLC_INFO: MesureInfoItem //[콜레스테롤]HDL 콜레스테롤(HDL-C)-고밀도콜레스테롤 624E
        LDLC_INFO: MesureInfoItem //[콜레스테롤]LDL 콜레스테롤(LDL-C)-저밀도콜레스테롤 624F
        TG_INFO: MesureInfoItem //[콜레스테롤]중성지방(TG) 624D
        BLDVSS_STEP_INFO: MesureInfoItem //[혈관]혈관단계 7016
        CAD_OUTPUT_IN_INFO: MesureInfoItem //[혈관]박출강도 7017
        ELSTC_DGREE_INFO: MesureInfoItem //[혈관]탄성도(혈관) 7018
        RBV_QY_INFO: MesureInfoItem //[혈관]잔혈량 7019
        STRS_SCORE_INFO: MesureInfoItem //[스트레스]스트레스 점수 7012
        PHYSIC_STRS_INFO: MesureInfoItem //[스트레스]신체적 스트레스 7013
        MNTL_STRS_INFO: MesureInfoItem //[스트레스]정신적 스트레스 7014
        STRS_CNTRMSR_ABLTY_INFO: MesureInfoItem //[스트레스]스트레스 대처능력 7015
        HEIGHT_INFO: MesureInfoItem //[기타]신장(키) 6A35
        WAIST_CRCMFRNC_INFO: MesureInfoItem //[기타]허리둘레 8072
        BDHEAT_INFO: MesureInfoItem //[기타]체온 5010
        BB_FNCT_INFO: MesureInfoItem //[뇌기능]기초 뇌 기능 10001
        CB_FNCT_INFO: MesureInfoItem //[뇌기능]인지 뇌 기능 10003
        CB_ABLTY_INFO: MesureInfoItem //[뇌기능]인지 능력 10006
        CB_ABLTY_SCORE_INFO: MesureInfoItem //[뇌기능]인지 기능 점수 10007
        BBF_ADJST_TIME_INFO: MesureInfoItem //[뇌기능]뇌 혈류 조절 시간 10008
        BBF_FNCT_SCORE_INFO: MesureInfoItem //[뇌기능]뇌 혈류 기능 점수10009
        BH_TNT_SCORE_INFO: MesureInfoItem //[뇌기능]뇌 건강 종합 점수 10010
        BB_FNCT_IMAGE_INFO: MesureInfoItem //[뇌기능]기초 뇌 기능 이미지 10002
        CB_FNCT_IMAGE_INFO: MesureInfoItem //[뇌기능]인지 뇌 기능 이미지 10004
        CH_GRAPH_IMAGE_INFO: MesureInfoItem //[뇌기능]뇌 혈류 변화 그래프 이미지 10005
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
