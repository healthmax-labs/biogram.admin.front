//회원 연령별 통계
export interface MemberAnalyticsAgeListItemInterface {
    AGES_GROUP: string //연령대
    TOT_MAN_CNT: number
    NEW_WOMAN_CNT: number
    NEW_MBER_CNT: number
    NEW_MAN_CNT: number
    TOT_WOMAN_CNT: number
    DEL_MBER_CNT: number
    DEL_WOMAN_CNT: number
    TOT_MBER_CNT: number
    DEL_MAN_CNT: number
}

//회원 기간별 통계
export interface MemberAnalyticsPeriodListItemInterface {
    TOT_MAN_CNT: number
    TOT_WOMAN_CNT: number // FIXME: api payload 에 필드가 없음
    NEW_WOMAN_CNT: number
    PERIOD: string
    NEW_MBER_CNT: number
    NEW_MAN_CNT: number
    DEL_MBER_CNT: number
    TOT_MBER_CNT: number
    DEL_MAN_CNT: number
    DEL_WOMAN_CNT: number
}

export interface AnalyticsMemberListInterface {
    AGE_GROUP_STAT_LIST: MemberAnalyticsAgeListItemInterface[]
    PERIOD_STAT_LIST: MemberAnalyticsPeriodListItemInterface[]
}

//측정이용자 연령별 통계
export interface MesureAgeListItemInterface {
    AGE_GROUP: string
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
    TOT_MAN_CNT: number
    TOT_MBER_CNT: number
    TOT_WOMAN_CNT: number
}

//측정이용자 기간별 통계
export interface MesurePeriodListItemInterface {
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
    RF_622E_BD_CNT: string
    RF_622E_GD_CNT: string
    RF_622E_TT_CNT: string
    RF_624A_BD_CNT: string
    RF_624A_GD_CNT: string
    RF_624A_TT_CNT: string
    RF_624D_BD_CNT: string
    RF_624D_GD_CNT: string
    RF_624D_TT_CNT: string
    RF_624E_BD_CNT: string
    RF_624E_GD_CNT: string
    RF_624E_TT_CNT: string
    RF_8072_BD_CNT: string
    RF_8072_GD_CNT: string
    RF_8072_TT_CNT: string
    RF_AGE_GROUP: string
    RF_ALL_TT_CNT: string
}

//위험요인 항목별 기간 통계
export interface RiskFctrItemsPeriodListItemInterface {
    RF_PERIOD: string
    RF_ALL_TT_CNT: string
    RF_622E_TT_CNT: string //혈압 전체
    RF_622E_GD_CNT: string //혈압 정상
    RF_622E_BD_CNT: string //혈압 위험
    RF_8072_TT_CNT: string //허리둘레 전체
    RF_8072_GD_CNT: string //허리둘레 정상
    RF_8072_BD_CNT: string //허리둘레 위험
    RF_624A_TT_CNT: string //식전혈당 전체
    RF_624A_GD_CNT: string //식전혈당 정상
    RF_624A_BD_CNT: string //식전혈당 위험
    RF_624D_TT_CNT: string //중성지방 전체
    RF_624D_GD_CNT: string //중성지방 정상
    RF_624D_BD_CNT: string //중성지방 위험
    RF_624E_TT_CNT: string //HDLC 전체
    RF_624E_GD_CNT: string //HDLC 정상
    RF_624E_BD_CNT: string //HDLC 위험
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
    RF_PERIOD: string
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
    AGES_GROUP: string
    TT_WAIST_SCORE: string
    IW_WAIST_SCORE: string
    OW_WAIST_SCORE: string
    TT_BP_SCORE: string
    IW_BP_SCORE: string
    OW_BP_SCORE: string
    TT_FBS_SCORE: string
    IW_FBS_SCORE: string
    OW_FBS_SCORE: string
    TT_TG_SCORE: string
    IW_TG_SCORE: string
    OW_TG_SCORE: string
    TT_HDLC_SCORE: string
    IW_HDLC_SCORE: string
    OW_HDLC_SCORE: string
    TT_TOT_SCORE: string
    IW_TOT_SCORE: string
    OW_TOT_SCORE: string
}
