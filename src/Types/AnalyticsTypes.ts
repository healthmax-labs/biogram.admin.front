//회원 연령별 통계
export interface MemberAnalyticsAgeListItemInterface {
    AGES_GROUP: number
    DEL_MAN_CNT: number
    DEL_WOMAN_CNT: number
    NEW_MAN_CNT: number
    NEW_WOMAN_CNT: number
    TOT_MAN_CNT: number
    TOT_MBER_CNT: number
    TOT_WOMAN_CNT: number
}

//회원 기간별 통계
export interface MemberAnalyticsPeriodListItemInterface {
    CYCLE_GUBUN: string
    DEL_MAN_CNT: number
    DEL_WOMAN_CNT: number
    NEW_MAN_CNT: number
    NEW_WOMAN_CNT: number
    TOT_MAN_CNT: number
    TOT_MBER_CNT: number
    TOT_WOMAN_CNT: number
}

//측정이용자 연령별 통계
export interface MesureAgeListItemInterface {
    AGE_GROUP: number
    BC_MAN_CNT: number
    BC_MBER_CNT: number
    BC_WOMAN_CNT: number
    BD_MAN_CNT: number
    BD_MBER_CNT: number
    BD_WOMAN_CNT: number
    BP_MAN_CNT: number
    BP_MBER_CNT: number
    BP_WOMAN_CNT: number
    BS_MAN_CNT: number
    BS_MBER_CNT: number
    BS_WOMAN_CNT: number
    HT_MAN_CNT: number
    HT_MBER_CNT: number
    HT_WOMAN_CNT: number
    IS_MAN_CNT: number
    IS_MBER_CNT: number
    IS_WOMAN_CNT: number
    ST_MAN_CNT: number
    ST_MBER_CNT: number
    ST_WOMAN_CNT: number
    SUM_MAN_CNT: number
    SUM_MBER_CNT: number
    SUM_WOMAN_CNT: number
}

//측정이용자 기간별 통계
export interface MesurePeriodListItemInterface {
    BC_MAN_CNT: number
    BC_MBER_CNT: number
    BC_WOMAN_CNT: number
    BD_MAN_CNT: number
    BD_MBER_CNT: number
    BD_WOMAN_CNT: number
    BP_MAN_CNT: number
    BP_MBER_CNT: number
    BP_WOMAN_CNT: number
    BS_MAN_CNT: number
    BS_MBER_CNT: number
    BS_WOMAN_CNT: number
    CYCLE_GUBUN: string
    HT_MAN_CNT: number
    HT_MBER_CNT: number
    HT_WOMAN_CNT: number
    IS_MAN_CNT: number
    IS_MBER_CNT: number
    IS_WOMAN_CNT: number
    ST_MAN_CNT: number
    ST_MBER_CNT: number
    ST_WOMAN_CNT: number
    SUM_MAN_CNT: number
    SUM_MBER_CNT: number
    SUM_WOMAN_CNT: number
}

//기기사용 연령별 통계
export interface DeviceAgeListItemInterface {
    ST_MBER_CNT: string
    BD_WOMAN_CNT: string
    BS_MAN_CNT: string
    BD_MBER_CNT: string
    BD_MAN_CNT: string
    ST_WOMAN_CNT: string
    HT_MBER_CNT: string
    BC_MAN_CNT: string
    TOT_MBER_CNT: string
    BP_MBER_CNT: string
    BP_MAN_CNT: string
    ST_MAN_CNT: string
    BS_MBER_CNT: string
    TOT_WOMAN_CNT: string
    HT_WOMAN_CNT: string
    BP_WOMAN_CNT: string
    BC_MBER_CNT: string
    HT_MAN_CNT: string
    TOT_MAN_CNT: string
    BC_WOMAN_CNT: string
    BS_WOMAN_CNT: string
    IS_MBER_CNT: string
    AGE_GROUP: string
    IS_WOMAN_CNT: string
    IS_MAN_CNT: string
}

//기기사용 기간별 통계
export interface DevicePeriodListItemInterface {
    ST_MBER_CNT: string
    BD_WOMAN_CNT: string
    BS_MAN_CNT: string
    BD_MBER_CNT: string
    BD_MAN_CNT: string
    ST_WOMAN_CNT: string
    HT_MBER_CNT: string
    BC_MAN_CNT: string
    TOT_MBER_CNT: string
    BP_MBER_CNT: string
    BP_MAN_CNT: string
    ST_MAN_CNT: string
    BS_MBER_CNT: string
    TOT_WOMAN_CNT: string
    HT_WOMAN_CNT: string
    BP_WOMAN_CNT: string
    BC_MBER_CNT: string
    HT_MAN_CNT: string
    TOT_MAN_CNT: string
    BC_WOMAN_CNT: string
    BS_WOMAN_CNT: string
    IS_MBER_CNT: string
    PERIOD: string
    IS_WOMAN_CNT: string
    IS_MAN_CNT: string
}

