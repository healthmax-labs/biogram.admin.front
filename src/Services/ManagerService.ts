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
        url: '/common/v1/stplat/list/' + CUR_PAGE,
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
