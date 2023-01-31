import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    MemberAnalyticsAgeListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
    MesureAgeListItemInterface,
    MesurePeriodListItemInterface,
    DeviceAgeListItemInterface,
    DevicePeriodListItemInterface,
    RiskFctrItemsAgeListItemInterface,
    RiskFctrItemsPeriodListItemInterface,
    RiskFctrCountAgeListItemInterface,
    RiskFctrCountPeriodListItemInterface,
    ImprvmAgeListItemInterface,
} from '@Type/AnalyticsTypes'

/**
 * 회원통계
 */
export function getMemberAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    INST_NO,
    BGNDE,
    ENDDE,
}: {
    // CUR_PAGE: number
    INST_NO: string
    // SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: MemberAnalyticsAgeListItemInterface[]
        PERIOD_STAT_LIST: MemberAnalyticsPeriodListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/mber',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 측정 이용자 통계
 */
export function getMesureAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    // CUR_PAGE: number
    INST_NO: string | null
    // SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: MesureAgeListItemInterface[]
        PERIOD_STAT_LIST: MesurePeriodListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/mesure_mber',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 기기사용 통계
 */
export function getDeviceAnalyticsList({
    // CUR_PAGE,
    INST_NO,
    // SEARCH_KEY,
    BGNDE,
    ENDDE,
}: {
    // CUR_PAGE: number
    INST_NO: string | null
    // SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: DeviceAgeListItemInterface[]
        PERIOD_STAT_LIST: DevicePeriodListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/device_use',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 위험요인 항목별 통계
 */
export function getRiskFctrItemsAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    // CUR_PAGE: number
    INST_NO: string | null
    // SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: RiskFctrItemsAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrItemsPeriodListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/risk_fctr/ty',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 위험요인 갯수별 통계
 */
export function getRiskFctrCountAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    // CUR_PAGE: number
    INST_NO: string | null
    // SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: RiskFctrCountAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrCountPeriodListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/risk_fctr/cnt',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 건강지표 개선통계
 */
export function getImprvmCountAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    // BGNDE,
    // ENDDE,
    INST_NO,
}: {
    // CUR_PAGE: number
    INST_NO: string | null
    // SEARCH_KEY: string
    // BGNDE: string
    // ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        MYBODY_SCORE_IMPRVM_STAT_LIST: ImprvmAgeListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/gndn/stat/v1/mybody_score/imprvm',
        payload: {
            INST_NO,
            // SEARCH_KEY,
            // BGNDE,
            // ENDDE,
        },
    })
}
