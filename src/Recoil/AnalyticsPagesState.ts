import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    DeviceAgeListItemInterface,
    DevicePeriodListItemInterface,
    AnalyticsMemberListInterface,
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
interface AnalyticsMemberListStateInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: AnalyticsMemberListInterface
}

interface ImprvmListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        BGNDE: string
        ENDDE: string
    }
    list: {
        MYBODY_SCORE_IMPRVM_STAT_LIST: ImprvmAgeListItemInterface[]
    }
}

interface RiskFctrCountListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: RiskFctrCountAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrCountPeriodListItemInterface[]
    }
}

interface RiskFctrItemsListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: RiskFctrItemsAgeListItemInterface[]
        PERIOD_STAT_LIST: RiskFctrItemsPeriodListItemInterface[]
    }
}

interface DeviceListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: DeviceAgeListItemInterface[]
        PERIOD_STAT_LIST: DevicePeriodListItemInterface[]
    }
}

interface MesureListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: MesureAgeListItemInterface[]
        PERIOD_STAT_LIST: MesurePeriodListItemInterface[]
    }
}

export const MemberListState = atom<AnalyticsMemberListStateInterface>({
    key: `analyticsPage/member-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'day',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//측정이용자 통계
export const MesureListState = atom<MesureListInterface>({
    key: `analyticsPage/mesure-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'day',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//기기사용 통계
export const DeviceListState = atom<DeviceListInterface>({
    key: `analyticsPage/device-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'day',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//위험요인 항목별 통계
export const RiskFctrItemsListState = atom<RiskFctrItemsListInterface>({
    key: `analyticsPage/mesure-risk-fctr-items-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'day',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//위험요인 갯수별 통계
export const RiskFctrCountListState = atom<RiskFctrCountListInterface>({
    key: `analyticsPage/mesure-risk-fctr-count-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'day',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//건강지표 개선통계
export const ImprvmListState = atom<ImprvmListInterface>({
    key: `analyticsPage/imprvm-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: {
            MYBODY_SCORE_IMPRVM_STAT_LIST: [],
        },
    },
})
