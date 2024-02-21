import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    InstInfoInterface,
    InstJoinListItemInterface,
    InstListInterface,
    EapListInterface,
    EapDetailInterface,
} from '@Type/InstTypes'
import _ from 'lodash'

/**
 * 소속관리 리스트
 */
export const getInstList = (): Promise<
    ServicesDefaultResult<InstListInterface>
> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/list/0`,
        payload: {},
    })
}

/**
 * 회원 소속 등록.
 * @param CUR_PAGE
 * @param INST_NO
 * @param SEARCH_KEY
 */
export const getInstJoinList = ({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        PSTINST_REQUEST_INFO_LIST: InstJoinListItemInterface[]
        TOTAL_COUNT: number
    }>
> => {
    const payload: {
        INST_NO?: string
        SEARCH_KEY: string
    } = {
        INST_NO: INST_NO,
        SEARCH_KEY: SEARCH_KEY,
    }

    if (_.isEmpty(payload.INST_NO)) {
        delete payload.INST_NO
    }

    return _Axios_({
        method: 'post',
        url: `/inst/v1/request/list/${CUR_PAGE}`,
        payload: payload,
    })
}

/**
 * 소속 등록
 * @param payload
 */
export const postInstInfo = (
    payload: InstInfoInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/info`,
        payload: payload,
    })
}

export const postInstInfoUpdate = (
    payload: InstInfoInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/info/update`,
        payload: payload,
    })
}

/**
 * 소속명 중복 확인
 * @param instNm
 */
export const getInstCheckInstNm = ({
    instNm,
}: {
    instNm: string
}): Promise<
    ServicesDefaultResult<{
        INST_NM_USE_AT: 'Y' | 'N'
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/check/inst_nm?inst_nm=${encodeURIComponent(instNm)}`,
        payload: {},
    })
}

/**
 * 소속정보
 * @param instNo
 */
export const getInstInfo = ({
    instNo,
}: {
    instNo: number
}): Promise<
    ServicesDefaultResult<{
        INST_INFO: {
            TCHMNFL_NM: string
            ATCHMNFL_NO: number
            ATCHMNFL_PATH: string
            BIZ_INFO: string
            BOTTOM_INST_CNT: number
            BOTTOM_INST_NM: string | null
            BOTTOM_INST_NO: string | null
            BUDGET_INST_CNT: number
            CHARGER_LIST: Array<{
                AUTHOR_CODE: string
                AUTHOR_NM: string
                BRTHDY: string
                CNSLTNT_AT: 'N' | 'Y'
                CONECT_IP: string | null
                CONECT_LMTT_AT: 'N' | 'Y'
                INST_NM: string
                INST_NO: number
                MBER_NO: number
                MBTLNUM: string
                MBTLNUM_CRTFC_AT: 'Y' | 'N'
                NM: string
                REGIST_DT: number
                SEXDSTN: '남' | '여'
                USID: string
            }>
            CLSDR_CODE: string
            INST_HIST_LIST: []
            INST_NM: string
            INST_NO: number
            INST_TY_CODE: 'M' | 'F'
            INST_TY_CODE_NM: string
            LOWER_INST_CNT: number
            MIDDLE_INST_NM: string | null
            MIDDLE_INST_NO: string | null
            NATION_CODE: string
            ORGINL_FILE_NM: string
            REPRSNT_TELNO: string
            SIGUNGU_CD: string
            SPUSE_STPLAT_AT: 'Y' | 'N'
            TOP_INST_NM: string
            TOP_INST_NO: number
            UPPER_INST_NO: string | null
            USE_AT: 'Y' | 'N'
            INST_SHOW: 'Y' | 'N'
            INST_STPLAT_AT: 'Y' | 'N'
        }
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/info/${instNo}`,
        payload: {},
    })
}

/**
 * 소속 삭제
 * @param instNo
 */
export const postInstInfoDelete = ({
    instNo,
}: {
    instNo: number
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/info/${instNo}/delete`,
        payload: {
            INST_NO: instNo,
        },
    })
}

/**
 * 소속 승인 // 거부
 * @param flag
 * @param INST_NO
 * @param MBER_LIST
 * @param REJECT_RESN
 */
export const postInstPstinstConfmUpdate = ({
    flag,
    INST_NO,
    MBER_LIST,
    REJECT_RESN,
}: {
    flag: 'Y' | 'N'
    INST_NO?: string
    MBER_LIST: Array<{ MBER_NO: string }>
    REJECT_RESN: string
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    const payload = {
        INST_NO: INST_NO,
        MBER_LIST: MBER_LIST,
        REJECT_RESN: REJECT_RESN,
    }
    return _Axios_({
        method: 'post',
        url: `/inst/v1/pstinst/confm/${flag}/update`,
        payload: payload,
    })
}

/**
 * 소속에서 관리자 권한 삭제.
 * @param instNo
 * @param memberNo
 */
export const postInstChargerDelete = ({
    instNo,
    memberNo,
}: {
    instNo: number
    memberNo: number
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/charger/${instNo}/${memberNo}/delete`,
        payload: {},
    })
}

/**
 * Eap 리스트
 */
export const getInstEapInfoList = (): Promise<
    ServicesDefaultResult<EapListInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/eapInfo/list`,
        payload: {},
    })
}

