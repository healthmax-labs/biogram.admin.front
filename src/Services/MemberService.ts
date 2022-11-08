import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { PstinstInfoItemInterface } from '@Type/MemberTypes'

/**
 * 소속 리스트
 */
export function getPstinst(): Promise<
    ServicesDefaultResult<{
        PSTINST_INFO_LIST: PstinstInfoItemInterface[]
    }>
> {
    return _Axios_({
        method: 'get',
        url: '/mber/v1/pstinst',
        payload: {},
    })
}
