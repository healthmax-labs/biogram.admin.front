import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    DeviceAgeListItemInterface,
    DevicePeriodListItemInterface,
    MemberAnalyticsAgeListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
    MesureAgeListItemInterface,
    MesurePeriodListItemInterface,
    RiskFctrCountAgeListItemInterface,
    RiskFctrCountPeriodListItemInterface,
    RiskFctrItemsAgeListItemInterface,
    RiskFctrItemsPeriodListItemInterface,
    ImprvmAgeListItemInterface,
} from '@Type/AnalyticsTypes'
import { getNowDate, getOneMonthAgo } from '@Helper'

/**
 * Analytics 페이지.
 */

//회원통계
interface MberAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
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
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: null,
    },
})

//측정이용자 통계
interface MesureAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: MesureAgeListItemInterface[]
        PERIOD_STAT_LIST: MesurePeriodListItemInterface[]
    } | null
}

export const MesureAnalyticsListState = atom<MesureAnalyticsListInterface>({
    key: `analyticsPage/mesure-analytics-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: null,
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: null,
    },
})

//기기사용 통계
interface DeviceAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: DeviceAgeListItemInterface[]
        PERIOD_STAT_LIST: DevicePeriodListItemInterface[]
    } | null
}

export const DeviceAnalyticsListState = atom<DeviceAnalyticsListInterface>({
    key: `analyticsPage/mesure-device-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: null,
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: null,
    },
})

//위험요인 항목별 통계
interface RiskFctrItemsAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: RiskFctrItemsAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrItemsPeriodListItemInterface[]
    } | null
}

export const RiskFctrItemsAnalyticsListState =
    atom<RiskFctrItemsAnalyticsListInterface>({
        key: `analyticsPage/mesure-risk-fctr-items-list`,
        default: {
            status: 'idle',
            search: {
                INST_NO: null,
                BGNDE: getOneMonthAgo(),
                ENDDE: getNowDate(),
            },
            list: null,
        },
    })

//위험요인 갯수별 통계
interface RiskFctrCountAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: RiskFctrCountAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrCountPeriodListItemInterface[]
    } | null
}

export const RiskFctrCountAnalyticsListState =
    atom<RiskFctrCountAnalyticsListInterface>({
        key: `analyticsPage/mesure-risk-fctr-count-list`,
        default: {
            status: 'idle',
            search: {
                INST_NO: null,
                BGNDE: getOneMonthAgo(),
                ENDDE: getNowDate(),
            },
            list: null,
        },
    })

//건강지표 개선통계
interface ImprvmAnalyticsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        // BGNDE: string
        // ENDDE: string
    }
    list: {
        MYBODY_SCORE_IMPRVM_STAT_LIST: ImprvmAgeListItemInterface[]
    } | null
}

export const ImprvmAnalyticsListState = atom<ImprvmAnalyticsListInterface>({
    key: `analyticsPage/imprvm-list`,
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
