import { atom } from 'recoil'
import { MemberDetailInfoInterface } from '@Type/PageStateType'
import { DefaultStatus, SendSmsItemInterface } from '@CommonTypes'
import {
    ConsultInfoListInterface,
    ConsultMealDiaryItemInterface,
    ConsultMyGraphBldvssItemResultInterface,
    ConsultMyGraphBodyResultItemInterface,
    ConsultMyGraphBodyStdResultItemInterface,
    ConsultMyGraphBrainResultItemInterface,
    ConsultMyGraphBrssrResultItemInterface,
    ConsultMyGraphCategoryType,
    ConsultMyGraphCholResultItemInterface,
    ConsultMyGraphDdsgResultItemInterface,
    ConsultMyGraphHeightResultItemInterface,
    ConsultMyGraphLifeLogResultInterface,
    ConsultMyGraphStrsResultItemInterface,
    ConsultMyGraphWaistResultItemInterface,
    ConsultRawAgeMiInfoItemInterface,
    ConsultRawAgeObiInfoItemInterface,
    ManageCounselItemInterface,
    ManageCounselMsgBoxListInterface,
    ManageCounselMycoachInterface,
    ManageCounselQustnrAnswerInterface,
    MemberInfoInterface,
    MemberInfoListInterface,
} from '@Type/MemberTypes'
import { getNowDate, getOneMonthAgo, gmtTimeToTimeObject } from '@Helper'
import Const from '@Const'
import { MsgSendListInterface } from '@Type/MsgTypes'

const gmtTimeToTime = gmtTimeToTimeObject(new Date())

// member 페이지.
interface MemberListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        instNo: string
        searchKey: string
        registDtFrom: string
        registDtTo: string
    }
    list: MemberInfoListInterface
    manage: {
        checkRow: string[]
        checkRowName: string
        memDeleteMemo: string
    }
}

// 회원 상담 현황
interface ConsultListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        instNo: string
        searchKey: string
        riskFctr: string
        startDt: string
        endDt: string
    }
    list: ConsultInfoListInterface
}

// 상담 차트 리스트
interface ConsultChartListInterface {
    status: DefaultStatus
    listStatus: DefaultStatus
    search: {
        endDt: string
        startDt: string
    }
    memNo: number | null
    list: ManageCounselItemInterface[]
}

// 상담 차트 작성
interface ConsultChartInterface {
    CNST: string
    MBER_NO: number | null
    PLN: string
    REG_NM: string
    CNST_NO: number | null
    MNG_ID: string
    MNG_NM: string
    MOD_DT: string
    MOD_MNG_NM: string
    REGDT: string
}

interface ConsultSmsSendInterface {
    send: {
        SMS_SJ: string | null
        SMS_CN: string | null
        SNDNG_NO: string | null
        SNDNG_DT: string | null
        SEND_ALL_MBER: 'N' | 'Y'
        SNDNG_GBN: 'N' | 'Y'
        SEND_MBER_INFO_LIST: SendSmsItemInterface[]
    }
}

// 회원 상세
interface MemberDetailInterface {
    status: DefaultStatus
    MBER_NO: number | null
    detail: MemberDetailInfoInterface
    origin: MemberDetailInfoInterface
    pstinstLeave: {
        selectNo: number | null
        text: string | null
    }
    phoneAuth: boolean
    checkUsid: boolean
}

// 상담 회원 상세
interface ConsultDetailInterface {
    status: DefaultStatus
    memNo: number | null
    detail: MemberInfoInterface | null
}

// 상담 회원 마이코치
interface ConsultMyCoachInterface {
    status: DefaultStatus
    memNo: number | null
    search: {
        searchDate: string
    }
    data: ManageCounselMycoachInterface | null
}

// 상담 회원 설문 조사
interface ConsultSurveyInterface {
    status: DefaultStatus
    memNo: number | null
    data: ManageCounselQustnrAnswerInterface | null
}

// 상담 회원 메시지 발송함 리스트
interface ConsultMsgBoxListInterface {
    status: DefaultStatus
    search: {
        START_DT: string
        END_DT: string
        SNDNG_FAILR: string
        SNDNG_STDR: string
        MSG_TYPE: string
        SEARCH_KEY: string
    }
    memNo: number | null
    data: ManageCounselMsgBoxListInterface | null
}

