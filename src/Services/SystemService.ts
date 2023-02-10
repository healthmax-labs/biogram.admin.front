import { _Axios_ } from '@Modules'
import { ConHistoryInterface, ServicesDefaultResult } from '@Type/CommonTypes'

// 시스템 서버 체크.
export function systemHealthCheck(): Promise<
    ServicesDefaultResult<{ CON_HISTORY: ConHistoryInterface[] }>
> {
    return _Axios_({
        method: 'get',
        url: '/common/v1/alive',
        payload: {},
    })
}
