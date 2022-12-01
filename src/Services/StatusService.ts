import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { BrftrCmprListItemInterface } from '@Type/StatusTypes'
import { RiskFctrListItemInterface } from '@Type/StatusTypes'
import { StatisticsListItemInterface } from '@Type/StatusTypes'

/**
 * 전후비교 현황 리스트
 */
export function getBrftrCmprList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BGNDE,
    ENDDE,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        MESURE_BRFTR_CMPR_INFO_LIST: BrftrCmprListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/mesure/brftr_cmpr/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 위험요인 현황 리스트
 */
export function getRiskFctrList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BGNDE,
    ENDDE,
    RISK_FCTR_CNT,
    RISK_FCTR,
    TAKNG_MDCIN,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
    RISK_FCTR_CNT: string
    RISK_FCTR: string
    TAKNG_MDCIN: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        RISK_FCTR_INFO_LIST: RiskFctrListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/risk_fctr/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BGNDE,
            ENDDE,
            RISK_FCTR_CNT,
            RISK_FCTR,
            TAKNG_MDCIN,
        },
    })
}

/**
 * 기기측정 현황 리스트
 */
export function getStatisticsList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BEGIN_DE,
    END_DE,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    BEGIN_DE: string
    END_DE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        DEVICE_MESURE_INFO_LIST: StatisticsListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/device_mesure/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BEGIN_DE,
            END_DE,
        },
    })
}
