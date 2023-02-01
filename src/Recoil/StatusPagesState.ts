import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    ActivityWalkListInterface,
    BrftrCmprListInterface,
    RiskFctrListInterface,
    StatisticsListInterface,
} from '@Type/StatusTypes'
import { getNowDate, getOneMonthAgo } from '@Helper'

/**
 * status 페이지.
 */

//전후비교 현황
interface BrftrCmprSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        BGNDE: string
        ENDDE: string
    }
    list: BrftrCmprListInterface
}

//위험요인 현황
interface RiskFctrSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        BGNDE: string | null
        ENDDE: string | null
        RISK_FCTR_CNT: string | null
        RISK_FCTR: string | null
        TAKNG_MDCIN: string | null
    }
    list: RiskFctrListInterface
}

//기기측정 현황
interface StatisticsSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        BEGIN_DE: string
        END_DE: string
        MESURE_CODE: string | null
    }
    list: StatisticsListInterface
}

//활동량 현황
interface ActivityWalkInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH: string | null
        BEGIN_DE: string | null
        END_DE: string | null
    }
    list: ActivityWalkListInterface
}

export const RiskFctrListState = atom<RiskFctrSearchListInterface>({
    key: `statusPage/risk-fctr-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            RISK_FCTR_CNT: '2',
            RISK_FCTR: 'WS,BP,BS,TG,HD',
            TAKNG_MDCIN: null,
        },
        list: {
            RISK_FCTR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const BrftrCmprListState = atom<BrftrCmprSearchListInterface>({
    key: `statusPage/brftr-cmpr-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: {
            MESURE_BRFTR_CMPR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const StatisticsListState = atom<StatisticsSearchListInterface>({
    key: `statusPage/statistics-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            MESURE_CODE: null,
            BEGIN_DE: getOneMonthAgo(),
            END_DE: getNowDate(),
        },
        list: {
            DEVICE_MESURE_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const ActivityWalkListState = atom<ActivityWalkInterface>({
    key: `statusPage/activity-walk-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH: null,
            BEGIN_DE: getOneMonthAgo(),
            END_DE: getNowDate(),
        },
        list: {
            ACTIVITY_STATE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
