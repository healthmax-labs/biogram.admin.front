import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    MemberAnalyticsAgeListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
} from '@Type/AnalyticsTypes'

/**
 * 회원통계
 */
export function getMemberAnalyticsList({
    // CUR_PAGE,
    // SEARCH_KEY,
    // BGNDE,
    // ENDDE,
    INST_NO,
}: {
    // CUR_PAGE: number
    INST_NO: string
    // SEARCH_KEY: string
    // BGNDE: string
    // ENDDE: string
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
            // BGNDE,
            // ENDDE,
        },
    })
}
