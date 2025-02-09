import { DefaultConditionsType } from '@Type/CommonTypes'

//위험요인 현황
export interface RiskFctrListItemInterface {
    SLM_JDGMNT: null | string
    TAKNG_MDCIN: null | string
    WAIST: null | number
    DIASTOLIC: null | string
    LDLC_JDGMNT: null | string
    MBER_NO: number
    TG_JDGMNT: null | string
    LDLC: null | string
    SYSTOLIC: null | string
    TC_JDGMNT: null | string
    HDLC: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    PBF: null | number
    SLM: null | number
    EST_BN_MAS_JDGMNT: null | string
    FBS: null | string
    HDLC_JDGMNT: null | string
    VFL: null | string
    DIASTOLIC_JDGMNT: null | string
    BMI: null | number
    FBS_JDGMNT: null | string
    EST_BN_MAS: null | number
    BDWGH_JDGMNT: null | string
    PULS: null | string
    SYSTOLIC_JDGMNT: null | string
    WAIST_JDGMNT: null | string
    TC: null | string
    PBF_JDGMNT: null | string
    PP2: null | string
    TG: null | string
    BDWGH: null | number
    PP2_JDGMNT: null
    RISK_FCTR: null | string
    BMI_JDGMNT: null | string
    VFL_JDGMNT: null | string
    MESURE_DT: null | string
    NM: string
    MBTLNUM: null | string
    MBTLNUM_CRTFC_AT_NM: string
    MBTLNUM_CRTFC_AT: 'Y' | 'N'
    SV00_NTCN_AT: 'Y' | 'N'
    USID: string
}

//위험요인 현황 리스트
export interface RiskFctrListInterface {
    RISK_FCTR_INFO_LIST: RiskFctrListItemInterface[]
    TOTAL_COUNT: number
}

//전후비교 현황
export interface BrftrCmprListItemInterface {
    MBER_NO: number
    NM: string
    BRTHDY: null | string
    SEXDSTN: null | string
    WAIST_0: null | number
    WAIST_1: null | number
    WAIST_2: null | number
    WAIST_3: null | number
    WAIST_MESURE_DT_0: null | string
    WAIST_MESURE_DT_1: null | string
    WAIST_MESURE_DT_2: null | string
    WAIST_MESURE_DT_3: null | string
    BP_3: null | number
    BP_2: null | number
    BP_1: null | number
    BP_0: null | number
    BP_MESURE_DT_3: null | string
    BP_MESURE_DT_2: null | string
    BP_MESURE_DT_1: null | string
    BP_MESURE_DT_0: null | string
    FBS_0: null | number
    FBS_1: null | number
    FBS_2: null | number
    FBS_3: null | number
    FBS_MESURE_DT_0: null | string
    FBS_MESURE_DT_1: null | string
    FBS_MESURE_DT_2: null | string
    FBS_MESURE_DT_3: null | string
    TG_3: null | string
    TG_2: null | string
    TG_1: null | string
    TG_0: null | string
    TG_MESURE_DT_0: null | string
    TG_MESURE_DT_1: null | string
    TG_MESURE_DT_2: null | string
    TG_MESURE_DT_3: null | string
    HDLC_0: null | number
    HDLC_1: null | number
    HDLC_2: null | number
    HDLC_3: null | number
    HDLC_MESURE_DT_0: null | string
    HDLC_MESURE_DT_1: null | string
    HDLC_MESURE_DT_2: null | string
    HDLC_MESURE_DT_3: null | string
}

//전후비교 현황 리스트
export interface BrftrCmprListInterface {
    MESURE_BRFTR_CMPR_INFO_LIST: BrftrCmprListItemInterface[]
    TOTAL_COUNT: number
}

//기기측정 현황
export interface StatisticsListItemInterface {
    MBER_NO: number
    NM: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MESURE_DE: null | string
    MBER_CNT: null | string
    WEIGHT: null | string
    BMI: null | string
    PBF: null | string
    FAT_MAS: null | string
    SLM: null | string
    ELSTC_DGREE: null | string
    VFL: null | string
    WAIST_CRCMFRNC: null | string
    SYSTOLIC: null | string
    DIASTOLIC: null | string
    PULS: null | string
    FBS: null | string
    PP2: null | string
    HBA1C: null | string
    T_CHOL: null | string
    TG: null | string
    HDLC: null | string
    LDLC: null | string
    STRS_SCORE: null | string
    MNTL_STRS: null | string
    PHYSIC_STRS: null | string
    STRS_CNTRMSR_ABLTY: null | string
    BLDVSS_STEP: null | string
    CAD_OUTPUT_IN: null | string
    EST_BN_MAS: null | string
    RBV_QY: null | string
    HEIGHT: null | string
    BDHEAT: null | string
    ODR: number
}

//기기측정 현황 리스트
export interface StatisticsListInterface {
    DEVICE_MESURE_INFO_LIST: StatisticsListItemInterface[]
    TOTAL_COUNT: number
}

//활동량 현황
export interface ActivityWalkListItemInterface {
    CNSMP_CALORIE: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    SPORTS_DSTNC: null | string
    MAX_HR: null | string
    MESURE_DE: null | string
    SPORTS_TOT_STEPS: null | string
    MBER_NO: number
    ODR: number
    NM: null | string
    MBER_CNT: null | string
    AVG_HR: null | string
}

//활동량 현황 리스트
export interface ActivityWalkListInterface {
    ACTIVITY_STATE_LIST: ActivityWalkListItemInterface[]
    TOTAL_COUNT: number
}

