//위험요인 현황
export interface MsgSendListItemInterface {
    SNDNG_NO: null | string
    SNDNGDE: null | string
    SENDER: null | string
    CALL_STATUS: null | string
    SNDNG_STTUS: null | string
    CN: null | string
    MBER_NO: null | string
    SNDNG_SF: null | string
    RCVER: null | string
    SE: null | string
    STATUS: null | string
    CMID: null | string
    MBTLNUM: null | string
    RGSDE: null | string
}

//위험요인 현황
export interface MsgSendListInterface {
    SMS_INFO_LIST: MsgSendListItemInterface[]
    TOTAL_COUNT: number
}
