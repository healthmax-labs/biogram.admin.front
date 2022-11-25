import { _Axios_ } from '@Modules'
import { ServicesDefaultResult, StplatInfoItem } from '@Type/CommonTypes'

// 회원 약관 정보
export const getStplatInfo = ({
    instNo,
}: {
    instNo: string
}): Promise<
    ServicesDefaultResult<{
        STPLAT_INFO_LIST: StplatInfoItem[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/stplat/info/${instNo}`,
        payload: {},
    })
}

/**
 * 소속 변경 시 사용할 약관 정보.
 * @param infoNo
 */
export const getCommonThptyStplatInfo = ({
    infoNo,
}: {
    infoNo: number
}): Promise<
    ServicesDefaultResult<{
        THPTY_STPLAT_INFO_LIST: StplatInfoItem[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/thpty/stplat/info/${infoNo}`,
        payload: {},
    })
}
