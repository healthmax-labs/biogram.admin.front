import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    MemberAnalyticsAgeListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
} from '@Type/AnalyticsTypes'
// import { getNowDate, getOneMonthAgo } from '@Helper'

/**
 * Analytics 페이지.
 */

//회원통계
interface MberAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        // BGNDE: string
        // ENDDE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: MemberAnalyticsAgeListItemInterface[]
        PERIOD_STAT_LIST: MemberAnalyticsPeriodListItemInterface[]
    } | null
}

export const MberAnalyticsListState = atom<MberAnalyticsListInterface>({
    key: `analyticsPage/member-analytics-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: null,
            // BGNDE: getOneMonthAgo(),
            // ENDDE: getNowDate(),
        },
        list: null,
    },
})
