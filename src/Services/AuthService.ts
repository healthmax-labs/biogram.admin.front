import { _Axios_ } from '@Modules'
import { LoginInterface, ServicesDefaultResult } from '@Type/CommonTypes'

/**
 * 로그인
 * @param payload
 */

export function login(payload: {
    usid: string
    pass: string
    CLIENT_IP: string
}): Promise<ServicesDefaultResult<LoginInterface>> {
    return _Axios_({
        method: 'post',
        url: '/mber/v1/charger/login/id',
        payload: payload,
    })
}
