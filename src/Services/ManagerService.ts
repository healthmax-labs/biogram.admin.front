import { _Axios_ } from '@Modules'
import {
    ServicesDefaultResult,
    StplatKndCodeType,
    StplatSeCodeType,
} from '@Type/CommonTypes'
import { StplatInfoInterface, StplatListItemInterface } from '@Type/MangerTypes'

/**
 * 전후비교 현황 리스트
 * @param CUR_PAGE
 */
export const getStplatList = ({
    CUR_PAGE,
}: {
    CUR_PAGE: number
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        STPLAT_MANAGE_INFO_LIST: StplatListItemInterface[]
        TOTAL_COUNT: number
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/common/v1/stplat/list/${CUR_PAGE}`,
        payload: {},
    })
}

/**
 * 이용약관 상세 조회
 * {{serverName}}/common/v1/stplat/:stplat_se_code/:stplat_knd_code/:stplat_sn
 * stplat_se_code : 약관구분코드
 * stplat_knd_code : 약관종류코드
 * stplat_sn : 약관 일련번호(생략가능)
 */
export const getCommonStplatStplatSeCodeStplatKndCodeStplatSn = ({
    stplatSeCode,
    stplatKndCode,
    stplatSn,
}: {
    stplatSeCode: StplatSeCodeType
    stplatKndCode: StplatKndCodeType
    stplatSn: number
}): Promise<ServicesDefaultResult<StplatInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/stplat/${stplatSeCode}/${stplatKndCode}/${stplatSn}`,
        payload: {},
    })
}

/**
 * 약관 수정.
 * @param STPLAT_DC
 * @param STPLAT_SE_CODE
 * @param STPLAT_KND_CODE
 * @param STPLAT_SN
 * @param STPLAT_CHANGE_RESN
 */
export const postCommonStplatUpdate = ({
    STPLAT_DC,
    STPLAT_SE_CODE,
    STPLAT_KND_CODE,
    STPLAT_SN,
    STPLAT_CHANGE_RESN,
}: {
    STPLAT_SE_CODE: StplatSeCodeType
    STPLAT_KND_CODE: StplatKndCodeType
    STPLAT_CHANGE_RESN: string
    STPLAT_DC: string
    STPLAT_SN: number
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/v1/stplat/update`,
        payload: {
            STPLAT_DC,
            STPLAT_SE_CODE,
            STPLAT_KND_CODE,
            STPLAT_SN,
            STPLAT_CHANGE_RESN,
        },
    })
}

/**
 * 약관 개정
 * @param STPLAT_CHANGE_DE
 * @param STPLAT_CHANGE_RESN
 * @param STPLAT_DC
 * @param STPLAT_KND_CODE
 * @param STPLAT_SE_CODE
 */
export const postCommonStplat = ({
    STPLAT_CHANGE_DE,
    STPLAT_CHANGE_RESN,
    STPLAT_DC,
    STPLAT_KND_CODE,
    STPLAT_SE_CODE,
}: {
    STPLAT_CHANGE_DE: string
    STPLAT_CHANGE_RESN: string
    STPLAT_DC: string
    STPLAT_KND_CODE: string
    STPLAT_SE_CODE: string
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/v1/stplat`,
        payload: {
            STPLAT_CHANGE_DE,
            STPLAT_CHANGE_RESN,
            STPLAT_DC,
            STPLAT_KND_CODE,
            STPLAT_SE_CODE,
        },
    })
}

/**
 * 이용약관 삭제 처리.
 * @param STPLAT_DC
 * @param STPLAT_SE_CODE
 * @param STPLAT_KND_CODE
 * @param STPLAT_SN
 * @param STPLAT_CHANGE_RESN
 */
export const postCommonStplatDelete = ({
    STPLAT_DC,
    STPLAT_SE_CODE,
    STPLAT_KND_CODE,
    STPLAT_SN,
    STPLAT_CHANGE_RESN,
}: {
    STPLAT_SE_CODE: StplatSeCodeType
    STPLAT_KND_CODE: StplatKndCodeType
    STPLAT_CHANGE_RESN: string
    STPLAT_DC: string
    STPLAT_SN: number
}): Promise<ServicesDefaultResult<{ test: false }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/v1/stplat/update`,
        payload: {
            STPLAT_DC,
            STPLAT_SE_CODE,
            STPLAT_KND_CODE,
            STPLAT_SN,
            STPLAT_CHANGE_RESN,
            USE_AT: 'N',
        },
    })
}
