// 위험요인 현황 테이블 데이터
export interface RiskFctrTableListItemInterface {
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
}

//위험요인 현황 테이블 설정.
export const RiskFctrTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `회원번호`,
            key: `MBER_NO`,
        },
        {
            name: `회원명`,
            key: `NM`,
        },
        {
            name: `생년월일`,
            key: `BRTHDY`,
        },
        {
            name: `위험요인`,
            key: `NM`,
        },
        {
            name: `복약`,
            key: `NM`,
        },
        {
            name: `체중(kg)`,
            key: `WAIST`,
        },
        {
            name: `BMI(kg/m²)`,
            key: `BMI`,
        },
        {
            name: `체지방률(%)`,
            key: `PBF`,
        },
        {
            name: `근육량(kg)`,
            key: `SML`,
        },
        {
            name: `추정골량(kg)`,
            key: `EST_BN_MAS`,
        },
        {
            name: `내장지방(lv)`,
            key: `VFL`,
        },
        {
            name: `수축기(mmHg)`,
            key: `SYSTOLIC`,
        },
        {
            name: `이완기(mmHg)`,
            key: `DIASTOLIC`,
        },
        {
            name: `맥박(bpm)`,
            key: `PULS`,
        },
        {
            name: `식전(mg/dl)`,
            key: `FBS`,
        },
        {
            name: `식후(mg/dl)`,
            key: `PP2`,
        },
        {
            name: `TC(mg/dl)`,
            key: `TC`,
        },
        {
            name: `TG(mg/dl)`,
            key: `TG`,
        },
        {
            name: `HDL-C(mg/dl)`,
            key: `HDLC`,
        },
        {
            name: `LDL-C(mg/dl)`,
            key: `LDLC`,
        },
    ],
    Lists: [],
}

// export type BrftrCmprTableListItemInterface = BrftrCmprListInterface

// 전후비교 현황 테이블 데이터
export interface BrftrCmprTableListItemInterface {
    MBER_NO: number
    TG_3: null | string
    TG_2: null | string
    TG_1: null | string
    TG_0: null | string
    WAIST_0: null | number
    WAIST_1: null | number
    WAIST_2: null | number
    WAIST_3: null | number
    BP_MESURE_DT_3: null | string
    BP_MESURE_DT_2: null | string
    BP_MESURE_DT_1: null | string
    BP_MESURE_DT_0: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    FBS_MESURE_DT_0: null | string
    FBS_MESURE_DT_1: null | string
    FBS_MESURE_DT_MESURE_DT_2: null | string
    FBS_MESURE_DT_MESURE_DT_3: null | string
    HDLC_0: null | number
    HDLC_1: null | number
    HDLC_2: null | number
    HDLC_3: null | number
    BP_3: null | number
    BP_2: null | number
    BP_1: null | number
    BP_0: null | number
    TG_MESURE_DT_0: null | string
    TG_MESURE_DT_1: null | string
    TG_MESURE_DT_2: null | string
    TG_MESURE_DT_3: null | string
    FBS_0: null | number
    FBS_1: null | number
    FBS_2: null | number
    FBS_3: null | number
    HDLC_MESURE_DT_0: null | string
    HDLC_MESURE_DT_1: null | string
    HDLC_MESURE_DT_2: null | string
    HDLC_MESURE_DT_3: null | string
    WAIST_MESURE_DT_0: null | string
    WAIST_MESURE_DT_1: null | string
    WAIST_MESURE_DT_2: null | string
    WAIST_MESURE_DT_3: null | string
    NM: string
}

