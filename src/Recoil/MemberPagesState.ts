import { atom } from 'recoil'
import { MemberDetailInfoInterface } from '@Type/PageStateType'
import { DefaultStatus, SendSmsItemInterface } from '@CommonTypes'
import {
    ConsultInfoListInterface,
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
        curPage: number | null
        instNo: string | null
        searchKey: string | null
        registDtFrom: string | null
        registDtTo: string | null
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
        curPage: number | null
        instNo: string | null
        searchKey: string | null
        riskFctr: string | null
        startDt: string | null
        endDt: string | null
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
    CNST: string | null
    MBER_NO: number | null
    PLN: string | null
    REG_NM: string | null
    CNST_NO: number | null
    MNG_ID: string | null
    MNG_NM: string | null
    MOD_DT: string | null
    MOD_MNG_NM: string | null
    REGDT: string | null
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
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        FROM_MONTH: string
        FROM_DAY: string
        TO_DAY: string
        SNDNG_FAILR: 'F' | null
        SNDNG_STDR: string | null
    }
    list: MsgSendListInterface
}

//메세지 예약 현황
interface MsgBookListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        INST_NO: string | null
        SEARCH_KEY: string | null
        FROM_DAY: string | null
        TO_DAY: string | null
        SNDNG_STDR: string | null
    }
    list: MsgSendListInterface
    manage: {
        checkRow: string[]
    }
}

// 회원 현황 리스트 페이지
export const MemberListState = atom<MemberListInterface>({
    key: `memberPage/member-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            instNo: null,
            searchKey: null,
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
            NM: null,
            MBER_NO: null,
            MBTLNUM: null,
            MBTLNUM_CRTFC_AT: null,
            EMAIL_ADRES: null,
            BRTHDY: null,
            SEX: null,
            REGIST_DT: null,
            USID: null,
            MEMO: null,
            PSTINST_INFO_LIST: [],
            MBTLNUM_CNT: null,
            TOT_CASH: '',
            TOT_SCORE: null,
            USE_STPLAT_AGRE_AT: null,
            INDVDLINFO_AGRE_AT: null,
            SNSTIIVEINFO_AGRE_AT: null,
            INDVDLINFO_THIRD_AGRE_AT: null,
            SNSTIIVEINFO_THIRD_AGRE_AT: null,
            MARKTINFO_AGRE_AT: null,
            MARKTINFO_PURPOSE_AGRE_AT: null,
        },
        origin: {
            NM: null,
            MBER_NO: null,
            MBTLNUM: null,
            MBTLNUM_CRTFC_AT: null,
            EMAIL_ADRES: null,
            BRTHDY: null,
            SEX: null,
            REGIST_DT: null,
            USID: null,
            MEMO: null,
            PSTINST_INFO_LIST: [],
            MBTLNUM_CNT: null,
            TOT_CASH: '',
            TOT_SCORE: null,
            USE_STPLAT_AGRE_AT: null,
            INDVDLINFO_AGRE_AT: null,
            SNSTIIVEINFO_AGRE_AT: null,
            INDVDLINFO_THIRD_AGRE_AT: null,
            SNSTIIVEINFO_THIRD_AGRE_AT: null,
            MARKTINFO_AGRE_AT: null,
            MARKTINFO_PURPOSE_AGRE_AT: null,
        },
        pstinstLeave: {
            selectNo: null,
            text: null,
        },
        phoneAuth: false,
    },
})

// 상담회원 현황 리스트
export const ConsultListState = atom<ConsultListInterface>({
    key: `memberPage/consult-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            instNo: null,
            searchKey: null,
            riskFctr: null,
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
        CNST: null,
        MBER_NO: null,
        PLN: null,
        REG_NM: null,
        CNST_NO: null,
        MNG_ID: null,
        MNG_NM: null,
        MOD_DT: null,
        MOD_MNG_NM: null,
        REGDT: null,
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
    key: `memberPage/consult-messageBox`,
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

export const MsgSendListState = atom<MsgSendSearchListInterface>({
    key: `memberPage/msg-send-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
            SNDNG_FAILR: null,
            SNDNG_STDR: null,
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

export const MsgBookListState = atom<MsgBookListInterface>({
    key: `memberPage/msg-book-list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            INST_NO: null,
            SEARCH_KEY: null,
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