//메세지 발송 현황
interface MsgSendSearchListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        SEARCH_KEY: string
        FROM_MONTH: string
        FROM_DAY: string
        TO_DAY: string
        SNDNG_FAILR: string
        SNDNG_STDR: string
    }
    list: MsgSendListInterface
}

//메세지 예약 현황
interface MsgBookListInterface {
    status: DefaultStatus
    search: {
        curPage: number
        INST_NO: string
        SEARCH_KEY: string
        FROM_DAY: string
        TO_DAY: string
        SNDNG_STDR: string
    }
    list: MsgSendListInterface
    manage: {
        checkRow: string[]
    }
}

// 생체 나이
interface RawAgeInterface {
    status: DefaultStatus
    search: {
        memNo: number | null
    }
    list: {
        OBI_INFO: ConsultRawAgeObiInfoItemInterface[]
        MI_INFO: ConsultRawAgeMiInfoItemInterface[]
    }
}

// 식사 일기
export interface MealDiaryListItemInterface
    extends ConsultMealDiaryItemInterface {
    checked: boolean
}

interface MealDiaryInterface {
    status: DefaultStatus
    search: {
        memNo: number | null
        mealDe: string
        startDay: number
    }
    list: MealDiaryListItemInterface[]
}

// 마이그래프
interface MyGraphInterface {
    search: {
        memNo: number | null
        category: string | ConsultMyGraphCategoryType
        startDay: string
    }
    body: {
        status: DefaultStatus
        data: ConsultMyGraphBodyResultItemInterface[]
        std_list: {
            VFL: ConsultMyGraphBodyStdResultItemInterface[]
            BMR: ConsultMyGraphBodyStdResultItemInterface[]
            FAT: ConsultMyGraphBodyStdResultItemInterface[]
            BDWGH: ConsultMyGraphBodyStdResultItemInterface[]
            EST: ConsultMyGraphBodyStdResultItemInterface[]
            BMI: ConsultMyGraphBodyStdResultItemInterface[]
            SLM: ConsultMyGraphBodyStdResultItemInterface[]
            PBF: ConsultMyGraphBodyStdResultItemInterface[]
        }
    }
    brssr: {
        status: DefaultStatus
        data: ConsultMyGraphBrssrResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    bdsg: {
        status: DefaultStatus
        data: ConsultMyGraphDdsgResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    chol: {
        status: DefaultStatus
        data: ConsultMyGraphCholResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    bldvss: {
        status: DefaultStatus
        data: ConsultMyGraphBldvssItemResultInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    strs: {
        status: DefaultStatus
        data: ConsultMyGraphStrsResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    height: {
        status: DefaultStatus
        data: ConsultMyGraphHeightResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    waist: {
        status: DefaultStatus
        data: ConsultMyGraphWaistResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    brain: {
        status: DefaultStatus
        data: ConsultMyGraphBrainResultItemInterface[]
        std_list: ConsultMyGraphBodyStdResultItemInterface[]
    }
    lifeLog: {
        status: DefaultStatus
        data: ConsultMyGraphLifeLogResultInterface
    }
}

// 회원 현황 리스트 페이지
export const MemberListState = atom<MemberListInterface>({
    key: `memberPage/member-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 1,
            instNo: '',
            searchKey: '',
            registDtFrom: getOneMonthAgo(),
            registDtTo: getNowDate(),
        },
        list: {
            MBER_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
        manage: {
            checkRow: [],
            checkRowName: '',
            memDeleteMemo: '',
        },
    },
})

// 회원 상세 페이지.
export const MemberDetailState = atom<MemberDetailInterface>({
    key: `memberPage/member-detail`,
    default: {
        status: 'idle',
        MBER_NO: null,
        detail: {
            NM: '',
            MBER_NO: null,
            MBTLNUM: '',
            MBTLNUM_CRTFC_AT: 'N',
            EMAIL_ADRES: '',
            BRTHDY: '',
            SEX: 'F',
            REGIST_DT: '',
            USID: '',
            MEMO: '',
            PSTINST_INFO_LIST: [],
            MBTLNUM_CNT: null,
            TOT_CASH: '',
            TOT_SCORE: null,
            USE_STPLAT_AGRE_AT: 'N',
            INDVDLINFO_AGRE_AT: 'N',
            SNSTIIVEINFO_AGRE_AT: 'N',
            INDVDLINFO_THIRD_AGRE_AT: 'N',
            SNSTIIVEINFO_THIRD_AGRE_AT: 'N',
            MARKTINFO_AGRE_AT: 'N',
            MARKTINFO_PURPOSE_AGRE_AT: 'N',
            WORK_TY_CODE: 'N',
            BDWGH: null,
            HEIGHT: null,
            PASSWORD: null,
            PASSWORD_CHK: null,
            WAIST_CRCMFRNC: null,
        },
        origin: {
            NM: '',
            MBER_NO: null,
            MBTLNUM: '',
            MBTLNUM_CRTFC_AT: 'N',
            EMAIL_ADRES: '',
            BRTHDY: '',
            SEX: 'F',
            REGIST_DT: '',
            USID: '',
            MEMO: '',
            PSTINST_INFO_LIST: [],
            MBTLNUM_CNT: null,
            TOT_CASH: '',
            TOT_SCORE: null,
            USE_STPLAT_AGRE_AT: 'N',
            INDVDLINFO_AGRE_AT: 'N',
            SNSTIIVEINFO_AGRE_AT: 'N',
            INDVDLINFO_THIRD_AGRE_AT: 'N',
            SNSTIIVEINFO_THIRD_AGRE_AT: 'N',
            MARKTINFO_AGRE_AT: 'N',
            MARKTINFO_PURPOSE_AGRE_AT: 'N',
            WORK_TY_CODE: 'N',
            BDWGH: null,
            HEIGHT: null,
            PASSWORD: null,
            PASSWORD_CHK: null,
            WAIST_CRCMFRNC: null,
        },
        pstinstLeave: {
            selectNo: null,
            text: null,
        },
        phoneAuth: false,
        checkUsid: false,
    },
})

// 상담회원 현황 리스트
export const ConsultListState = atom<ConsultListInterface>({
    key: `memberPage/consult-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 1,
            instNo: '',
            searchKey: '',
            riskFctr: '',
            startDt: getOneMonthAgo(),
            endDt: getNowDate(),
        },
        list: {
            MBER_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 상담회원 상세 페이지.
export const ConsultDetailState = atom<ConsultDetailInterface>({
    key: `memberPage/consult-detail`,
    default: {
        status: 'idle',
        memNo: null,
        detail: null,
    },
})

// 상담 차트 리스트
export const ConsultDetailChartListState = atom<ConsultChartListInterface>({
    key: `memberPage/consult-chart-list`,
    default: {
        status: 'idle',
        listStatus: 'idle',
        search: {
            endDt: getNowDate(),
            startDt: getOneMonthAgo(),
        },
        memNo: null,
        list: [],
    },
})

// 상담 차트
export const ConsultDetailChartState = atom<ConsultChartInterface>({
    key: `memberPage/consult-chart`,
    default: {
        CNST: '',
        MBER_NO: null,
        PLN: '',
        REG_NM: '',
        CNST_NO: null,
        MNG_ID: '',
        MNG_NM: '',
        MOD_DT: '',
        MOD_MNG_NM: '',
        REGDT: '',
    },
})

// 메시지발송
export const ConsultDetailSmsSendState = atom<ConsultSmsSendInterface>({
    key: `memberPage/consult-sms-send`,
    default: {
        send: {
            SMS_SJ: null,
            SMS_CN: null,
            SNDNG_NO: Const.reprsntTelno,
            SNDNG_DT: `${gmtTimeToTime.year}${gmtTimeToTime.monthPad}${gmtTimeToTime.dayPad}${gmtTimeToTime.hourPad}${gmtTimeToTime.minutePad}${gmtTimeToTime.secondPad}`,
            SEND_ALL_MBER: 'N',
            SNDNG_GBN: 'N',
            SEND_MBER_INFO_LIST: [],
        },
    },
})

// 상담 회원 마이코치
export const ConsultMyCoachState = atom<ConsultMyCoachInterface>({
    key: `memberPage/consult-my-coach`,
    default: {
        status: 'idle',
        memNo: null,
        search: {
            searchDate: getNowDate(),
        },
        data: null,
    },
})

// 상담 회원 설문조사
export const ConsultSurveyState = atom<ConsultSurveyInterface>({
    key: `memberPage/consult-survey`,
    default: {
        status: 'idle',
        memNo: null,
        data: null,
    },
})

// 상담 회원 메시지 발송함 리스트
export const ConsultMsgBoxListState = atom<ConsultMsgBoxListInterface>({
    key: `memberPage/consult-message-box`,
    default: {
        status: 'idle',
        search: {
            START_DT: getOneMonthAgo(),
            END_DT: getNowDate(),
            SNDNG_FAILR: '',
            SNDNG_STDR: '',
            MSG_TYPE: '',
            SEARCH_KEY: '',
        },
        memNo: null,
        data: null,
    },
})

// 메시지 발송이력
export const MsgSendListState = atom<MsgSendSearchListInterface>({
    key: `memberPage/msg-send-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 0,
            INST_NO: '',
            SEARCH_KEY: '',
            SNDNG_FAILR: 'F',
            SNDNG_STDR: '',
            FROM_MONTH: `${gmtTimeToTime.year}${gmtTimeToTime.monthPad}`,
            FROM_DAY: `01`,
            TO_DAY: `31`,
        },
        list: {
            SMS_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 메세지 예약현황
export const MsgBookListState = atom<MsgBookListInterface>({
    key: `memberPage/msg-book-list`,
    default: {
        status: 'idle',
        search: {
            curPage: 0,
            INST_NO: '',
            SEARCH_KEY: '',
            FROM_DAY: getNowDate(),
            TO_DAY: getNowDate(),
            SNDNG_STDR: `S`,
        },
        list: {
            SMS_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
        manage: {
            checkRow: [],
        },
    },
})

// 상담회원 생체나이
export const RawAgeState = atom<RawAgeInterface>({
    key: `memberPage/consult-raw-age`,
    default: {
        status: 'idle',
        search: {
            memNo: null,
        },
        list: {
            OBI_INFO: [],
            MI_INFO: [],
        },
    },
})

// 상담 회원 식사일기
export const MealDiaryState = atom<MealDiaryInterface>({
    key: `memberPage/consult-meal-diary`,
    default: {
        status: 'idle',
        search: {
            memNo: null,
            mealDe: getNowDate(),
            startDay: 6,
        },
        list: [],
    },
})

// 상담회원 마이그래프
export const MyGraphState = atom<MyGraphInterface>({
    key: `memberPage/consult-my-graph`,
    default: {
        search: {
            memNo: null,
            category: 'body',
            startDay: getNowDate(),
        },
        body: {
            status: 'idle',
            data: [],
            std_list: {
                VFL: [],
                BMR: [],
                FAT: [],
                BDWGH: [],
                EST: [],
                BMI: [],
                SLM: [],
                PBF: [],
            },
        },
        brssr: { status: 'idle', data: [], std_list: [] },
        bdsg: { status: 'idle', data: [], std_list: [] },
        chol: { status: 'idle', data: [], std_list: [] },
        bldvss: { status: 'idle', data: [], std_list: [] },
        strs: { status: 'idle', data: [], std_list: [] },
        height: { status: 'idle', data: [], std_list: [] },
        waist: { status: 'idle', data: [], std_list: [] },
        brain: { status: 'idle', data: [], std_list: [] },
        lifeLog: {
            status: 'idle',
            data: {
                ACTV_TRCK_14DAYS_STEP_INFO_LIST: [],
                ACTV_TRCK_14DAYS_AVG_STEP_INFO: {
                    GOAL_RATE: 0,
                    AVG_STEPS: 0,
                },
                DAIL_MOBLPHON_STEPS_DATA_LIST: [],
                MEAL_14DAYS_AVG_CALORIE_INFO: {
                    AVG_GOAL_RATE: 0,
                    AVG_MEAL_CALORIE: 0,
                },
                SLEEP_AVG_14DAYS_INFO: {
                    GOAL_BEGIN_RATE: 0,
                    GOAL_RATE: 0,
                    AVG_SLEEP_TIME: 0,
                    GOAL_END_RATE: 0,
                },
                SLEEP_14DAYS_INFO_LIST: [],
                LATEST_HR_INFOS: [],
                MEAL_14DAYS_CALORIE_INFO_LIST: [],
                MEAL_14DAYS_DETAIL_INFO_LIST: [],
            },
        },
    },
})
