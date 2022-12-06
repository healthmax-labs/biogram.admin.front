import { _Axios_ } from '@Modules'
import {
    AuthorMenuInterface,
    AuthorMenuItemInterface,
    LoginInfoInterface,
    LoginInterface,
    ServicesDefaultResult,
} from '@Type/CommonTypes'

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

export function logininfo(): Promise<
    ServicesDefaultResult<{
        CHARGER_INFO: LoginInfoInterface
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mng/v1/logininfo/list',
        payload: {},
    })
}

// 권한별 메뉴.
export function getAuthorMenu({
    authCode,
    menuCode,
}: {
    authCode: string
    menuCode: string
}): Promise<
    ServicesDefaultResult<AuthorMenuInterface<AuthorMenuItemInterface>>
> {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/charger/author/mngmenu/${authCode}/${menuCode}`,
        payload: {},
    })
}
