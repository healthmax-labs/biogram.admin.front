import { _Axios_ } from '@Modules'
import { ServicesDefaultResult, INSTDEPT_LIST } from '@Type/CommonTypes'

export function getList({
    CUR_PAGE,
    INST_NO,
    ITEM_COUNT,
    SEARCH_KEY,
}: {
    CUR_PAGE: number
    INST_NO: number
    ITEM_COUNT: number
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        INSTDEPT_LIST: INSTDEPT_LIST[]
        INST_NO: number
        TOT: number
        TOTAL_PAGE_CNT: number
    }>
> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _Axios_({
        method: 'post',
        url: '/mng/v1/instdept/list',
        payload: {
            CUR_PAGE,
            INST_NO,
            ITEM_COUNT,
            SEARCH_KEY,
        },
    })
}
