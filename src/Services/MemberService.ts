import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    MemberInfoInterface,
    PstinstInfoItemInterface,
} from '@Type/MemberTypes'

/**
 * 소속 리스트
 */
export const getPstinst = (): Promise<
    ServicesDefaultResult<{
        PSTINST_INFO_LIST: PstinstInfoItemInterface[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: '/mber/v1/pstinst',
        payload: {},
    })
}

/**
 * 회원 상세 정보 조회.
 * @param mber_no
 */
export const getMemberInfo = ({
    mber_no,
}: {
    mber_no: number
}): Promise<ServicesDefaultResult<MemberInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/info/${mber_no}`,
        payload: {},
    })
}

/**
 * 전화 번호 중복체크
 * @param mbtlnum
 */
export const getMbtlnum = ({
    mbtlnum,
}: {
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ MBER_MBTLNUM_USE_AT: 'Y' | 'N' }>> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/check/mbtlnum?mbtlnum=${mbtlnum}`,
        payload: {},
    })
}

/**
 * 인증번호 전송
 * @param mbtlnum
 */
export const postMbtlnumCrtfc = ({
    mbtlnum,
}: {
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/mbtlnum_crtfc/${mbtlnum}`,
        payload: {},
    })
}

/**
 * 인증 번호 확인
 * @param mbtlnum
 * @param crtfc_key
 */
export const getCrtfcKey = ({
    mbtlnum,
    crtfc_key,
}: {
    mbtlnum: string
    crtfc_key: string
}): Promise<
    ServicesDefaultResult<{ MBTLNUM_CRTFC_AT: { CRTFC_RESULT: string } }>
> => {
    return _Axios_({
        method: 'get',
        url: `/mber/v1/mbtlnum_crtfc/${mbtlnum}?crtfc_key=${crtfc_key}`,
        payload: {},
    })
}

/**
 * 회원 데이터 통합 처리.
 * @param mbrno
 * @param mbtlnum
 */
export const mberUnityUpdate = ({
    mbrno,
    mbtlnum,
}: {
    mbrno: string
    mbtlnum: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/mber/unity/${mbrno}/${mbtlnum}/update`,
        payload: {},
    })
}

/**
 * 비밀번호 리셋
 * @param mbrno
 */
export const postPasswordReset = ({
    mbrno,
}: {
    mbrno: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/${mbrno}/password/reset/update`,
        payload: {},
    })
}

/**
 * 소속 탈퇴 처리.
 * @param mbrNo
 * @param instNo
 * @param leaveText
 */
export const postMemberPstinstLeave = ({
    mbrNo,
    instNo,
    leaveText,
}: {
    mbrNo: number
    instNo: number
    leaveText: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/pstinst/${mbrNo}/${instNo}/${encodeURIComponent(
            leaveText
        )}/update`,
        payload: {},
    })
}

/**
 * 회원 소속 추가.
 * @param mberNo
 * @param instNo
 */
export const postInstPstinst = ({
    mberNo,
    instNo,
}: {
    mberNo: number
    instNo: number
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/pstinst/${instNo}`,
        payload: {
            MBER_NO: mberNo,
        },
    })
}

/**
 * 회원 약관 동의 처리.
 * @param payload
 */
export const postMberStplatInfoUpdate = (payload: {
    MBER_NO: number
    USE_STPLAT_AGRE_AT: 'Y' | 'N'
    INDVDLINFO_AGRE_AT: 'Y' | 'N'
    SNSTIIVEINFO_AGRE_AT: 'Y' | 'N'
    MARKTINFO_AGRE_AT: 'Y' | 'N'
    INDVDLINFO_THIRD_AGRE_AT: 'Y' | 'N'
    SNSTIIVEINFO_THIRD_AGRE_AT: 'Y' | 'N'
    MARKTINFO_PURPOSE_AGRE_AT: 'Y' | 'N'
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/stplat/info/update`,
        payload: payload,
    })
}

/**
 * 회원 정보 업데이트
 * @param payload
 */
export const postMemberInfoUpdate = (payload: {
    MBER_NO: number
    NM: string
    BRTHDY: string
    SEXDSTN: 'M' | 'F'
    MBTLNUM: string
    EMAIL_ADRES: string
    MBTLNUM_CRTFC_AT: 'Y' | 'N'
    MEMO: string
}): Promise<ServicesDefaultResult<{ test: null }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/info/update`,
        payload: payload,
    })
}
