import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'

export function systemHealthCheck(): Promise<
    ServicesDefaultResult<{
        TOKEN_INFO: string
        TOKEN_LIMIT_TIME: number
        VTOKEN_INFO: string
        VTOKEN_LIMIT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/hp/v1/cpemp',
        payload: {
            CUR_PAGE: 1,
            ITEM_COUNT: 5,
            EMP_CODE: 0,
            USE_AT: 'A',
        },
    })
}
