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

export interface MesureInfoItemInterface {
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
    WORK_TY_CODE: 'I' | 'O' | 'N'
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
    WORK_TY_CODE: 'N'
}

// 회원
export interface ConsultInfoListInterface {
    MBER_INFO_LIST: ConsultInfoListItemInterface[]
    TOTAL_COUNT: number
}

export interface MemberMesureInfoInterface {
    //측정정보
    BDWGH_INFO: MesureInfoItemInterface //[체성분]체중(몸무게) 6021
    SLM_INFO: MesureInfoItemInterface //[체성분]근육량 6023
    PBF_INFO: MesureInfoItemInterface //[체성분]체지방률 6022
    FAT_MAS_INFO: MesureInfoItemInterface //[체성분]체지방량 8010
    VFL_INFO: MesureInfoItemInterface //[체성분]내장지방레벨 6026
    BMI_INFO: MesureInfoItemInterface //[체성분]BMI 6056
    EST_BN_MAS_INFO: MesureInfoItemInterface //[체성분]추정골량 6029
    SYSTOLIC_INFO: MesureInfoItemInterface //[혈압]수축기(최고 혈압) 622E
    DIASTOLIC_INFO: MesureInfoItemInterface //[혈압]이완기(최저 혈압) 622F
    PULS_INFO: MesureInfoItemInterface //[혈압]맥박 6230
    FBS_INFO: MesureInfoItemInterface //[혈당]식전혈당 624A
    PP2_INFO: MesureInfoItemInterface //[혈당]식후혈당 624B
    HBA1C_INFO: MesureInfoItemInterface //[혈당]당화혈색소 624M
    T_CHOL_INFO: MesureInfoItemInterface //[콜레스테롤]총콜레스테롤 624C
    HDLC_INFO: MesureInfoItemInterface //[콜레스테롤]HDL 콜레스테롤(HDL-C)-고밀도콜레스테롤 624E
    LDLC_INFO: MesureInfoItemInterface //[콜레스테롤]LDL 콜레스테롤(LDL-C)-저밀도콜레스테롤 624F
    TG_INFO: MesureInfoItemInterface //[콜레스테롤]중성지방(TG) 624D
    BLDVSS_STEP_INFO: MesureInfoItemInterface //[혈관]혈관단계 7016
    CAD_OUTPUT_IN_INFO: MesureInfoItemInterface //[혈관]박출강도 7017
    ELSTC_DGREE_INFO: MesureInfoItemInterface //[혈관]탄성도(혈관) 7018
    RBV_QY_INFO: MesureInfoItemInterface //[혈관]잔혈량 7019
    STRS_SCORE_INFO: MesureInfoItemInterface //[스트레스]스트레스 점수 7012
    PHYSIC_STRS_INFO: MesureInfoItemInterface //[스트레스]신체적 스트레스 7013
    MNTL_STRS_INFO: MesureInfoItemInterface //[스트레스]정신적 스트레스 7014
    STRS_CNTRMSR_ABLTY_INFO: MesureInfoItemInterface //[스트레스]스트레스 대처능력 7015
    HEIGHT_INFO: MesureInfoItemInterface //[기타]신장(키) 6A35
    WAIST_CRCMFRNC_INFO: MesureInfoItemInterface //[기타]허리둘레 8072
    BDHEAT_INFO: MesureInfoItemInterface //[기타]체온 5010
    BB_FNCT_INFO: MesureInfoItemInterface //[뇌기능]기초 뇌 기능 10001
    CB_FNCT_INFO: MesureInfoItemInterface //[뇌기능]인지 뇌 기능 10003
    CB_ABLTY_INFO: MesureInfoItemInterface //[뇌기능]인지 능력 10006
    CB_ABLTY_SCORE_INFO: MesureInfoItemInterface //[뇌기능]인지 기능 점수 10007
    BBF_ADJST_TIME_INFO: MesureInfoItemInterface //[뇌기능]뇌 혈류 조절 시간 10008
    BBF_FNCT_SCORE_INFO: MesureInfoItemInterface //[뇌기능]뇌 혈류 기능 점수10009
    BH_TNT_SCORE_INFO: MesureInfoItemInterface //[뇌기능]뇌 건강 종합 점수 10010
    BB_FNCT_IMAGE_INFO: MesureInfoItemInterface //[뇌기능]기초 뇌 기능 이미지 10002
    CB_FNCT_IMAGE_INFO: MesureInfoItemInterface //[뇌기능]인지 뇌 기능 이미지 10004
    CH_GRAPH_IMAGE_INFO: MesureInfoItemInterface //[뇌기능]뇌 혈류 변화 그래프 이미지 10005
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
        WORK_TY_CODE: 'I' | 'O' | 'N'
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
    MESURE_INFO: MemberMesureInfoInterface
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

// 상담회원 상세 리스트 아이템
export interface MesureInfoListItemInterface {
    MESURE_MTHD: 'M' | 'D'
    MVL: number
    MNVL: number
    DATAS: string
    MESURE_DT: string
    MBER_NO: number
    MESURE_GRAD_NM: string
    MESURE_MTHD_NM: string
}

// 상담회원 상세 리스트
export interface MesureInfoListInterface {
    TOTAL_COUNT: number
    MESURE_INFO_LIST: MesureInfoListItemInterface[]
}

// 상담차트 리스트
export interface ManageCounselItemInterface {
    CNST_NO: number
    REG_NM: string
    MOD_MNG_NM: string
    MOD_DT: string
    CNST: string
    PLN: string
    MNG_ID: string
    REGDT: string
    MNG_NM: string
    MBER_NO: number
}

export interface ManageCounselInterface {
    CHART_LIST: ManageCounselItemInterface[]
}

// 상담회원 마이코치
export interface ManageCounselMycoachItemInterface {
    DATE: '20221222'
    CNSMP_CALORIE: 0
    MEAL_CALORIE: 0
}

export interface ManageCounselMycoachInterface {
    MEAL_CALORIE_DIFF: number
    CALORIE_7_DAY_LIST: ManageCounselMycoachItemInterface[]
    MEAL_CALORIE_RECMND: number
    MEAL_CALORIE_AVG: number
    CNSMP_CALORIE_AVG: number
    CNSMP_CALORIE_GOAL: number
    CNSMP_CALORIE_DIFF: number
}

// 상담 회원 설문 조사.
export interface ManageCounselQustnrAnswerSubItemInterface {
    QESTN_SN: string
    QUSTNR_SN: string
    ANSWER_6: string
    ANSWER_5: string
    ANSWER_4: string
    QUSTNR_NM: string
    ANSWER_3: string
    ANSWER_2: string
    QUSTNR_DE: string
    QUSTNR_SE_CODE: 'SPHB' | 'LLHB' | 'MLHB'
    ANSWER_1: string
    QUSTNR_DT: string
}

export interface ManageCounselQustnrAnswerItemInterface {
    ANSWER: {
        SPHB: ManageCounselQustnrAnswerSubItemInterface
        LLHB: ManageCounselQustnrAnswerSubItemInterface
        MLHB: ManageCounselQustnrAnswerSubItemInterface
    }
    QUSTNR_DE: string
}

export interface ManageCounselQustnrAnswerInterface {
    QUSTNR_ANSWERS: ManageCounselQustnrAnswerItemInterface[]
}

// 설문 조사 등록
export interface ManageCounselQustnrAnswerDataItemInterface {
    QUSTNR_SE_CODE: string | 'SPHB' | 'LLHB' | 'MLHB'
    QUSTNR_SN: number
    QESTN_SN: number
    ANSWER_CODE: string
    ANSWER: string
}

export interface ManageCounselQustnrAnswerDataInterface {
    MBER_NO: number
    ANSWER_LIST: ManageCounselQustnrAnswerDataItemInterface[]
}

export interface ManageCounselMsgBoxListInterface {
    TOTAL_COUNT: number | null
    SMS_INFO_LIST: ManageCounselMsgListInterface[]
    MBER_NO: number | null
    END_DT: string | null
    START_DT: string | null
}

export interface ManageCounselMsgListInterface {
    SNDNG_NO: string | null
    CALL_STATUS: string | null
    SNDNG_STATUS: string | null
    RECVER: string | null
    CN: string | null
    RGSDT: string | null
    MBER_NO: number | null
    SNDNG_SF: string | null
    MSG_TYPE_NM: string | null
    MSG_TYPE: number | null
    STATUS: number | null
    SNDNGDT: string | null
    UMID: string | null
    REPORTDT: string | null
    CMID: string | null
    MBTLNUM: string | null
}

// 상담 회원 생체 나이 대사나이 아이템
export interface ConsultRawAgeMiInfoItemInterface {
    AGE: number
    MEASURE_DT: string
    MI_MSA_DIFF: string
    MI_MAOA_DIFF: string // 복부비만
    MI_MDLA_DIFF: string // 동맥경화
    MI_MDMA_DIFF: string // 혈당
    MI_MHTNA_DIFF: string // 혈압
    RSLT_ANLY1: string
    RSLT_ANLY2: string
}

// 상담 회원 생체 나이 비만생체 나이 아이템
export interface ConsultRawAgeObiInfoItemInterface {
    AGE: number
    MEASURE_DT: string
    OBI_AOA_DIFF: string // 복부비만
    OBI_BAA_DIFF: string // 비만생체
    OBI_BFA_DIFF: string // 체지방나이
    TOTAL_GUID1: string
    TOTAL_GUID2: string
    TOTAL_GUID3: string
}

// 상담회원 삭사 일기 메뉴
export interface ConsultMealDiaryItemMenuListInterface {
    MEAL_SE_CODE_NM: '아침'
    MEAL_CALORIE: 1045
    MENU_LIST: Array<{
        FOOD_IMAGE_PATH: string
        FD_ID: number
        MEAL_SE_CODE: string
        MEAL_DT: string
        FD_NM: string
        MBER_NO: number
        NTK_QY: number
    }>
    MEAL_SE_CODE: string
    JSON_DATA: string
    MBER_NO: number
    MEAL_SODIUM: number
    MEAL_FAT: number
    PREDICT_IMAGE_PATH: string
    MEAL_DT: string
    MEAL_PROTEIN: number
    MEAL_SUGAR: number
    MEAL_CARBOHYDRATE: number
}

// 상담회원 삭사 일기
export interface ConsultMealDiaryItemInterface {
    MEAL_NUTRITION_INFO: {
        RECMND_CALORIE: number
        RECMND_SODIUM: number
        RECMND_FAT: number
        RECMND_CARBOHYDRATE: number
        MEAL_CALORIE: number
        PROTEIN_RATE: number
        MEAL_DE: string
        SODIUM_RATE: number
        CARBOHYDRATE_RATE: number
        MEAL_SODIUM: number
        CALORIE_RATE: number
        MEAL_FAT: number
        RECMND_DRKWT: number
        RECMND_PROTEIN: number
        DRKWT_QY: number
        RECMND_SUGAR: number
        FAT_RATE: number
        MEAL_PROTEIN: number
        DRKWT_RATE: number
        MEAL_SUGAR: number
        MEAL_CARBOHYDRATE: number
    }
    MEAL_DE: string
    MEAL_MENU_LIST: ConsultMealDiaryItemMenuListInterface[] | null
}

// 상담회원 마이그래프 구분 코드.
export type ConsultMyGraphCategoryType =
    | string
    | `body`
    | `brssr`
    | `bdsg`
    | `chol`
    | `bldvss`
    | `strs`
    | `height`
    | `waist`
    | `brain`
    | `life_log`

// 마이그래프 체성분
export interface ConsultMyGraphBodyResultItemInterface {
    EST_BN_MAS: null | number // 추정골량
    FAT_MAS: null | number // 체지방량
    BDWGH: null | number // 몸무게(체중)
    SLM: null | number // 근육량
    PBF: null | number // 체지방률
    BMR: null | number // 기초대사량
    MESURE_DE: string // 측정일(yyyyMMdd)
    MBER_NO: number // 회원번호
    VFL: null | number // 내장지방레벨
    BMI: null | number // BMI
}

export interface ConsultMyGraphBodyResultInterface {
    BODY_GRAPH: ConsultMyGraphBodyResultItemInterface[]
    VFL_STD_LIST: []
    BMR_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    FAT_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BDWGH_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    EST_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BMI_STD_LIST: []
    SLM_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    PBF_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 혈압
export interface ConsultMyGraphBrssrResultItemInterface {
    MESURE_DE: string // 측정일(yyyyMMdd)
    MESURE_DT: string // 측정일시(yyyyMMddHHmmss)
    PULS: number | null // 심박수
    DIASTOLIC: number | null // 이완기 혈압
    MBER_NO: number | null // 회원번호
    SYSTOLIC: number | null // 수축기 혈압
}

export interface ConsultMyGraphBrssrResultInterface {
    SYS_DIA_GRAPH: ConsultMyGraphBrssrResultItemInterface[]
    SYS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    DIA_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 혈당
export interface ConsultMyGraphDdsgResultItemInterface {
    PP2: null | number //식후 혈당
    FBS: null | number // 식전 혈당
    MESURE_DE: string // 측정일(yyyyMMdd)
    MBER_NO: number //회원번호
    HBA1C: null | number // 당화혈색소
}

export interface ConsultMyGraphDdsgResultInterface {
    FBS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    PP2_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    SUGAR_GRAPH: ConsultMyGraphDdsgResultItemInterface[]
    HBA1C_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 콜레스테롤
export interface ConsultMyGraphCholResultItemInterface {
    HDLC: number | null // HDL 콜레스테롤
    TG: number | null // 중성지방
    MESURE_DE: string // 측정일(yyyyMMdd)
    MBER_NO: number // 회원번호
    T_CHOL: number | null // 총 콜레스테롤
    LDLC: number | null // LDL 콜레스테롤
}

export interface ConsultMyGraphCholResultInterface {
    TG_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    HDLC_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    LDLC_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    CHOL_GRAPH: ConsultMyGraphCholResultItemInterface[]
    CHOL_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 혈관
export interface ConsultMyGraphBldvssItemResultInterface {
    MBER_NO: number // 회원번호
    MESURE_DE: string // 측정일(yyyyMMdd)
    BLDVSS_STEP: number | null // 혈관단계
    CAD_OUTPUT_IN: number | null // 박출강도
    ELSTC_DGREE: number | null // 탄성도
    RBV_QY: number | null // 잔혈량
}

export interface ConsultMyGraphBldvssResultInterface {
    RBV_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    CAD_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    VSS_GRAPH: ConsultMyGraphBldvssItemResultInterface[]
    ELSTC_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    VSS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 스트레스
export interface ConsultMyGraphStrsResultItemInterface {
    MBER_NO: number // 회원번호
    MESURE_DE: string // 측정일(yyyyMMdd)
    STRS_SCORE: number | null // 스트레스 점수
    STRS_CNTRMSR_ABLTY: number | null // 신체적 스트레스
    MNTL_STRS: number | null // 정신적 스트레스
    PHYSIC_STRS: number | null // 스트레스 대처능력
}

export interface ConsultMyGraphStrsResultInterface {
    STRS_GRAPH: ConsultMyGraphStrsResultItemInterface[]
    ASTRS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    STRS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    PSTRS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    MSTRS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 신장
export interface ConsultMyGraphHeightResultItemInterface {
    MESURE_DE: string // 측정일(yyyyMMdd)
    MBER_NO: number // 회원번호
    HEIGHT: number | null // 신장
}

export interface ConsultMyGraphHeightResultInterface {
    HEIGHT_GRAPH: ConsultMyGraphHeightResultItemInterface[]
}

// 마이그래프 허리둘레
export interface ConsultMyGraphWaistResultItemInterface {
    MESURE_DE: string // 측정일(yyyyMMdd)
    WAIST_CRCMFRNC: number | null // 허리둘레
    MBER_NO: number // 회원번호
}

export interface ConsultMyGraphWaistResultInterface {
    WAIST_GRAPH: ConsultMyGraphWaistResultItemInterface[]
    WAIST_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 마이그래프 뇌기능
export interface ConsultMyGraphBrainResultItemInterface {
    MBER_NO: number // 회원번호
    MESURE_DE: string // 측정일(yyyyMMdd)
    WAIST_CRCMFRNC: number | null // 허리둘레
    BBF_ADJST_TIME: number | null // 기초 뇌 기능
    CB_FNCT: number | null // 인지 뇌 기능
    CB_ABLTY: number | null // 인지 뇌 능력
    CB_FNCT_SCORE: number | null // 인지 뇌 기능 점수
    BBF_FNCT_SCORE: number | null // 뇌 혈류 조절 시간
    BB_FNCT: number | null // 뇌 혈류 기능 점수
    BH_TNT_SCORE: number | null //뇌기능 종합점수
}

export interface ConsultMyGraphBrainResultInterface {
    BBFNCT_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BRAIN_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BAT_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BFS_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    BRAIN_GRAPH: ConsultMyGraphBrainResultItemInterface[]
    CBFNCT_ABLTY_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    CBFNCT_SCORE_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
    CBFNCT_STD_LIST: Array<{
        COLOR_CODE_VALUE: string
        MESURE_GRAD: number
        MVL: number
        MNVL: number
        MESURE_GRAD_NM: string
    }>
}

// 활동량 & 수면
export interface ConsultMyGraphLifeLogResultItemInterface {
    test: boolean
}

export interface ConsultMyGraphLifeLogResultInterface {
    ACTV_TRCK_14DAYS_STEP_INFO_LIST: Array<{
        MESURE_DE: string
        GOAL_VALUE: number
        STEPS: number
    }>
    ACTV_TRCK_14DAYS_AVG_STEP_INFO: {
        GOAL_RATE: number
        AVG_STEPS: number
    }
    DAIL_MOBLPHON_STEPS_DATA_LIST: Array<{
        RATE: number
        MESURE_DE: string
        MOBLPHON_STEPS: number
        MBER_NO: number
        GOAL_VALUE: number
    }>
    MEAL_14DAYS_AVG_CALORIE_INFO: {
        AVG_GOAL_RATE: number
        AVG_MEAL_CALORIE: number
    }
    SLEEP_AVG_14DAYS_INFO: {
        GOAL_BEGIN_RATE: number
        GOAL_RATE: number
        AVG_SLEEP_TIME: number
        GOAL_END_RATE: number
    }
    SLEEP_14DAYS_INFO_LIST: Array<{
        SLEEP_TIME: number
        SLEET_END_TIME: string
        GOAL_END_TIME: string
        MESURE_DE: string
        SLEEP_BEGIN_TIME: string
        GOAL_VALUE: number
        GOAL_BEGIN_TIME: string
    }>
    LATEST_HR_INFOS: Array<{
        LATEST_MESURE_DT: string
        LATEST_HR: string
        SUPER: number
        ENDURANCE: number
        HR_STDR_INFO: {
            SUPER: number
            ENDURANCE: number
            MILD_FAT_BURNING: number
            FAT_BURNING: number
        }
        MILD_FAT_BURNING: string
        MESURE_DE: string
        STABLE: string
        FAT_BURNING: number
    }>
    MEAL_14DAYS_CALORIE_INFO_LIST: Array<{
        RECMND_CALORIE: number
        MEAL_CALORIE: number
        MEAL_DE: string
    }>
    MEAL_14DAYS_DETAIL_INFO_LIST: Array<{
        DINR_AT: number
        MEAL_DE: string
        SNCK_AT: number
        BRFT_AT: number
        LNCH_AT: number
    }>
}
