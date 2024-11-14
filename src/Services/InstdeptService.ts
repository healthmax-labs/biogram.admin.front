import { _Axios_ } from '@Modules'
import { InstdeptListInterface, ServicesDefaultResult } from '@Type/CommonTypes'
import _ from 'lodash'

export function getInstdeptList({
    CUR_PAGE,
    INST_NO,
    ITEM_COUNT,
    SEARCH_KEY,
}: {
    CUR_PAGE: number
    INST_NO: string
    ITEM_COUNT: number
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        INSTDEPT_LIST: InstdeptListInterface[]
        INST_NO: number
        TOT: number
        TOTAL_PAGE_CNT: number
    }>
> {
    const payload: {
        CUR_PAGE: number
        INST_NO?: string
        ITEM_COUNT: number
        SEARCH_KEY: string
    } = {
        CUR_PAGE: CUR_PAGE,
        INST_NO: INST_NO,
        ITEM_COUNT: ITEM_COUNT,
        SEARCH_KEY: SEARCH_KEY,
    }

    if (_.isEmpty(payload.INST_NO)) {
        delete payload.INST_NO
    }

    return _Axios_({
        method: 'post',
        url: '/mng/v1/instdept/list',
        payload: payload,
    })
}
