import React from 'react'

// 바이오그램존
export interface UhealthzoneTableListItemInterface {
    UHEALTH_ZONE_NO: null | string
    INSTL_PLACE: null | string
    INSTL_ADRES: number | string
    EXTRL_PERSON_USE_AT: null | string
    LOGIN_AT: null | string
    REGIST_DT: null | string
    MHRLS_NM: null | string
    MHRLS_CNT: null | string
}

// 매거진 리스트
export interface MagazineTableListItemInterface {
    MISN_STEP: null | number
    OPEN_STATUS: null | string
    MISN_SUBNAME1: number | string
    BEGIN_DE: null | string
    END_DE: null | string
    MISN_COMPT_REWARD_POINT: null | number
    REGIST_DT: null | string
}

// 바이오 그램존 테이블 설정.
export const UhealthzoneTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `UHEALTH_ZONE_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `번호`,
                key: `UHEALTH_ZONE_NO`,
            },
            {
                name: `소속`,
                key: `INSTL_PLACE`,
            },
            {
                name: `설치장소`,
                key: `INSTL_ADRES`,
            },
            {
                name: `지도`,
                key: `UHEALTH_ZONE_NO`,
            },
            {
                name: `외부인 이용`,
                key: `EXTRL_PERSON_USE_AT`,
                component: ({
                    el,
                }: {
                    el: UhealthzoneTableListItemInterface
                }) => {
                    return (
                        <>{el.EXTRL_PERSON_USE_AT == 'Y' ? '가능' : '불가능'}</>
                    )
                },
            },
            {
                name: `로그인 방식`,
                key: `LOGIN_AT`,
                component: ({
                    el,
                }: {
                    el: UhealthzoneTableListItemInterface
                }) => {
                    if (el.LOGIN_AT == 'R') return <>{'RFID'}</>
                    else if (el.LOGIN_AT == 'A') return <>{'복합'}</>
                    else return <>{'지정맥'}</>
                },
            },
            {
                name: `등록일시`,
                key: `REGIST_DT`,
            },
            {
                name: `설치기기`,
                key: `MHRLS_NM`,
            },
        ],
    ],
    Lists: [],
}

// 매거진 리스트 테이블 설정.
export const MagazineTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `MISN_STEP`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `번호`,
                key: `MISN_STEP`,
            },
            {
                name: `노출상태`,
                key: `OPEN_STATUS`,
            },
            {
                name: `제목`,
                key: `MISN_SUBNAME1`,
            },
            {
                name: `노출 시작일자`,
                key: `BEGIN_DE`,
            },
            {
                name: `노출 종료일자`,
                key: `END_DE`,
            },
            {
                name: `포인트`,
                key: `MISN_COMPT_REWARD_POINT`,
            },
            {
                name: `등록일시`,
                key: `REGIST_DT`,
            },
        ],
    ],
    Lists: [],
}