//위험요인 항목별 연령대 통계
export interface RiskFctrItemsAgeListItemInterface {
    AGE_GROUP: number
    FBS_RISK_NO_CNT: number
    FBS_RISK_YES_CNT: number
    FBS_TOT_CNT: number
    HDLC_MAN_CNT: number
    HDLC_RISK_NO_CNT: number
    HDLC_RISK_YES_CNT: number
    HDLC_TOT_CNT: number
    SUM_CNT: number
    SYSTOLIC_RISK_NO_CNT: number
    SYSTOLIC_RISK_YES_CNT: number
    SYSTOLIC_TOT_CNT: number
    TG_RISK_NO_CNT: number
    TG_RISK_YES_CNT: number
    TG_TOT_CNT: number
    WAIST_CRCMFRNC_RISK_NO_CNT: number
    WAIST_CRCMFRNC_RISK_YES_CNT: number
    WAIST_CRCMFRNC_TOT_CNT: number
}

//위험요인 항목별 기간 통계
export interface RiskFctrItemsPeriodListItemInterface {
    CYCLE_GUBUN: string
    FBS_RISK_NO_CNT: string
    FBS_RISK_YES_CNT: string
    FBS_TOT_CNT: string
    HDLC_RISK_NO_CNT: string
    HDLC_RISK_YES_CNT: string
    HDLC_TOT_CNT: string
    RES_RISK_NO_CNT_TEXT: number
    RES_RISK_YES_CNT_TEXT: number
    RES_TOT_CNT: number
    SUM_CNT: string
    SYSTOLIC_RISK_NO_CNT: string
    SYSTOLIC_RISK_YES_CNT: string
    SYSTOLIC_TOT_CNT: string
    TG_RISK_NO_CNT: string
    TG_RISK_YES_CNT: string
    TG_TOT_CNT: string
    WAIST_CRCMFRNC_RISK_NO_CNT: string
    WAIST_CRCMFRNC_RISK_YES_CNT: string
    WAIST_CRCMFRNC_TOT_CNT: string
}

//위험요인 개수별 연령대 통계
export interface RiskFctrCountAgeListItemInterface {
    RF_AGE_GROUP: string
    RF_ALL_MBER_CNT: string //전체 건수
    RF_ALL_WOMAN_CNT: string //전체 여성 건수
    RF_ALL_MAN_CNT: string //전체 남성 건수
    RF_1_MBER_CNT: string //1개 전체 건수
    RF_1_WOMAN_CNT: string //1개 여성 건수
    RF_1_MAN_CNT: string //1개 남성 건수
    RF_2_MBER_CNT: string //2개 전체 건수
    RF_2_WOMAN_CNT: string //2개 여성 건수
    RF_2_MAN_CNT: string //2개 남성 건수
    RF_3_MBER_CNT: string //3개 전체 건수
    RF_3_WOMAN_CNT: string //3개 여성 건수
    RF_3_MAN_CNT: string //3개 남성 건수,
    RF_4_MBER_CNT: string //4개 전체 건수
    RF_4_WOMAN_CNT: string //4개 여성 건수
    RF_4_MAN_CNT: string //4개 남성 건수
    RF_5_MBER_CNT: string //5개 전체 건수
    RF_5_WOMAN_CNT: string //5개 여성 건수
    RF_5_MAN_CNT: string //5개 남성 건수
}

//위험요인 개수별 기간 통계
export interface RiskFctrCountPeriodListItemInterface {
    PERIOD: string
    RF_ALL_MBER_CNT: string //전체 건수
    RF_ALL_WOMAN_CNT: string //전체 여성 건수
    RF_ALL_MAN_CNT: string //전체 남성 건수
    RF_1_MBER_CNT: string //1개 전체 건수
    RF_1_WOMAN_CNT: string //1개 여성 건수
    RF_1_MAN_CNT: string //1개 남성 건수
    RF_2_MBER_CNT: string //2개 전체 건수
    RF_2_WOMAN_CNT: string //2개 여성 건수
    RF_2_MAN_CNT: string //2개 남성 건수
    RF_3_MBER_CNT: string //3개 전체 건수
    RF_3_WOMAN_CNT: string //3개 여성 건수
    RF_3_MAN_CNT: string //3개 남성 건수,
    RF_4_MBER_CNT: string //4개 전체 건수
    RF_4_WOMAN_CNT: string //4개 여성 건수
    RF_4_MAN_CNT: string //4개 남성 건수
    RF_5_MBER_CNT: string //5개 전체 건수
    RF_5_WOMAN_CNT: string //5개 여성 건수
    RF_5_MAN_CNT: string //5개 남성 건수
}

//건강지표 개선 연령별 통계
export interface ImprvmAgeListItemInterface {
    AGES_GROUP: number
    IW_BP_SCORE: number
    IW_FBS_SCORE: number
    IW_HDLC_SCORE: number
    IW_TG_SCORE: number
    IW_TOT_SCORE: number
    IW_WAIST_SCORE: number
    OW_BP_SCORE: number
    OW_FBS_SCORE: number
    OW_HDLC_SCORE: number
    OW_TG_SCORE: number
    OW_TOT_SCORE: number
    OW_WAIST_SCORE: number
}
