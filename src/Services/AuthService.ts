import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'

/**
 * 로그인
 * @param payload
 */

export function login(payload: {
    usid: string
    pass: string
    CLIENT_IP: string
}): Promise<
    ServicesDefaultResult<{
        TOKEN_INFO: string
        TOKEN_LIMIT_TIME: number
        VTOKEN_INFO: string
        VTOKEN_LIMIT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mber/v1/charger/login/id',
        payload: payload,
    })
}
