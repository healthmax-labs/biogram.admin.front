import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { BrftrCmprListItemInterface } from '@Type/BrftrCmprTypes'

/**
 * 위험요인현황 리스트
 */
export function getBrftrCmprList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    BGNDE,
    ENDDE,
}: {
    CUR_PAGE: number
    INST_NO: number
    SEARCH_KEY: string
    BGNDE: string
    ENDDE: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        MESURE_BRFTR_CMPR_INFO_LIST: BrftrCmprListItemInterface[]
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
