import React from 'react'
import { ListTableItemStyle } from '@Style/Pages/MemberPageStyles'

// 회원 테이블 데이터
import {
    ConsultGroupListResultItemInterface,
    ConsultInfoListItemInterface,
    MemberInfoListItemInterface,
} from '@Type/MemberTypes'
import {
    addComma,
    dateInsertHypen,
    getOnlyNumber,
    phoneFormat,
    timeStringParse,
} from '@Helper'
import _ from 'lodash'
import Codes from '@Codes'

export type tableListItemInterface = MemberInfoListItemInterface

// 상담회원 테이블 데이터
export type ConsulttableListItemInterface = ConsultInfoListItemInterface

// 메시지 발송 현황 테이블 데이터
export interface MsgSendTableListItemInterface {
    SNDNG_NO: null | string
    SNDNGDE: null | string
    SENDER: null | string
    CALL_STATUS: null | string
    SNDNG_STTUS: null | string
    CN: null | string
    MBER_NO: null | string
    SNDNG_SF: null | string
    RECVER: null | string
    SE: null | string
    STATUS: null | string
    CMID: null | string
    MBTLNUM: null | string
    RGSDE: null | string
    MSG_TYPE_NM: null | string
}

//메시지 발송 현황 테이블 설정.
export const MsgSendTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `SNDNG_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `발송결과`,
                key: `SNDNG_STATUS`,
            },
            {
                name: `발송구분`,
                key: `MSG_TYPE_NM`,
            },
            {
                name: `발송일시`,
                key: `SNDNGDE`,
                component: ({ el }: { el: MsgSendTableListItemInterface }) => {
                    return (
                        <>
                            {_.isNull(el.SNDNGDE)
                                ? ''
                                : timeStringParse(el.SNDNGDE)}
                        </>
                    )
                },
            },
            {
                name: `수신자`,
                key: `RECVER`,
            },
            {
                name: `수신번호`,
                key: `MBTLNUM`,
                component: ({ el }: { el: MsgSendTableListItemInterface }) => {
                    return (
                        <ListTableItemStyle.MbtlnumCell CRTFC={`Y`}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableItemStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `메시지`,
                key: `CN`,
                textAlign: `left`,
            },
            {
                name: `등록일시`,
                key: `RGSDE`,
                component: ({ el }: { el: MsgSendTableListItemInterface }) => {
                    return (
                        <>
                            {_.isNull(el.RGSDE)
                                ? ''
                                : timeStringParse(el.RGSDE)}
                        </>
                    )
                },
            },
        ],
    ],
    Lists: [],
}

// 회원 테이블 설정.
export const MemberTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
        selectAll: true,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `이름`,
                key: `NM`,
                textAlign: `center`,
                cellWidth: `w0112`,
            },
            {
                name: `아이디`,
                key: `USID`,
                textAlign: `left`,
                cellWidth: `w0112`,
            },
            {
                name: `휴대폰번호`,
                key: `MBTLNUM`,
                component: ({ el }: { el: MemberInfoListItemInterface }) => {
                    return (
                        <ListTableItemStyle.MbtlnumCell
                            CRTFC={el.MBTLNUM_CRTFC_AT}>
                            {el.MBTLNUM}
                        </ListTableItemStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `성별`,
                key: `SEXDSTN_NM`,
                cellWidth: `w16`,
            },
            {
                name: `소속`,
                key: `INST_NM`,
            },
            {
                name: `내/외근직`,
                key: `WORK_TY_CODE`,
                component: ({ el }: { el: MemberInfoListItemInterface }) => {
                    return (
                        <>
                            {el.WORK_TY_CODE == 'N'
                                ? '미지정'
                                : el.WORK_TY_CODE == 'I'
                                ? '내근직'
                                : '외근직'}
                        </>
                    )
                },
                cellWidth: `w24`,
            },
            {
                name: `가입일`,
                key: `REGIST_DT`,
                component: ({ el }: { el: MemberInfoListItemInterface }) => {
                    const registDt =
                        el.REGIST_DT && !_.isEmpty(el.REGIST_DT)
                            ? getOnlyNumber(el.REGIST_DT)
                            : ''

                    if (registDt) {
                        return (
                            <>{`${registDt.substring(
                                0,
                                4
                            )}-${registDt.substring(4, 6)}-${registDt.substring(
                                6,
                                8
                            )}`}</>
                        )
                    } else {
                        return <></>
                    }
                },
            },
            {
                name: `최근방문일`,
                key: `CONECT_DT`,
            },
            {
                name: `보유캐시`,
                key: `TOT_CASH`,
                cellWidth: `w24`,
            },
            {
                name: `누적캐시적립`,
                key: `SUM_CASH_HIST`,
            },
            {
                name: `당월미션포인트`,
                key: `ACCML_POINT`,
                cellWidth: `w24`,
                component: ({ el }: { el: MemberInfoListItemInterface }) => {
                    return <>{addComma(el.ACCML_POINT)}</>
                },
            },
        ],
    ],
    Lists: [],
}

// 상담 회원 현왕.
export const ConsultTableConfig = {
    Loading: true,
    Options: {
        pagination: true,
        selectAll: true,
        indexKey: `MBER_NO`,
        bgState: true,
    },
    Columns: [
        [
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
                        <>
                            {_.isEmpty(el.MBTLNUM)
                                ? ''
                                : phoneFormat(el.MBTLNUM)}
                        </>
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
                name: `내/외근직`,
                key: `WORK_TY_CODE`,
                component: ({ el }: { el: ConsultInfoListItemInterface }) => {
                    return (
                        <>
                            {el.WORK_TY_CODE == 'N'
                                ? '미지정'
                                : el.WORK_TY_CODE == 'I'
                                ? '내근직'
                                : '외근직'}
                        </>
                    )
                },
            },
            {
                name: `최근측정일`,
                key: `MESURE_DT`,
                component: ({ el }: { el: ConsultInfoListItemInterface }) => {
                    return (
                        <>
                            {_.isEmpty(el.MESURE_DE)
                                ? ''
                                : dateInsertHypen(el.MESURE_DE)}
                        </>
                    )
                },
            },
            {
                name: `위험요인`,
                key: `RISK_FCTR`,
            },
        ],
    ],
    Lists: [],
}

// 메시지 예약 현황 테이블 데이터
export interface MsgBookTableListItemInterface {
    SNDNG_NO: null | string
    SNDNGDE: null | string
    SENDER: null | string
    CN: null | string
    MBER_NO: null | string
    SNDNG_SF: null | string
    RECVER: null | string
    SE: null | string
    STATUS: null | string
    CMID: null | string
    MBTLNUM: null | string
    RGSDE: null | string
}

//메시지 예약 현황 테이블 설정.
export const MsgBookTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
        indexKey: 'CMID',
        bgState: true,
    },
    Columns: [
        [
            {
                name: `예약발송일시`,
                key: `SNDNGDE`,
                component: ({ el }: { el: MsgBookTableListItemInterface }) => {
                    return (
                        <>
                            {_.isNull(el.SNDNGDE)
                                ? ''
                                : timeStringParse(el.SNDNGDE)}
                        </>
                    )
                },
            },
            {
                name: `수신자`,
                key: `RCVER`,
            },
            {
                name: `수신번호`,
                key: `MBTLNUM`,
                component: ({ el }: { el: MsgBookTableListItemInterface }) => {
                    return (
                        <ListTableItemStyle.MbtlnumCell CRTFC={`Y`}>
                            {el.MBTLNUM ? phoneFormat(el.MBTLNUM) : el.MBTLNUM}
                        </ListTableItemStyle.MbtlnumCell>
                    )
                },
            },
            {
                name: `메시지`,
                key: `CN`,
            },
            {
                name: `등록일시`,
                key: `RGSDE`,
                component: ({ el }: { el: MsgBookTableListItemInterface }) => {
                    return (
                        <>
                            {_.isNull(el.RGSDE)
                                ? ''
                                : timeStringParse(el.RGSDE)}
                        </>
                    )
                },
            },
        ],
    ],
    Lists: [],
}

export const ConsultGroupTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
        indexKey: 'CNST_GRP_NO',
        bgState: true,
    },
    Columns: [
        [
            {
                name: `그룹명`,
                key: `CNST_GRP_NM`,
            },
            {
                name: `구분`,
                key: `PERM`,
                component: ({
                    el,
                }: {
                    el: ConsultGroupListResultItemInterface
                }) => {
                    const findCode = _.find(Codes.ConsultGroup, {
                        code: el.PERM,
                    })

                    if (findCode) {
                        return <>{`${findCode.name}`}</>
                    } else {
                        return <>{`${el.PERM}`}</>
                    }
                },
            },
            {
                name: `회원수`,
                key: `CNST_MBERS`,
            },
            {
                name: `생성자`,
                key: `MBER_NM`,
            },
            {
                name: `생성일자`,
                key: `REGIST_DT`,
            },
        ],
    ],
    Lists: [],
}