// 전후비교 현황 테이블 데이터 설정
export const BrftrCmprTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `회원번호`,
            key: `MBER_NO`,
        },
        {
            name: `회원명`,
            key: `NM`,
        },
        {
            name: `생년월일`,
            key: `BRTHDY`,
        },
        {
            name: `성별`,
            key: `SEXDSTN`,
        },
        {
            name: `허리둘레(최초)`,
            key: `WAIST_0`,
        },
        {
            name: `허리둘레(최근1)`,
            key: `WAIST_1`,
        },
        {
            name: `허리둘레(최근2)`,
            key: `WAIST_2`,
        },
        {
            name: `허리둘레(최근3)`,
            key: `WAIST_3`,
        },
        {
            name: `허리둘레DT(최초)`,
            key: `WAIST_MESURE_DT_0`,
        },
        {
            name: `허리둘레DT(최근1)`,
            key: `WAIST_MESURE_DT_1`,
        },
        {
            name: `허리둘레DT(최근2)`,
            key: `WAIST_MESURE_DT_2`,
        },
        {
            name: `허리둘레DT(최근3)`,
            key: `WAIST_MESURE_DT_3`,
        },
        {
            name: `혈압(최초)`,
            key: `BP_0`,
        },
        {
            name: `혈압(최근1)`,
            key: `BP_1`,
        },
        {
            name: `혈압(최근2)`,
            key: `BP_2`,
        },
        {
            name: `혈압(최근3)`,
            key: `BP_3`,
        },
        {
            name: `혈압DT(최초)`,
            key: `BP_MESURE_DT_0`,
        },
        {
            name: `혈압DT(최근1)`,
            key: `BP_MESURE_DT_1`,
        },
        {
            name: `혈압DT(최근2)`,
            key: `BP_MESURE_DT_2`,
        },
        {
            name: `혈압DT(최근3)`,
            key: `BP_MESURE_DT_3`,
        },
        {
            name: `식전혈당(최초)`,
            key: `FBS_0`,
        },
        {
            name: `식전혈당(최근1)`,
            key: `FBS_1`,
        },
        {
            name: `식전혈당(최근2)`,
            key: `FBS_2`,
        },
        {
            name: `식전혈당(최근3)`,
            key: `FBS_3`,
        },
        {
            name: `식전혈당DT(최초)`,
            key: `FBS_MESURE_DT_0`,
        },
        {
            name: `식전혈당DT(최근1)`,
            key: `FBS_MESURE_DT_1`,
        },
        {
            name: `식전혈당DT(최근2)`,
            key: `FBS_MESURE_DT_MESURE_DT_2`,
        },
        {
            name: `식전혈당DT(최근3)`,
            key: `FBS_MESURE_DT_MESURE_DT_3`,
        },
        {
            name: `중성지방(최초)`,
            key: `TG_0`,
        },
        {
            name: `중성지방(최근1)`,
            key: `TG_1`,
        },
        {
            name: `중성지방(최근2)`,
            key: `TG_2`,
        },
        {
            name: `중성지방(최근3)`,
            key: `TG_3`,
        },
        {
            name: `중성지방DT(최초)`,
            key: `TG_MESURE_DT_0`,
        },
        {
            name: `중성지방DT(최근1)`,
            key: `TG_MESURE_DT_1`,
        },
        {
            name: `중성지방DT(최근2)`,
            key: `TG_MESURE_DT_2`,
        },
        {
            name: `중성지방DT(최근3)`,
            key: `TG_MESURE_DT_3`,
        },
        {
            name: `HDLC(최초)`,
            key: `HDLC_0`,
        },
        {
            name: `HDLC(최근1)`,
            key: `HDLC_1`,
        },
        {
            name: `HDLC(최근2)`,
            key: `HDLC_2`,
        },
        {
            name: `HDLC(최근3)`,
            key: `HDLC_3`,
        },
        {
            name: `HDLCDT(최초)`,
            key: `HDLC_MESURE_DT_0`,
        },
        {
            name: `HDLCDT(최근1)`,
            key: `HDLC_MESURE_DT_1`,
        },
        {
            name: `HDLCDT(최근2)`,
            key: `HDLC_MESURE_DT_2`,
        },
        {
            name: `HDLCDT(최근3)`,
            key: `HDLC_MESURE_DT_3`,
        },
    ],
    Lists: [],
}

// 기기측정 현황 테이블 데이터
export interface StatisticsTableListItemInterface {
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

// 테이블 설정.
export const StatisticsTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `회원번호`,
            key: `MBER_NO`,
        },
        {
            name: `회원명`,
            key: `NM`,
        },
        {
            name: `생년월일`,
            key: `BRTHDY`,
        },
        {
            name: `성별`,
            key: `SEXDSTN`,
        },
        {
            name: `체중(kg)`,
            key: `WEIGHT`,
        },
        {
            name: `BMI(kg/m²)`,
            key: `BMI`,
        },
        {
            name: `체지방률(%)`,
            key: `FAT_MAS`,
        },
        {
            name: `체지방량(kg)`,
            key: `WAIST_3`,
        },
        {
            name: `근육량(kg)`,
            key: `WAIST_MESURE_DT_0`,
        },
        {
            name: `추정골량(kg)`,
            key: `WAIST_MESURE_DT_1`,
        },
        {
            name: `내장지방(level)`,
            key: `WAIST_MESURE_DT_2`,
        },
        {
            name: `수축기(mmHg)`,
            key: `WAIST_MESURE_DT_3`,
        },
        {
            name: `이완기(mmHg)`,
            key: `BP_0`,
        },
        {
            name: `맥박(bpm)`,
            key: `BP_1`,
        },
        {
            name: `공복(mg/dl)`,
            key: `BP_2`,
        },
        {
            name: `식후(mg/dl)`,
            key: `BP_3`,
        },
        {
            name: `TC(mg/dl)`,
            key: `BP_MESURE_DT_0`,
        },
        {
            name: `TG(mg/dl)`,
            key: `BP_MESURE_DT_1`,
        },
        {
            name: `HDL-C(mg/dl)`,
            key: `BP_MESURE_DT_2`,
        },
        {
            name: `LDL-C(mg/dl)`,
            key: `BP_MESURE_DT_3`,
        },
        {
            name: `점수(점)`,
            key: `FBS_0`,
        },
        {
            name: `정신적(단계)`,
            key: `FBS_1`,
        },
        {
            name: `신체적(단계)`,
            key: `FBS_2`,
        },
        {
            name: `대처능력(단계)`,
            key: `FBS_3`,
        },
        {
            name: `혈관(단계)`,
            key: `FBS_MESURE_DT_0`,
        },
        {
            name: `박출강도(단계)`,
            key: `FBS_MESURE_DT_1`,
        },
        {
            name: `탄성도(단계)`,
            key: `FBS_MESURE_DT_MESURE_DT_2`,
        },
        {
            name: `잔혈량(단계)`,
            key: `FBS_MESURE_DT_MESURE_DT_3`,
        },
        {
            name: `신장(cm)`,
            key: `TG_0`,
        },
        {
            name: `체온(°c)`,
            key: `TG_1`,
        },
        {
            name: `허리둘레(cm)`,
            key: `TG_2`,
        },
    ],
    Lists: [],
}
