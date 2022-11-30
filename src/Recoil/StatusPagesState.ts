import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import { BrftrCmprListInterface } from '@Type/StatusTypes'
import { RiskFctrListInterface } from '@Type/StatusTypes'
import { StatisticsListInterface } from '@Type/StatusTypes'

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
        BGNDE: string | null
        ENDDE: string | null
    }
    list: BrftrCmprListInterface
}

export const BrftrCmprSchListState = atom<BrftrCmprSearchListInterface>({
    key: `brftrCmprPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: null,
            ENDDE: null,
        },
        list: {
            MESURE_BRFTR_CMPR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const BrftrCmprListState = atom<BrftrCmprSearchListInterface>({
    key: `brftrCmprListPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: null,
            ENDDE: null,
        },
        list: {
            MESURE_BRFTR_CMPR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

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

export const RiskFctrSchListState = atom<RiskFctrSearchListInterface>({
    key: `riskFctrPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: null,
            ENDDE: null,
            RISK_FCTR_CNT: null,
            RISK_FCTR: null,
            TAKNG_MDCIN: null,
        },
        list: {
            RISK_FCTR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

export const RiskFctrListState = atom<RiskFctrSearchListInterface>({
    key: `riskFctrListPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: null,
            ENDDE: null,
            RISK_FCTR_CNT: null,
            RISK_FCTR: null,
            TAKNG_MDCIN: null,
        },
        list: {
            RISK_FCTR_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

//기기측정 현황
interface StatisticsSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        BEGIN_DE: string | null
        END_DE: string | null
    }
    list: StatisticsListInterface
}

export const StatisticsListState = atom<StatisticsSearchListInterface>({
    key: `statisticsListPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BEGIN_DE: null,
            END_DE: null,
        },
        list: {
            DEVICE_MESURE_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
