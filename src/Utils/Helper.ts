import { LoginTokenInterface } from '@CommonTypes'
import Routers from '@Routers'

/**
 * 개발 디버그.
 * @param e
 * @constructor
 */
export const DEBUG = (e: any) => {
    console.debug('%c::DEBUG::', 'color: green; font-weight: bold;', e)
}

/**
 * 컬러 로그
 * @param color
 * @param message
 * @constructor
 */
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
 * localStorage 체크
 */
export const isLocalStorageEnabled = () => {
    try {
        const key = `__storage__test`
        window.localStorage.setItem(key, '')
        window.localStorage.removeItem(key)
        return true
    } catch (e) {
        return false
    }
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

/**
 * localstorage, cookie 매니져
 */
export const storageMaster = {
    set: (key: string, object: any) => {
        if (isLocalStorageEnabled()) {
            storageManager.set(key, object)
        } else {
            cookieManager.set(key, object)
        }
    },
    get: (key: string) => {
        if (isLocalStorageEnabled()) {
            return storageManager.get(key)
        } else {
            return cookieManager.get(key)
        }
    },
    remove: (key: string) => {
        if (isLocalStorageEnabled()) {
            storageManager.remove(key)
        } else {
            cookieManager.remove(key)
        }
    },
}

/**
 * 로그인 토큰 저장.
 * @param TOKEN_INFO
 * @param VTOKEN_INFO
 * @param TOKEN_LIMIT_TIME
 * @param AUTHORIZE_CODE
 */
export const saveLoginToken = ({
    TOKEN_INFO,
    VTOKEN_INFO,
    TOKEN_LIMIT_TIME,
    AUTHORIZE_CODE = null,
}: LoginTokenInterface) => {
    storageMaster.set('TOKEN_INFO', TOKEN_INFO)
    storageMaster.set('VTOKEN_INFO', VTOKEN_INFO)
    storageMaster.set('TOKEN_LIMIT_TIME', TOKEN_LIMIT_TIME)
    storageMaster.set('AUTHORIZE_CODE', AUTHORIZE_CODE)
}

/**
 * 리프레시 토큰 저장.
 * @param TOKEN_INFO
 * @param TOKEN_LIMIT_TIME
 * @param AUTHORIZE_CODE
 */
export const saveRefreshToken = ({
    TOKEN_INFO,
    TOKEN_LIMIT_TIME,
    AUTHORIZE_CODE,
}: {
    TOKEN_INFO: string | null
    TOKEN_LIMIT_TIME: number | 0
    AUTHORIZE_CODE: string | null
}): void => {
    storageMaster.set('TOKEN_INFO', TOKEN_INFO)
    storageMaster.set('TOKEN_LIMIT_TIME', TOKEN_LIMIT_TIME)
    storageMaster.set('AUTHORIZE_CODE', AUTHORIZE_CODE)
}

/**
 * TOKEN_INFO 리턴
 */
export const getAccessToken = (): string => {
    return storageMaster.get('TOKEN_INFO')
}

/**
 * VTOKEN_INFO
 */
export const getVtokenInfoToken = (): string => {
    return storageMaster.get('VTOKEN_INFO')
}

/**
 * 토큰정보 리턴
 */
export const getTokenInfo = (): {
    TOKEN_INFO: string
    VTOKEN_INFO: string
    TOKEN_LIMIT_TIME: number
    AUTHORIZE_CODE: string | null
} => {
    return {
        TOKEN_INFO: storageMaster.get('TOKEN_INFO'),
        VTOKEN_INFO: storageMaster.get('VTOKEN_INFO'),
        TOKEN_LIMIT_TIME: storageMaster.get('TOKEN_LIMIT_TIME'),
        AUTHORIZE_CODE: storageMaster.get('AUTHORIZE_CODE'),
    }
}

/**
 * 로그인 토큰 정보 삭제.
 */
export const removeLoginToken = (): void => {
    storageMaster.remove('TOKEN_INFO')
    storageMaster.remove('VTOKEN_INFO')
    storageMaster.remove('TOKEN_LIMIT_TIME')
    storageMaster.remove('AUTHORIZE_CODE')
}

export const removeLoginExpirein = (): void => {
    storageMaster.remove('LOGIN_EXPIREIN')
}

/**
 * router pathname 으로 메뉴 이름 리턴
 * @param pathName
 */
export const getPathNameToMenuInfo = (
    pathName: string
): { name: string; reloadButton: boolean } | null => {
    const chIdex = Routers.Main.findIndex(el => el.pathName === pathName)
    if (chIdex === -1) {
        return null
    }
    const findRouter = Routers.Main[chIdex]
    return {
        name: findRouter.name,
        reloadButton: findRouter.reloadButton,
    }
}

/**
 * 60분 추가 시간 timestamp
 */
export const add60Minutes = (time: number): number => {
    const d1 = new Date(),
        d2 = new Date(d1)
    d2.setMinutes(d1.getMinutes() + time)
    return d2.getTime()
}

// 로그인 유지 시간 체크
export const checkRemainingTime = (): boolean => {
    const end: number = storageMaster.get('LOGIN_EXPIREIN')
    const now = new Date().getTime()
    return end > now
}

/**
 * 페이지 상단 남은 시간 리턴
 */
export const getRemainingTime = ():
    | {
          day: number
          hour: number
          min: number
          sec: number
      }
    | false => {
    const end: number = storageMaster.get('LOGIN_EXPIREIN')
    const _second = 1000
    const _minute = _second * 60
    const _hour = _minute * 60
    const _day = _hour * 24

    const now = new Date().getTime()
    const distance = end - now
    if (distance < 0) {
        return false
    }
    const days = Math.floor(distance / _day)
    const hours = Math.floor((distance % _day) / _hour)
    const minutes = Math.floor((distance % _hour) / _minute)
    const seconds = Math.floor((distance % _minute) / _second)

    return {
        day: days,
        hour: hours,
        min: minutes,
        sec: seconds,
    }
}

/**
 * 숫자만 리턴
 * @param str
 */
export const getOnlyNumber = (str: string) => str.replace(/[^0-9]/g, '')

/**
 * 휴대폰 번호 포맷 변경.
 * @param str
 */
export const phoneFormat = (str: string) => {
    // 특수문자 제거
    const value = str.replace(/[^0-9]/g, '')

    // 00 OR 000 지정
    const firstLength = value.length > 9 ? 3 : 2

    // ({2,3}) - ({3,4}) - ({4})
    return [
        // 첫번째 구간 (00 or 000)
        value.slice(0, firstLength),
        // 두번째 구간 (000 or 0000)
        value.slice(firstLength, value.length - 4),
        // 남은 마지막 모든 숫자
        value.slice(value.length - 4),
    ].join('-')
}

export const formatPhoneNumber = (input: string) => {
    const cleanInput = input.replaceAll(/[^0-9]/g, '')
    let result: string
    const length = cleanInput.length
    if (length === 8) {
        result = cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2')
    } else if (cleanInput.startsWith('02') && (length === 9 || length === 10)) {
        result = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3')
    } else if (
        !cleanInput.startsWith('02') &&
        (length === 10 || length === 11)
    ) {
        result = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
    } else {
        result = ''
    }

    return result
}

/**
 * gmt 시간 변경
 * @param time
 */
export const gmtTimeToTimeObject = (
    time: Date
): {
    year: number
    month: number
    monthPad: string
    day: number
    dayPad: string
    hour: number
    hourPad: string
    minute: number
    minutePad: string
    second: number
    secondPad: string
} => {
    const date = new Date(time)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return {
        year: date.getFullYear(),
        month: month,
        monthPad: String(month).padStart(2, '0'),
        day: day,
        dayPad: String(day).padStart(2, '0'),
        hour: hour,
        hourPad: String(hour).padStart(2, '0'),
        minute: minute,
        minutePad: String(minute).padStart(2, '0'),
        second: second,
        secondPad: String(second).padStart(2, '0'),
    }
}

/**
 * 20221214112300 -> 2022-12-14 11:23:00
 * 14자리 날짜 변환
 * @param str
 */
export const timeStringParse = (str: string): string | boolean => {
    if (str.length !== 14) return false

    return str.replace(
        /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
        '$1-$2-$3 $4:$5:$6'
    )
}

/**
 * 20221214112300 -> 2022-12-14
 * @param str
 */
export const timeStringDateParse = (str: string): string | boolean => {
    if (str.length !== 14) return false

    return str.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3')
}

export const timeStringSmapDateParse = (date: string): string | boolean => {
    if (date.length !== 14) return false

    return `${date.substring(2, 4)}-${date.substring(4, 6)}-${date.substring(
        6,
        8
    )}`
}

/**
 * 날자에 자동 하이픈
 * 20221227 -> 2022-12-27
 * @param date
 */
export const dateInsertHypen = (date: string): string | boolean => {
    if (date.length !== 8) return false

    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
        6,
        8
    )}`
}

/**
 * 20221210
 * 한달전 날짜.
 */
export const getOneMonthAgo = () => {
    const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
    )
    const year = date.getFullYear()
    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month
    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    return year + '' + month + '' + day
}

/**
 * 20221210
 * 1년전 날짜.
 */
export const getOneYearAgo = () => {
    const date = new Date(
        new Date().getFullYear() - 1,
        new Date().getMonth(),
        new Date().getDate()
    )
    const year = date.getFullYear()
    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month
    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    return year + '' + month + '' + day
}

/**
 * 20221210
 * 오늘 날짜.
 */
export const getNowDate = (): string => {
    const date = new Date()
    const year = date.getFullYear()

    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month

    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    return year + '' + month + '' + day
}

/**
 * EndDate 기준, unit 별 이전 날짜
 * 20220101
 * @param endDate
 * @param unit
 */
export const getDateMonthUnit = (endDate: Date, unit: number) => {
    const date = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - unit,
        endDate.getDate()
    )
    const year = date.getFullYear()
    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month
    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    return year + '' + month + '' + day
}

export const getDateDayUnit = (unit: number) => {
    const date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - unit
    )
    const year = date.getFullYear()
    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month
    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    return year + '' + month + '' + day
}

/**
 * 20221210
 * 한달전 날짜.
 */
export const getSearchDateObject = (): {
    start: { year: string; month: string; day: string }
    end: { year: string; month: string; day: string }
} => {
    const startDate = getOneMonthAgo()
    const endDate = getNowDate()

    return {
        start: {
            year: startDate.substring(0, 4),
            month: startDate.substring(4, 6),
            day: startDate.substring(6, 8),
        },
        end: {
            year: endDate.substring(0, 4),
            month: endDate.substring(4, 6),
            day: endDate.substring(6, 8),
        },
    }
}

/**
 * 20221100061010
 * 오늘 날짜 상세
 */
export const getNowDateDetail = () => {
    const date = new Date()
    const year = date.getFullYear()

    let month: string | number = 1 + date.getMonth()
    month = month >= 10 ? month : '0' + month

    let day: string | number = date.getDate()
    day = day >= 10 ? day : '0' + day

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        year +
        '' +
        month +
        '' +
        day +
        '' +
        String(hour).padStart(2, '0') +
        '' +
        String(minute).padStart(2, '0') +
        '' +
        String(second).padStart(2, '0')
    )
}

/**
 * DatePickerDate 용 날짜로 변경
 * @param dateString
 */
export const changeDatePickerDate = (dateString: string): Date => {
    if (dateString.length === 6) {
        const year = dateString.substring(0, 4)
        const month = dateString.substring(4, 6)
        const day = dateString.substring(6, 8)

        return new Date(Number(year), Number(Number(month) - 1), Number(day))
    }

    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    const hour = dateString.substring(8, 10)
    const minute = dateString.substring(10, 12)
    const second = dateString.substring(12, 14)

    return new Date(
        Number(year),
        Number(Number(month) - 1),
        Number(day),
        Number(hour),
        Number(minute),
        Number(second)
    )
}

/**
 * 시간분 date object 로 변경.
 * 12:30 -> date()
 * @param date
 */
export const toDateWithOutTimeZone = (date: string) => {
    const hours = date.substring(0, 2)
    const minutes = date.substring(2, 4)

    const dt = new Date()
    dt.setHours(Number(hours))
    dt.setMinutes(Number(minutes))
    return dt
}

export const getTextLength = (str: string) => {
    let len = 0
    for (let i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++
        }
        len++
    }
    return len
}

/**
 * 숫자에 , 붙이기
 * @param num
 */
export const addComma = (num: number): string => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g
    return num.toString().replace(regexp, ',')
}
