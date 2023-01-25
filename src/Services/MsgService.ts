import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { MsgSendListItemInterface } from '@Type/MsgTypes'

/**
 * 메세지 발송 현황 리스트
 */
export function getMsgSendList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    FROM_MONTH,
    FROM_DAY,
    TO_DAY,
    SNDNG_FAILR,
    SNDNG_STDR,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    FROM_MONTH: string
    FROM_DAY: string
    TO_DAY: string
    SNDNG_FAILR: string
    SNDNG_STDR: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        SMS_INFO_LIST: MsgSendListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mber/v1/list/msg/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            FROM_MONTH,
            FROM_DAY,
            TO_DAY,
            SNDNG_FAILR,
            SNDNG_STDR,
        },
    })
}

/**
 * 메세지 예약 현황 리스트
 */
export function getMsgBookList({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
    FROM_DAY,
    TO_DAY,
    SNDNG_STDR,
}: {
    CUR_PAGE: number
    INST_NO: string
    SEARCH_KEY: string
    FROM_DAY: string
    TO_DAY: string
    SNDNG_STDR: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        SMS_INFO_LIST: MsgSendListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/mber/v1/list/smsresve/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
            FROM_DAY,
            TO_DAY,
            SNDNG_STDR,
        },
    })
}
