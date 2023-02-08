import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    DeviceAgeListItemInterface,
    DevicePeriodListItemInterface,
    ImprvmAgeListItemInterface,
    MemberAnalyticsAgeListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
    MesureAgeListItemInterface,
    MesurePeriodListItemInterface,
    RiskFctrCountAgeListItemInterface,
    RiskFctrCountPeriodListItemInterface,
    RiskFctrItemsAgeListItemInterface,
    RiskFctrItemsPeriodListItemInterface,
} from '@Type/AnalyticsTypes'
import _ from 'lodash'

/**
 * 회원통계
 */
export function getMemberAnalyticsList({
    INST_NO,
    BGNDE,
    ENDDE,
}: {
    INST_NO: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: MemberAnalyticsAgeListItemInterface[]
        PERIOD_STAT_LIST: MemberAnalyticsPeriodListItemInterface[]
    }>
> {
    let payload: {
        INST_NO?: string
        BGNDE: string
        ENDDE: string
    } = {
        INST_NO: INST_NO,
        BGNDE: BGNDE,
        ENDDE: ENDDE,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'BGNDE', 'ENDDE')
    }

    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/mber',
        payload: payload,
    })
}

/**
 * 측정 이용자 통계
 */
export function getMesureAnalyticsList({
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    INST_NO: string | null
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: MesureAgeListItemInterface[]
        PERIOD_STAT_LIST: MesurePeriodListItemInterface[]
    }>
> {
    let payload: {
        INST_NO?: string | null
        BGNDE: string
        ENDDE: string
    } = {
        INST_NO: INST_NO,
        BGNDE: BGNDE,
        ENDDE: ENDDE,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'BGNDE', 'ENDDE')
    }

    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/mesure_mber',
        payload: payload,
    })
}

/**
 * 기기사용 통계
 */
export function getDeviceAnalyticsList({
    INST_NO,
    BGNDE,
    ENDDE,
}: {
    INST_NO: string | null
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: DeviceAgeListItemInterface[]
        PERIOD_STAT_LIST: DevicePeriodListItemInterface[]
    }>
> {
    let payload: {
        INST_NO?: string | null
        BGNDE: string
        ENDDE: string
    } = {
        INST_NO: INST_NO,
        BGNDE: BGNDE,
        ENDDE: ENDDE,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'BGNDE', 'ENDDE')
    }

    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/device_use',
        payload: payload,
    })
}

/**
 * 위험요인 항목별 통계
 */
export function getRiskFctrItemsAnalyticsList({
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    INST_NO: string | null
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: RiskFctrItemsAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrItemsPeriodListItemInterface[]
    }>
> {
    let payload: {
        INST_NO?: string | null
        BGNDE: string
        ENDDE: string
    } = {
        INST_NO: INST_NO,
        BGNDE: BGNDE,
        ENDDE: ENDDE,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'BGNDE', 'ENDDE')
    }

    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/risk_fctr/ty',
        payload: payload,
    })
}

/**
 * 위험요인 갯수별 통계
 */
export function getRiskFctrCountAnalyticsList({
    BGNDE,
    ENDDE,
    INST_NO,
}: {
    INST_NO: string | null
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        AGE_GROUP_STAT_LIST: RiskFctrCountAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrCountPeriodListItemInterface[]
    }>
> {
    let payload: {
        INST_NO?: string | null
        BGNDE: string
        ENDDE: string
    } = {
        INST_NO: INST_NO,
        BGNDE: BGNDE,
        ENDDE: ENDDE,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'BGNDE', 'ENDDE')
    }

    return _Axios_({
        method: 'post',
        url: '/mng/stat/v1/risk_fctr/cnt',
        payload: payload,
    })
}

/**
 * 건강지표 개선통계
 */
export function getImprvmCountAnalyticsList({
    INST_NO,
}: {
    INST_NO: string | null
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
        },
    })
}
