import { atom, DefaultValue, selector } from 'recoil'
import { MemberDetailInterface } from '@Type/PageStateType'
import { DefaultStatus } from '@CommonTypes'
import {
    ConsultInfoListInterface,
    ManageCounselItemInterface,
    MemberInfoInterface,
    MemberInfoListInterface,
} from '@Type/MemberTypes'
import { getNowDate, getOneMonthAgo } from '@Helper'

// member 페이지.
interface ListInterface {
    status: DefaultStatus
    search: {
        curPage: number | null
        instNo: string | null
        searchKey: string | null
        registDtFrom: string | null
        registDtTo: string | null
    }
    list: MemberInfoListInterface
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
        endDt: string | null
        mberNo: string | null
        startDt: string | null
    }
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

// 회원 상세
interface DetailInterface {
    status: DefaultStatus
    MBER_NO: number | null
    detail: MemberDetailInterface
    origin: MemberDetailInterface
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

// 회원 현황 페이지
export const ListState = atom<ListInterface>({
    key: `memberPage/list`,
    default: {
        status: 'idle',
        search: {
            curPage: null,
            instNo: null,
            searchKey: null,
            registDtFrom: null,
            registDtTo: null,
        },
        list: {
            MBER_INFO_LIST: [],
            TOTAL_COUNT: 0,
        },
    },
})

// 회원 상세 페이지.
export const DetailState = atom<DetailInterface>({
    key: `memberPage/detail`,
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

// 상세 정보 데이터
export const detailStatus = selector<{
    status: DefaultStatus
    MBER_NO: number | null
}>({
    key: `memberPage/detailStatus`,
    get: ({ get }) => {
        const { status, MBER_NO } = get(DetailState)
        return {
            status,
            MBER_NO,
        }
    },
})

// 회원 origin 데이터
export const OriginSelector = selector<MemberDetailInterface>({
    key: `memberPage/originInfo`,
    get: ({ get }) => {
        const { origin } = get(DetailState)
        return origin
    },
})

// 회원 상세
export const DetailSelector = selector<MemberDetailInterface>({
    key: `memberPage/detailInfo`,
    get: ({ get }) => {
        const { detail } = get(DetailState)
        return detail
    },
    set: ({ set }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            set(DetailState, currentState => ({
                ...currentState,
                detail: {
                    NM: newValue.NM,
                    MBER_NO: newValue.MBER_NO,
                    MBTLNUM: newValue.MBTLNUM,
                    EMAIL_ADRES: newValue.EMAIL_ADRES,
                    BRTHDY: newValue.BRTHDY,
                    SEX: newValue.SEX,
                    REGIST_DT: newValue.REGIST_DT,
                    USID: newValue.USID,
                    MEMO: newValue.MEMO,
                    MBTLNUM_CRTFC_AT: newValue.MBTLNUM_CRTFC_AT,
                    PSTINST_INFO_LIST: newValue.PSTINST_INFO_LIST,
                    MBTLNUM_CNT: newValue.MBTLNUM_CNT,
                    TOT_CASH: newValue.TOT_CASH,
                    TOT_SCORE: newValue.TOT_SCORE,
                    USE_STPLAT_AGRE_AT: newValue.USE_STPLAT_AGRE_AT,
                    INDVDLINFO_AGRE_AT: newValue.INDVDLINFO_AGRE_AT,
                    SNSTIIVEINFO_AGRE_AT: newValue.SNSTIIVEINFO_AGRE_AT,
                    INDVDLINFO_THIRD_AGRE_AT: newValue.INDVDLINFO_THIRD_AGRE_AT,
                    SNSTIIVEINFO_THIRD_AGRE_AT:
                        newValue.SNSTIIVEINFO_THIRD_AGRE_AT,
                    MARKTINFO_AGRE_AT: newValue.MARKTINFO_AGRE_AT,
                    MARKTINFO_PURPOSE_AGRE_AT:
                        newValue.MARKTINFO_PURPOSE_AGRE_AT,
                },
            }))
        }
    },
})

// 상담회원 현황 리스트
export const ConsultListState = atom<ConsultListInterface>({
    key: `memberPage/consult`,
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
    key: `memberPage/consultDetail`,
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
            endDt: null,
            mberNo: null,
            startDt: null,
        },
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
