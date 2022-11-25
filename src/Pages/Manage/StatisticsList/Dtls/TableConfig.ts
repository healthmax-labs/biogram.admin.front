// 회원 테이블 데이터
export interface tableListItemInterface {
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
export const TableConfig = {
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
