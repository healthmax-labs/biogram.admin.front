import { changeDatePickerDate, dateInsertHypen } from '@Helper'
import _ from 'lodash'
import React from 'react'
import { PopupManageListItemInterface } from '@Type/MangerTypes'

// 이용약관 테이블 데이터
export interface StplatTableListItemInterface {
    STPLAT_SE_CODE: string
    STPLAT_SE_CODE_NM: string
    STPLAT_KND_CODE: string
    STPLAT_KND_CODE_NM: string
    STPLAT_SN: string
    STPLAT_CHANGE_DE: string
    STPLAT_CHANGE_RESN: string
}

//이용약관 테이블 설정.
export const StplatTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `STPLAT_SE_CODE`,
        bgState: true,
        xcpt: {
            option: 'row-button',
            buttons: [
                {
                    name: `약관걔정`,
                    code: `stplat`,
                },
            ],
        },
    },
    Columns: [
        [
            {
                name: `소속기관`,
                key: `STPLAT_SE_CODE_NM`,
            },
            {
                name: `약관 종류`,
                key: `STPLAT_KND_CODE_NM`,
            },
            {
                name: `약관 버전`,
                key: `STPLAT_SN`,
            },
            {
                name: `등록/변경일시`,
                key: `STPLAT_CHANGE_DE`,
                component: ({ el }: { el: StplatTableListItemInterface }) => {
                    return (
                        <>
                            {_.isEmpty(el.STPLAT_CHANGE_DE)
                                ? ''
                                : dateInsertHypen(el.STPLAT_CHANGE_DE)}
                        </>
                    )
                },
            },
            {
                name: `변경 사유`,
                key: `STPLAT_CHANGE_RESN`,
            },
        ],
    ],
    Lists: [],
}

// 게시판 테이블 데이터
export interface NoticeTableListItemInterface {
    NM: null | string
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGIST_DT: null | string
    REGIST_ID: null | string
    TRGET_SVC_CODE: null | string
    TRGET_SVC_CODE_NM: null | string
}

//게시판 테이블 설정.
export const NoticeTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `NOTICE_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `게시물 번호`,
                key: `NOTICE_NO`,
            },
            {
                name: `제목`,
                key: `NOTICE_SJ`,
            },
            {
                name: `등록 일자`,
                key: `REGIST_DT`,
            },
            {
                name: `게시유형`,
                key: `TRGET_SVC_CODE_NM`,
            },
        ],
    ],
    Lists: [],
}

// 파업 관리 테이블
export const PopupManageTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `PK`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `번호`,
                key: `PK`,
            },
            {
                name: `제목`,
                key: `POPUP_SJ`,
            },
            {
                name: `시작 일자`,
                key: `POPUP_BGNDT`,
                component: ({ el }: { el: PopupManageListItemInterface }) => {
                    return (
                        <>
                            {_.isEmpty(el.POPUP_BGNDT)
                                ? ''
                                : el.POPUP_BGNDT.substring(0, 10)}
                        </>
                    )
                },
            },
            {
                name: `종료 일자`,
                key: `POPUP_ENDDT`,
                component: ({ el }: { el: PopupManageListItemInterface }) => {
                    return (
                        <>
                            {_.isEmpty(el.POPUP_ENDDT)
                                ? ''
                                : el.POPUP_ENDDT.substring(0, 10)}
                        </>
                    )
                },
            },
            {
                name: `사용여부`,
                key: `USE_AT`,
            },
            {
                name: `등록 일자`,
                key: `REGIST_DT`,
                component: ({ el }: { el: PopupManageListItemInterface }) => {
                    return (
                        <>
                            {_.isEmpty(el.REGIST_DT)
                                ? ''
                                : dateInsertHypen(el.REGIST_DT)}
                        </>
                    )
                },
            },
        ],
    ],
    Lists: [],
}
