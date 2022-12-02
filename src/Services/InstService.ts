import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { InstJoinListItemInterface } from '@Type/InstTypes'
/**
 * 소속관리 리스트
 */
export function getInstList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BGNDE,
    ENDDE,
}: {
    CUR_PAGE: string
    INST_NO: string
    SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        MESURE_BRFTR_CMPR_INFO_LIST: InstJoinListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/stats/v1/mesure/brftr_cmpr/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            BGNDE,
            ENDDE,
        },
    })
}

export function getInstJoinList({
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
> {
    return _Axios_({
        method: 'post',
        url: '/inst/v1/request/list/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
        },
    })
}
