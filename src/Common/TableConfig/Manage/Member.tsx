import React from 'react'
import { ListTableStyle } from '@Style/Pages/MemberPageStyles'

// 회원 테이블 데이터
import {
    ConsultInfoListItemInterface,
    MemberInfoListItemInterface,
} from '@Type/MemberTypes'

export type tableListItemInterface = MemberInfoListItemInterface

// 상담회원 테이블 데이터
export type ConsulttableListItemInterface = ConsultInfoListItemInterface

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
        indexKey: `SNDNG_NO`,
        bgState: true,
    },
    Columns: [
        [
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

// 회원 테이블 설정.
export const MemberTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `이름`,
                key: `NM`,
                textAlign: `left`,
            },
            {
                name: `아이디`,
                key: `USID`,
                textAlign: `left`,
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
                component: ({ el }: { el: MemberInfoListItemInterface }) => {
                    return (
                        <ListTableStyle.MbtlnumCell CRTFC={el.MBTLNUM_CRTFC_AT}>
                            {el.MBTLNUM}
                        </ListTableStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN_NM`,
            },
            {
                name: `소속`,
                key: `INST_NM`,
            },
            {
                name: `가입일`,
                key: `REGIST_DT`,
            },
            {
                name: `최근방문일`,
                key: `CONECT_DT`,
            },
            {
                name: `보유캐시`,
                key: `TOT_CASH`,
            },
            {
                name: `당월미션포인트`,
                key: `ACCML_POINT`,
            },
        ],
    ],
    Lists: [],
}

// 테이블 설정.
export const ConsultTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `회원번호`,
                key: `MBER_NO`,
            },
            {
                name: `이름`,
                key: `NM`,
            },
            {
                name: `아이디`,
                key: `USID`,
                textAlign: 'left',
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
                component: ({ el }: { el: ConsultInfoListItemInterface }) => {
                    return (
                        <ListTableStyle.MbtlnumCell CRTFC={el.MBTLNUM_CRTFC_AT}>
                            {el.MBTLNUM}
                        </ListTableStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN_NM`,
            },
            {
                name: `소속`,
                key: `INST_NM`,
            },
            {
                name: `최근측정일`,
                key: `MESURE_DT`,
            },
            {
                name: `휘험요인`,
                key: `RISK_FCTR`,
            },
        ],
    ],
    Lists: [],
}

//메세지 발송 현황 테이블 설정.
export const MsgBookTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
        indexKey: 'SNDNG_NO',
        bgState: true,
    },
    Columns: [
        [
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
    ],
    Lists: [],
}
