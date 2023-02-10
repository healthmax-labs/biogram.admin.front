import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    ActivityWalkListInterface,
    BrftrCmprListInterface,
    HealthIndicatorsListInterface,
    NonMeasureListInterface,
    RiskFctrListInterface,
    StatisticsListInterface,
    WalkRankingListInterface,
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
            RISK_FCTR_CNT: '',
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

//미측정 현황
interface NonMeasureSearchListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string | null
        MESURE_DT: string
        BP_NTCN_AT: string //(Y: 미측정 조회, N: 미측정 조회 않함)
        BS_NTCN_AT: string
        BC_NTCN_AT: string
        HA_NTCN_AT: string
        IS_NTCN_AT: string
        SR_NTCN_AT: string
        SB_NTCN_AT: string
        AND_AT: string //(Y: AND 조회, N: OR 조회)
        cur_page: number
        SEARCH_KEY: string | null
    }
    list: NonMeasureListInterface
}

export const NonMeasureListState = atom<NonMeasureSearchListInterface>({
    key: `statusPage/non-measure-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: null,
            MESURE_DT: getNowDate(),
            BP_NTCN_AT: 'Y', //(Y: 미측정 조회, N: 미측정 조회 않함)
            BS_NTCN_AT: 'Y',
            BC_NTCN_AT: 'Y',
            HA_NTCN_AT: 'Y',
            IS_NTCN_AT: 'Y',
            SR_NTCN_AT: 'Y',
            SB_NTCN_AT: 'Y',
            AND_AT: 'Y', //(Y: AND 조회, N: OR 조회)
            cur_page: 0,
            SEARCH_KEY: '',
        },
        list: {
            NOT_MESURE_NTCN_INFO_LIST: [],
        },
    },
})

//건강지표개선 현황
interface HealthIndicatorsSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        BGNDE: string | null
        ENDDE: string | null
    }
    list: HealthIndicatorsListInterface
}

export const HealthIndicatorsListState =
    atom<HealthIndicatorsSearchListInterface>({
        key: `statusPage/healthIndicators-list`,
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
                MYBODY_SCORE_IMPRVM_INFO_LIST: [],
                TOTAL_COUNT: 0,
            },
        },
    })

//보행수 랭킹 현황
interface WalkRankingSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        // SEARCH_KEY: string | null
        // BGNDE: string | null
        MESURE_MT: string | null
    }
    list: WalkRankingListInterface
}

export const WalkRankingListState = atom<WalkRankingSearchListInterface>({
    key: `statusPage/walkRanking-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            // SEARCH_KEY: null,
            // BGNDE: getOneMonthAgo(),
            MESURE_MT: getNowDate(),
        },
        list: {
            STEP_RANK_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
