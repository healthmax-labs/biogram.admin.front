// 회원 테이블 데이터
import React from 'react'
import { gmtTimeToTimeObject } from '@Helper'

export interface JoinTableListItemInterface {
    WORK_TY_CODE: null | string
    MBER_NO: number | null
    NM: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MBTLNUM: null | string
}

export interface InitTableListItemInterface {
    INST_NO: number | null
    UPPER_INST_NO: number | null
    INST_TY_CODE: 'M' | 'F'
    BUDGET_ASIGN_AMOUNT: number | null
    MBER_CNT: number | null
    INST_NM_1: string
    INST_NM_2: string
    INST_NO_3: null
    BUDGET_ASIGN_AT: 'N'
    INST_NO_1: number | null
    INST_NM_3: string
    INST_NO_2: null
    REGIST_DT: number | null
    REQ_MBER_CNT: number | null
}

// 테이블 설정.
export const JoinTableConfig = {
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
                name: `회원명`,
                key: `NM`,
            },
            {
                name: `생년월일`,
                key: `BRTHDY`,
            },
            {
                name: `성별`,
                key: `SEXDSTN`,
            },
            {
                name: `성별`,
                key: `MBTLNUM`,
            },
        ],
    ],
    Lists: [],
}

export const InitTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `INST_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `소속코드`,
                key: `INST_NO`,
            },
            {
                name: `1차`,
                key: `INST_NM_1`,
            },
            {
                name: `2차`,
                key: `INST_NM_2`,
            },
            {
                name: `3차`,
                key: `INST_NM_3`,
            },
            {
                name: `생성일자`,
                key: `REGIST_DT`,
                component: ({ el }: { el: InitTableListItemInterface }) => {
                    if (el.REGIST_DT) {
                        const dateObj = gmtTimeToTimeObject(
                            new Date(el.REGIST_DT)
                        )
                        return (
                            <>{`${dateObj.year}-${dateObj.monthPad}-${dateObj.dayPad}`}</>
                        )
                    } else {
                        return <></>
                    }
                },
            },
            {
                name: `가입형태`,
                key: `MBTLNUM`,
            },
            {
                name: `회원수`,
                key: `REQ_MBER_CNT`,
            },
            {
                name: `가입승인대기`,
                key: `MBTLNUM`,
            },
            {
                name: `리워드 현황`,
                key: `BUDGET_ASIGN_AMOUNT`,
            },
            {
                name: `리워드 예산`,
                key: `INST_TY_CODE`,
            },
        ],
    ],
    Lists: [],
}
