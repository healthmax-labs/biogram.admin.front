import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { NoticeListItemInterface } from '@Type/NoticeTypes'

/**
 * 게시판 리스트
 */
export function getNoticeSendList({
    CUR_PAGE,
    ITEM_COUNT,
    REGIST_DT,
    TRGET_SVC_CODE,
    TRGET_SVC_CODE_NM,
    USE_AT,
}: {
    CUR_PAGE: number
    ITEM_COUNT: number
    REGIST_DT: string
    TRGET_SVC_CODE: number
    TRGET_SVC_CODE_NM: string
    USE_AT: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        NOTICE_LIST: NoticeListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'get',
        //url: '/hp/v1/cpnoti/',
        url: '/data/v1/notice/list/' + CUR_PAGE,
        payload: {
            CUR_PAGE,
            ITEM_COUNT,
            REGIST_DT,
            TRGET_SVC_CODE,
            TRGET_SVC_CODE_NM,
            USE_AT,
        },
    })
}
