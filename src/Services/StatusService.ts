import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    BrftrCmprListItemInterface,
    WalkRankingListItemInterface,
    RiskFctrListItemInterface,
    StatisticsListItemInterface,
    ActivityWalkListItemInterface,
    NonMeasureListItemInterface,
    HealthIndicatorsListItemInterface,
} from '@Type/StatusTypes'

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
    MESURE_CODE,
    BEGIN_DE,
    END_DE,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    MESURE_CODE: string
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
            MESURE_CODE,
            BEGIN_DE,
            END_DE,
        },
    })
}

/**
 * 활동량 현황 리스트
 */
export function getActivityWalkList({
    curPage,
    INST_NO,
    SEARCH,
    BEGIN_DE,
    END_DE,
}: {
    curPage: number
    INST_NO: string
    SEARCH: string
    BEGIN_DE: string
    END_DE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        ACTIVITY_STATE_LIST: ActivityWalkListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/activity_walk/' + curPage,
        payload: {
            INST_NO,
            SEARCH,
            BEGIN_DE,
            END_DE,
        },
    })
}

/**
 * 미측정 현황 리스트
 */
export function getNonMeasureList({
    INST_NO,
    MESURE_DT,
    BP_NTCN_AT,
    BS_NTCN_AT,
    BC_NTCN_AT,
    HA_NTCN_AT,
    IS_NTCN_AT,
    SR_NTCN_AT,
    SB_NTCN_AT,
    AND_AT,
    cur_page,
    SEARCH_KEY,
}: {
    INST_NO: string | null
    MESURE_DT: string
    BP_NTCN_AT: string
    BS_NTCN_AT: string
    BC_NTCN_AT: string
    HA_NTCN_AT: string
    IS_NTCN_AT: string
    SR_NTCN_AT: string
    SB_NTCN_AT: string
    AND_AT: string
    cur_page: number
    SEARCH_KEY: string | null
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        NOT_MESURE_NTCN_INFO_LIST: NonMeasureListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/gndn/v1/not_mesure/ntcn/' + cur_page,
        payload: {
            INST_NO,
            MESURE_DT,
            BP_NTCN_AT,
            BS_NTCN_AT,
            BC_NTCN_AT,
            HA_NTCN_AT,
            IS_NTCN_AT,
            SR_NTCN_AT,
            SB_NTCN_AT,
            AND_AT,
            SEARCH_KEY,
            NOT_MESURE_NTCN_INFO_LIST: [],
        },
    })
}

/**
 * 건강개선지표 현황 리스트
 */
export function getHealthIndicatorsList({
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
        MYBODY_SCORE_IMPRVM_INFO_LIST: HealthIndicatorsListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/gndn/v1/mybody_score/imprvm/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

/**
 * 보행수 랭킹 현황 리스트
 */
export function getWalkRankingList({
    CUR_PAGE,
    INST_NO,
    // SEARCH_KEY,
    // BGNDE,
    MESURE_MT,
}: {
    CUR_PAGE: number
    INST_NO: string
    // SEARCH_KEY: string
    // BGNDE: string
    MESURE_MT: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        STEP_RANK_INFO_LIST: WalkRankingListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/gndn/v1/step_rank/' + CUR_PAGE,
        payload: {
            INST_NO,
            // SEARCH_KEY,
            // BGNDE,
            MESURE_MT,
        },
    })
}
