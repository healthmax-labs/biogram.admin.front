/**
 * 개발 디버그.
 * @param e
 * @constructor
 */
export const DEBUG = (e: any) => {
    console.debug('%c::DEBUG::', 'color: green; font-weight: bold;', e)
}

export const COLORLOG = (
    color: 'success' | 'info' | 'error' | 'warning',
    message: string
): void => {
    switch (color) {
        case 'success':
            console.log('%c' + message, 'color: Green')
            break
        case 'info':
            console.log('%c' + message, 'color: #42FF33')
            break
        case 'error':
            console.log('%c' + message, 'color: Red')
            break
        case 'warning':
            console.log('%c' + message, 'color: Orange')
            break
        default:
            console.log('%c' + message, 'color: Green')
    }

    return
}

/**
 * 로컬 스토리지 매니저.
 */
export const storageManager = {
    set: (key: string, object: any) => {
        if (!localStorage) return
        localStorage[key] =
            typeof object === 'string' ? object : JSON.stringify(object)
    },
    get: (key: string) => {
        if (!localStorage) return null

        if (!localStorage[key]) {
            return null
        }

        try {
            return JSON.parse(localStorage[key])
        } catch (e) {
            return localStorage[key]
        }
    },
    remove: (key: string) => {
        if (!localStorage) return null

        if (localStorage[key]) {
            localStorage.removeItem(key)
        }
    },
}

/**
 * 로컬 쿠키 매니저.
 */
export const cookieManager = {
    set: (cname: string, cvalue: string, hours = 24) => {
        const d = new Date()
        d.setTime(d.getTime() + hours * 60 * 60 * 1000) // (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    get: (cname: string) => {
        const name = cname + '='
        const ca = document.cookie.split(';')

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
        }

        return ''
    },
    remove: (cname: string) => {
        const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        document.cookie = cname + '=;' + expires + ';path=/'
    },
}

export function saveRefreshToken({
    TOKEN_INFO,
    VTOKEN_INFO,
}: {
    TOKEN_INFO: string
    VTOKEN_INFO: string
}): void {
    storageManager.set('TOKEN_INFO', TOKEN_INFO)
    storageManager.set('VTOKEN_INFO', VTOKEN_INFO)
}

export function getAccessToken(): string {
    return storageManager.get('TOKEN_INFO')
}

export function getRefreshToken(): string {
    return storageManager.get('VTOKEN_INFO')
}

export function removeLoginToken(): void {
    storageManager.remove('TOKEN_INFO')
    storageManager.remove('VTOKEN_INFO')
}
