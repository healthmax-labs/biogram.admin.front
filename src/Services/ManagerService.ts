import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { StplatListItemInterface } from '@Type/MangerTypes'

/**
 * 전후비교 현황 리스트
 */
export function getStplatList({ CUR_PAGE }: { CUR_PAGE: number }): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        STPLAT_MANAGE_INFO_LIST: StplatListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/common/v1/stplat/list/' + CUR_PAGE,
        payload: {},
    })
}
