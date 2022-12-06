import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { NoticeListItemInterface } from '@Type/NoticeTypes'

/**
 * 게시판 리스트
 */
export function getNoticeSendList({
    CUR_PAGE,
    ITEM_COUNT,
    TRGET_SVC_CODE,
    USE_AT,
}: {
    CUR_PAGE: number
    ITEM_COUNT: number
    TRGET_SVC_CODE: number
    USE_AT: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        NOTICE_LIST: NoticeListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/hp/v1/cpnoti/',
        payload: {
            CUR_PAGE,
            ITEM_COUNT,
            TRGET_SVC_CODE,
            USE_AT,
        },
    })
}
