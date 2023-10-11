import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    DeviceAgeListItemInterface,
    DevicePeriodListItemInterface,
    MesurePeriodListItemInterface,
    RiskFctrCountAgeListItemInterface,
    RiskFctrCountPeriodListItemInterface,
    RiskFctrItemsPeriodListItemInterface,
    MemberAnalyticsPeriodListItemInterface,
    StressAgeGroupStatListInterface,
    StressPeriodStatListInterface,
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
        instNm: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: Array<{
            AGES_GROUP: string
            DEL_MAN_CNT: number
            DEL_WOMAN_CNT: number
            NEW_MAN_CNT: number
            NEW_WOMAN_CNT: number
            TOT_MAN_CNT: number
            TOT_MBER_CNT: number
            TOT_WOMAN_CNT: number
        }>
        PERIOD_STAT_LIST: MemberAnalyticsPeriodListItemInterface[]
    }
}

interface ImprvmListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        instNm: string
        BGNDE: string
        ENDDE: string
    }
    list: Array<{
        AGES_GROUP: string
        IW_TOT_SCORE: number
        OW_TOT_SCORE: number
        IW_BP_SCORE: number
        IW_FBS_SCORE: number
        IW_HDLC_SCORE: number
        IW_TG_SCORE: number
        IW_WAIST_SCORE: number
        OW_BP_SCORE: number
        OW_FBS_SCORE: number
        OW_HDLC_SCORE: number
        OW_TG_SCORE: number
        OW_WAIST_SCORE: number
    }>
}

interface RiskFctrCountListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        instNm: string
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
        instNm: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: Array<{
            AGE_GROUP: string
            FBS_MAN_CNT: number
            FBS_WOMAN_CNT: number
            FBS_MBER_CNT: number
            HDLC_MAN_CNT: number
            HDLC_WOMAN_CNT: number
            HDLC_MBER_CNT: number
            SUM_MBER_CNT: number
            SYSTOLIC_MAN_CNT: number
            SYSTOLIC_WOMAN_CNT: number
            SYSTOLIC_MBER_CNT: number
            TG_MAN_CNT: number
            TG_WOMAN_CNT: number
            TG_MBER_CNT: number
            WAIST_CRCMFRNC_MAN_CNT: number
            WAIST_CRCMFRNC_WOMAN_CNT: number
            WAIST_CRCMFRNC_MBER_CNT: number
        }>
        PERIOD_STAT_LIST: RiskFctrItemsPeriodListItemInterface[]
    }
}

interface StressInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        instNm: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: Array<StressAgeGroupStatListInterface>
        PERIOD_STAT_LIST: Array<StressPeriodStatListInterface>
    }
}

interface DeviceListInterface {
    status: DefaultStatus
    search: {
        INST_NO: string
        instNm: string
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
        instNm: string
        BGNDE: string
        ENDDE: string
        AGEGROUP: string[]
        CYCLE: string
    }
    list: {
        AGE_GROUP_STAT_LIST: Array<{
            // AGE_GROUP 이 스트링과 넘버 타입트로 내려와서 _.find 에서 검색이 안됨.
            AGE_GROUP: string
            BC_MAN_CNT: number
            BC_MBER_CNT: number
            BC_WOMAN_CNT: number
            BD_MAN_CNT: number
            BD_MBER_CNT: number
            BD_WOMAN_CNT: number
            BP_MAN_CNT: number
            BP_MBER_CNT: number
            BP_WOMAN_CNT: number
            BS_MAN_CNT: number
            BS_MBER_CNT: number
            BS_WOMAN_CNT: number
            HT_MAN_CNT: number
            HT_MBER_CNT: number
            HT_WOMAN_CNT: number
            IS_MAN_CNT: number
            IS_MBER_CNT: number
            IS_WOMAN_CNT: number
            ST_MAN_CNT: number
            ST_MBER_CNT: number
            ST_WOMAN_CNT: number
            SUM_MAN_CNT: number
            SUM_MBER_CNT: number
            SUM_WOMAN_CNT: number
        }>
        PERIOD_STAT_LIST: MesurePeriodListItemInterface[]
    }
}

// 회원 통계
export const MemberListState = atom<AnalyticsMemberListStateInterface>({
    key: `analyticsPage/member-list`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
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
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
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
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
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
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
        },
        list: {
            AGE_GROUP_STAT_LIST: [],
            PERIOD_STAT_LIST: [],
        },
    },
})

//스트레스 통계
export const StressState = atom<StressInterface>({
    key: `analyticsPage/stress`,
    default: {
        status: 'idle',
        search: {
            INST_NO: '',
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
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
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
            AGEGROUP: ['10', '20', '30', '40', '50', '60', '70'],
            CYCLE: 'D',
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
            instNm: '',
            BGNDE: getOneMonthAgo(),
            ENDDE: getNowDate(),
        },
        list: [],
    },
})
