export interface MemberInfoItemInterface {
    TT_CNT: number
    TD_CNT: number
    SEARCH_DE: string
}

// 회훤 현황
export interface MemberInfoInterface {
    MBER_INFO_LIST: MemberInfoItemInterface[]
}

export interface MemberGenderItemInterface {
    SEXDSTN: '남' | '여'
    TT_TOT_RATE: number
    TT_TOT_CNT: number
    TD_TOT_CNT: number
}

// 성별 회훤 현황
export interface MemberGenderInterface {
    MBER_INFO_LIST: MemberGenderItemInterface[]
}

export interface MemberAgesGroupItemInterface {
    TT_TOT_RATE: number
    AGES_GROUP: number
    TT_TOT_CNT: number
    TD_TOT_CNT: number
}

// 연령별 회원 현황
export interface MemberAgesGroupInterface {
    MBER_INFO_LIST: MemberAgesGroupItemInterface[]
}

// 위험 요인 현황
export interface RiskFctrListITemInterface {
    CNT_TY: 'TT' | 'TY'
    RISK_CNT: number
}

export interface RiskFctrListInterface {
    RISK_FCTR_LIST: RiskFctrListITemInterface[]
}

// 위험 요인별 현황
export interface FctrFctrGroupListItemInterface {
    TT_CNT: number
    TD_CNT: number
    MESURE_CODE: string
}

export interface FctrFctrGroupListInterface {
    RISK_FCTR_LIST: FctrFctrGroupListItemInterface[]
}

// 위험군 휴면 현황
export interface RiskGroupDormantMemberItemInterface {
    TT_CNT: 0
    MESURE_CODE: '8072'
}

export interface RiskGroupDormantMemberInterface {
    RISK_GROUP_LIST: RiskGroupDormantMemberItemInterface[]
}

// 측정 현황
export interface MesureInfoItemInterface {
    MESURE_DE: string
    TT_CNT: number
    TD_CNT: number
}

export interface MesureInfoInterface {
    MESURE_INFO_LIST: MesureInfoItemInterface[]
}

// 존 측정 현황
export interface MesureInfoZoneItemInterface {
    MESURE_CNT: number
    CNT_TY: string
}

export interface MesureInfoZoneInterface {
    MESURE_INFO_LIST: MesureInfoZoneItemInterface[]
}

// 존 기기별 측정현황
export interface MesureInfoZoneDeviceItemInterface {
    MT_CNT: number
    TD_CNT: number
    MESURE_TY: string
}

export interface MesureInfoZoneDeviceInterface {
    MESURE_INFO_LIST: MesureInfoZoneDeviceItemInterface[]
}

// 건강 개선률
export interface MybodyScoreImprvmItemInterface {
    IW_SCORE: number
    NW_CNT: number
    OW_SCORE: number
    AGES_GROUP: number
    OW_CNT: number
    NW_SCORE: number
    IW_CNT: number
}

export interface MybodyScoreImprvmInterface {
    MYBODY_SCORE_IMPRVM_LIST: MybodyScoreImprvmItemInterface[]
}
