//회원 연령별 통계
export interface MemberAnalyticsAgeListItemInterface {
    AGE_GROUP: string //연령대
    TOT_MAN_CNT: string
    NEW_WOMAN_CNT: string
    NEW_MBER_CNT: string
    NEW_MAN_CNT: string
    TOT_WOMAN_CNT: string
    DEL_MBER_CNT: string
    DLE_WOMAN_CNT: string
    TOT_MBER_CNT: string
    DEL_MAN_CNT: string
}

//회원 기간별 통계
export interface MemberAnalyticsPeriodListItemInterface {
    PERIOD: string //기간
    TOT_MBER_CNT: string //전체 건수
    TOT_WOMAN_CNT: string //전체 여성 건수
    TOT_MAN_CNT: string //전체 남성 건수
    NEW_MBER_CNT: string //신규 전체 건수
    NEW_WOMAN_CNT: string //신규 여성 건수
    NEW_MAN_CNT: string //신규 남성 건수
    DEL_MBER_CNT: string //삭제 전체 건수
    DLE_WOMAN_CNT: string //삭제 여성 건수
    DEL_MAN_CNT: string //삭제 남성 건수
}
