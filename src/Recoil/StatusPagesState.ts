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
    memberList: BrftrCmprListInterface
}

export const BrftrCmprListState = atom<BrftrCmprSearchListInterface>({
    key: `statusPage/brftrCmprList`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BGNDE: null,
            ENDDE: null,
        },
        memberList: {
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
    memberList: RiskFctrListInterface
}

export const RiskFctrListState = atom<RiskFctrSearchListInterface>({
    key: `statusPage/RiskFctrList`,
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
        memberList: {
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
    memberList: StatisticsListInterface
}

export const StatisticsListState = atom<StatisticsSearchListInterface>({
    key: `statusPage/statisticsList`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            BEGIN_DE: null,
            END_DE: null,
        },
        memberList: {
            DEVICE_MESURE_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
