// 회원 테이블 데이터
export interface tableListItemInterface {
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
