import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { RiskFctrListItemInterface } from '@Type/RiskFctrTypes'

/**
 * 위험요인현황 리스트
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
    INST_NO: number
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
