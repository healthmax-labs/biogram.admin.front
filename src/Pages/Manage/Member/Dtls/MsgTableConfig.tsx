// 메세지 발송 현황 테이블 데이터
export interface MsgSendTableListItemInterface {
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

//메세지 발송 현황 테이블 설정.
export const MsgSendTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `발송결과`,
            key: `SNDNG_SF`,
        },
        {
            name: `송신일`,
            key: `SNDNGDE`,
        },
        {
            name: `수신자`,
            key: `RCVER`,
        },
        {
            name: `수신번호`,
            key: `RCV_NO`,
        },
        {
            name: `메시지`,
            key: `SE`,
        },
        {
            name: `등록일`,
            key: `RGSDE`,
        },
    ],
    Lists: [],
}

// 메세지 발송 현황 테이블 데이터
export interface MsgBookTableListItemInterface {
    SNDNG_NO: null | string
    SNDNGDE: null | string
    SENDER: null | string
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

//메세지 발송 현황 테이블 설정.
export const MsgBookTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
        {
            name: `발송결과`,
            key: `SNDNG_SF`,
        },
        {
            name: `송신일`,
            key: `SNDNGDE`,
        },
        {
            name: `수신자`,
            key: `RCVER`,
        },
        {
            name: `수신번호`,
            key: `RCV_NO`,
        },
        {
            name: `메시지`,
            key: `SE`,
        },
        {
            name: `등록일`,
            key: `RGSDE`,
        },
    ],
    Lists: [],
}
