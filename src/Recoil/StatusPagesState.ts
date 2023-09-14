import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    ActivityWalkListInterface,
    BrftrCmprListInterface,
    HealthIndicatorsListInterface,
    NonMeasureListInterface,
    RiskFctrListInterface,
    StatisticsListInterface,
    StressListItemInterface,
    BrainListItemInterface,
    WalkRankingListInterface,
} from '@Type/StatusTypes'
import {
    getNowDate,
    getOneMonthAgo,
    getNowYearMonth,
    getDateDayUnit,
} from '@Helper'

/**
 * status 페이지.
 */

//전후비교 현황
interface BrftrCmprSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        SEARCH_KEY: string
        BGNDE: string
        ENDDE: string
    }
    list: BrftrCmprListInterface
}

//위험요인 현황
interface RiskFctrSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        SEARCH_KEY: string
        BGNDE: string
        ENDDE: string
        RISK_FCTR_CNT: string
        RISK_FCTR: string
        TAKNG_MDCIN: string
    }
    list: RiskFctrListInterface
}

//기기측정 현황
interface StatisticsSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        SEARCH_KEY: string
        BEGIN_DE: string
        END_DE: string
        MESURE_CODE: string[]
    }
    list: StatisticsListInterface
}

//활동량 현황
interface ActivityWalkInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        SEARCH: string
        BEGIN_DE: string
        END_DE: string
    }
    list: ActivityWalkListInterface
}

interface NonMeasureSearchListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        instNm: string
        MESURE_DT: string
        BP_NTCN_AT: 'Y' | 'N' //(Y: 미측정 조회, N: 미측정 조회 않함)
        BS_NTCN_AT: string
        BC_NTCN_AT: string
        HA_NTCN_AT: string
        IS_NTCN_AT: string
        SR_NTCN_AT: string
        SB_NTCN_AT: string
        AND_AT: 'Y' | 'N' //(Y: AND 조회, N: OR 조회)
        cur_page: number
        SEARCH_KEY: string
        BF_N_MESURE_DAY: number
        WORK_TY_CODE: string
    }
    list: NonMeasureListInterface
}

interface HealthIndicatorsSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        SEARCH_KEY: string
        BGNDE: string
        ENDDE: string
    }
    list: HealthIndicatorsListInterface
}

interface WalkRankingSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        MESURE_MT: string
    }
    list: WalkRankingListInterface
}

// 스트레스 현황
interface StressSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        instNm: string
        BEGIN_DE: string
        END_DE: string
        INQUIRY_ITEMS: string
        CONDITIONS: string
        SEARCH_KEY: string
    }
    list: {
        TOTAL_COUNT: number
        STRESS_STATE_LIST: Array<StressListItemInterface>
    }
}

// 뇌기능 현광
interface BrainSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        instNm: string
        INST_NO: string
        BEGIN_DE: string
        END_DE: string
        INQUIRY_ITEMS: string
        CONDITIONS: string
        SEARCH_KEY: string
    }
    list: {
        TOTAL_COUNT: number
        BRAIN_STATE_LIST: Array<BrainListItemInterface>
    }
}

export const RiskFctrListState = atom<RiskFctrSearchListInterface>({
    key: `statusPage/risk-fctr-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 1,
            INST_NO: '',
            instNm: '',
            SEARCH_KEY: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            RISK_FCTR_CNT: '',
            RISK_FCTR: 'WS,BP,BS,TG,HD',
            TAKNG_MDCIN: '',
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
            curPage: 1,
            INST_NO: '',
            instNm: '',
            SEARCH_KEY: '',
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
            curPage: 1,
            INST_NO: '',
            instNm: '',
            SEARCH_KEY: '',
            MESURE_CODE: ['IS', 'BP', 'BS', 'BC', 'ST'],
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
            curPage: 1,
            INST_NO: '',
            instNm: '',
            SEARCH: '',
            BEGIN_DE: getDateDayUnit(7),
            END_DE: getNowDate(),
        },
        list: {
            ACTIVITY_STATE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

//미측정 현황
export const NonMeasureListState = atom<NonMeasureSearchListInterface>({
    key: `statusPage/non-measure-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            instNm: '',
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
            BF_N_MESURE_DAY: 3,
            WORK_TY_CODE: 'A',
        },
        list: {
            NOT_MESURE_NTCN_INFO_LIST: [],
        },
    },
})

//건강지표개선 현황
export const HealthIndicatorsListState =
    atom<HealthIndicatorsSearchListInterface>({
        key: `statusPage/health-indicators-list`,
        default: {
            status: 'idle',
            search: {
                curPage: 0,
                INST_NO: '',
                instNm: '',
                SEARCH_KEY: '',
                BGNDE: getDateDayUnit(7),
                ENDDE: getNowDate(),
            },
            list: {
                MYBODY_SCORE_IMPRVM_INFO_LIST: [],
                TOTAL_COUNT: 0,
            },
        },
    })

//보행수 랭킹 현황
export const WalkRankingListState = atom<WalkRankingSearchListInterface>({
    key: `statusPage/walk-ranking-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 0,
            INST_NO: '',
            instNm: '',
            MESURE_MT: getNowYearMonth(),
        },
        list: {
            STEP_RANK_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 스트레스 현황
export const StressListState = atom<StressSearchListInterface>({
    key: `statusPage/stress-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 1,
            INST_NO: '',
            instNm: '',
            BEGIN_DE: getOneMonthAgo(),
            END_DE: getNowDate(),
            INQUIRY_ITEMS: 'STRS_SCORE',
            CONDITIONS: '나쁨,매우나쁨',
            SEARCH_KEY: '',
        },
        list: {
            STRESS_STATE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 뇌기능 현황
export const BrainListState = atom<BrainSearchListInterface>({
    key: `statusPage/brain-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 1,
            INST_NO: '',
            instNm: '',
            BEGIN_DE:
                process.env.REACT_APP_ENV === 'development'
                    ? '20230101'
                    : getOneMonthAgo(),
            END_DE: getNowDate(),
            INQUIRY_ITEMS:
                'BB_FNCT,CB_FNCT,CB_ABLTY,CB_FNCT_SCORE,BBF_ADJST_TIME,BBF_FNCT_SCORE,BH_TNT_SCORE',
            CONDITIONS: '관리,보통,양호',
            SEARCH_KEY: '',
        },
        list: {
            BRAIN_STATE_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})