/**
 * Eap 상세
 * @param registNo
 */
export const getInstEapInfoView = ({
    registNo,
}: {
    registNo: string
}): Promise<ServicesDefaultResult<EapDetailInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/eapInfo/view/${registNo}`,
        payload: {},
    })
}

/**
 * Eap 등록
 * @param INST_NO
 * @param MIND_YN
 * @param MIND_CURRENT_COUNT
 * @param MIND_MAX_COUNT
 * @param MIND_URL
 * @param MIND_CODE
 * @param HEALTH_YN
 * @param HEALTH_CURRENT_COUNT
 * @param HEALTH_MAX_COUNT
 * @param HEALTH_URL
 * @param START_DE
 * @param END_DE
 * @param IS_LIVE
 */
export const postInstEapInfoAdd = ({
    INST_NO,
    MIND_YN,
    MIND_CURRENT_COUNT,
    MIND_MAX_COUNT,
    MIND_URL,
    MIND_CODE,
    HEALTH_YN,
    HEALTH_CURRENT_COUNT,
    HEALTH_MAX_COUNT,
    HEALTH_URL,
    START_DE,
    END_DE,
    IS_LIVE,
}: {
    INST_NO: string
    MIND_YN: string | 'N' | 'Y'
    MIND_CURRENT_COUNT: string
    MIND_MAX_COUNT: string
    MIND_URL: string
    MIND_CODE: string
    HEALTH_YN: string | 'N' | 'Y'
    HEALTH_CURRENT_COUNT: string
    HEALTH_MAX_COUNT: string
    HEALTH_URL: string
    START_DE: string
    END_DE: string
    IS_LIVE: string | 'Y' | 'N'
}): Promise<ServicesDefaultResult<EapDetailInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/eapInfo/add`,
        payload: {
            INST_NO: INST_NO,
            MIND_YN: MIND_YN,
            MIND_CURRENT_COUNT: MIND_CURRENT_COUNT,
            MIND_MAX_COUNT: MIND_MAX_COUNT,
            MIND_URL: MIND_URL,
            MIND_CODE: MIND_CODE,
            HEALTH_YN: HEALTH_YN,
            HEALTH_CURRENT_COUNT: HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT: HEALTH_MAX_COUNT,
            HEALTH_URL: HEALTH_URL,
            START_DE: START_DE,
            END_DE: END_DE,
            IS_LIVE: IS_LIVE,
        },
    })
}

/**
 * Eap 수정
 * @param EAP_INST_REGISTER_NO
 * @param INST_NO
 * @param MIND_YN
 * @param MIND_CURRENT_COUNT
 * @param MIND_MAX_COUNT
 * @param MIND_URL
 * @param MIND_CODE
 * @param HEALTH_YN
 * @param HEALTH_CURRENT_COUNT
 * @param HEALTH_MAX_COUNT
 * @param HEALTH_URL
 * @param START_DE
 * @param END_DE
 * @param IS_LIVE
 */
export const postInstEapInfoUpdate = ({
    EAP_INST_REGISTER_NO,
    INST_NO,
    MIND_YN,
    MIND_CURRENT_COUNT,
    MIND_MAX_COUNT,
    MIND_URL,
    MIND_CODE,
    HEALTH_YN,
    HEALTH_CURRENT_COUNT,
    HEALTH_MAX_COUNT,
    HEALTH_URL,
    START_DE,
    END_DE,
    IS_LIVE,
}: {
    EAP_INST_REGISTER_NO: string
    INST_NO: string
    MIND_YN: string | 'Y' | 'N'
    MIND_CURRENT_COUNT: string
    MIND_MAX_COUNT: string
    MIND_URL: string
    MIND_CODE: string
    HEALTH_YN: string | 'Y' | 'N'
    HEALTH_CURRENT_COUNT: string
    HEALTH_MAX_COUNT: string
    HEALTH_URL: string
    START_DE: string
    END_DE: string
    IS_LIVE: string | 'Y' | 'N'
}): Promise<ServicesDefaultResult<null>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/eapInfo/update`,
        payload: {
            EAP_INST_REGISTER_NO: EAP_INST_REGISTER_NO,
            INST_NO: INST_NO,
            MIND_YN: MIND_YN,
            MIND_CURRENT_COUNT: MIND_CURRENT_COUNT,
            MIND_MAX_COUNT: MIND_MAX_COUNT,
            MIND_URL: MIND_URL,
            MIND_CODE: MIND_CODE,
            HEALTH_YN: HEALTH_YN,
            HEALTH_CURRENT_COUNT: HEALTH_CURRENT_COUNT,
            HEALTH_MAX_COUNT: HEALTH_MAX_COUNT,
            HEALTH_URL: HEALTH_URL,
            START_DE: START_DE,
            END_DE: END_DE,
            IS_LIVE: IS_LIVE,
        },
    })
}

/**
 * eap 삭제
 * @param eapNo
 */
export const postInstEapInfoDelete = ({
    eapNo,
}: {
    eapNo: string
}): Promise<ServicesDefaultResult<null>> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/eapInfo/delete/${eapNo}`,
        payload: null,
    })
}