//미측정 현황
export interface NonMeasureListItemInterface {
    MBER_NO: string
    NM: string
    BRTHDY: string
    SEXDSTN: string
    MBTLNUM: string
    USID: string
    BP_N_MESURE: string
    BS_N_MESURE: string
    BC_N_MESURE: string
    HA_N_MESURE: string
    IS_N_MESURE: string
    SR_N_MESURE: string
    SB_N_MESURE: string
}

//미측정 현황 리스트
export interface NonMeasureListInterface {
    NOT_MESURE_NTCN_INFO_LIST: NonMeasureListItemInterface[]
}

//미측정 자동알림 셋팅
export interface NonMeasureAlertItemInterface {
    INST_NO?: number | null
    BP_NTCN_AT: string
    BC_N_MESURE_DAY: number
    SB_NTCN_AT: string
    HA_N_MESURE_DAY: number
    IS_N_MESURE_DAY: number
    NTCN_TY_CODE: string
    NTCN_CN: string
    BP_N_MESURE_DAY: number
    IS_NTCN_AT: string
    BS_N_MESURE_DAY: number
    HA_NTCN_AT: string
    BS_NTCN_AT: string
    SR_N_MESURE_DAY: number
    BC_NTCN_AT: string
    SB_N_MESURE_DAY: number
    SR_NTCN_AT: string
    N_MESURE_NTCN_ENDDE: null | string
    NTCN_STTUS_AT: string
    /*
    AL_SELECT_AT: string
    N_MESURE_PD_ETC: string
    N_MESURE_NTCN_DAY: number
    */
}

//미측정 알림 셋팅
export interface NonMeasureAlertInterface {
    NOT_MESURE_NTCN_SET_INFO: NonMeasureAlertItemInterface
}

//건강지표개선 현황
export interface HealthIndicatorsListItemInterface {
    CNT: number | null
    MBER_NO: number
    TOT_SCORE: number | null
    BP_SCORE: number | null
    TG_SCORE: number | null
    WAIST_SCORE: number | null
    CALC_DE: string | null
    BRTHDY: string | null
    SEXDSTN: string | null
    MBTLNUM: string | null
    HDLC_SCORE: number | null
    FBS_SCORE: number | null
    USID: string | null
    NM: string | null
}

//건강지표개선 현황 리스트
export interface HealthIndicatorsListInterface {
    MYBODY_SCORE_IMPRVM_INFO_LIST: HealthIndicatorsListItemInterface[]
    TOTAL_COUNT: number
}

//보행수 랭킹 현황
export interface WalkRankingListItemInterface {
    MBER_NO: number
    NM: string
    BRTHDY: string
    SEXDSTN: string
    USID: string
    MBTLNUM: string
    INST_RANK: number
    TOT_STEPS: number
}

//보행수 랭킹 현황 리스트
export interface WalkRankingListInterface {
    STEP_RANK_INFO_LIST: WalkRankingListItemInterface[]
    TOTAL_COUNT: number
}

// 스트레스 리스트
export interface StressListItemInterface {
    MBER_NO: number
    MESURE_DE: string
    BRTHDY: string
    NM: string
    CAD_OUTPUT_IN_JDGMNT: DefaultConditionsType
    STRS_SCORE: string
    STRS_CNTRMSR_ABLTY: string
    BLDVSS_STEP_JDGMNT: DefaultConditionsType
    MNTL_STRS: string
    CAD_OUTPUT_IN: string
    MNTL_STRS_JDGMNT: DefaultConditionsType
    ELSTC_DGREE: string
    ELSTC_DGREE_JDGMNT: DefaultConditionsType
    BLDVSS_STEP: string
    STRS_CNTRMSR_ABLTY_JDGMNT: DefaultConditionsType
    RBV_QY: string
    RBV_QY_JDGMNT: DefaultConditionsType
    PHYSIC_STRS: string
    PHYSIC_STRS_JDGMNT: DefaultConditionsType
    STRS_SCORE_JDGMNT: DefaultConditionsType
}

// 뇌기능 현황
export interface BrainListItemInterface {
    MBER_NO: number
    NM: string
    BRTHDY: string
    MESURE_DE: string
    BB_FNCT: string // 기초 뇌 기능
    BB_FNCT_JDGMNT: DefaultConditionsType //기초 뇌 기능 건강상태
    CB_FNCT: string // 인지 뇌 기능
    CB_FNCT_JDGMNT: DefaultConditionsType //인지 뇌 기능 건강상태
    CB_ABLTY: string // 인지 능력
    CB_ABLTY_JDGMNT: DefaultConditionsType //인지 능력 건강상태
    CB_FNCT_SCORE: string // 인지 기능 점수
    CB_FNCT_SCORE_JDGMNT: DefaultConditionsType // 인지 기능 점수 건강상태
    BBF_ADJST_TIME: string // 뇌 혈류 조절 시간
    BBF_ADJST_TIME_JDGMNT: DefaultConditionsType // 뇌 혈류 조절 시간 건강상태
    BBF_FNCT_SCORE: string // 뇌 혈류 기능 점수
    BBF_FNCT_SCORE_JDGMNT: DefaultConditionsType // 뇌 혈류 기능 점수 건강상태
    BH_TNT_SCORE: string // 뇌 건강 종합 점수
    BH_TNT_SCORE_JDGMNT: DefaultConditionsType // 뇌 건강 종합 점수 건강상태
}
