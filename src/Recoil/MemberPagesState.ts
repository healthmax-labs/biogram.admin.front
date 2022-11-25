import { atom, DefaultValue, selector } from 'recoil'
import { MemberDetailInterface } from '@Type/PageStateType'
import { DefaultStatus } from '@CommonTypes'

/**
 * member 페이지.
 */

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

export const GetState = selector<{
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

export const OriginSelector = selector<MemberDetailInterface>({
    key: `memberPage/originInfo`,
    get: ({ get }) => {
        const { origin } = get(DetailState)
        return origin
    },
})

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
