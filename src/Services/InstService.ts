import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    InstInfoInterface,
    InstJoinListItemInterface,
    InstListInterface,
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
    CUR_PAGE: string
    INST_NO: string
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        PSTINST_REQUEST_INFO_LIST: InstJoinListItemInterface[]
        TOTAL_COUNT: number
    }>
> => {
    let payload: {
        INST_NO?: string
        SEARCH_KEY: string
    } = {
        INST_NO: INST_NO,
        SEARCH_KEY: SEARCH_KEY,
    }

    if (_.isEmpty(payload.INST_NO)) {
        payload = _.pick(payload, 'SEARCH_KEY')
    }

    return _Axios_({
        method: 'post',
        url: '/inst/v1/request/list/' + CUR_PAGE,
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
