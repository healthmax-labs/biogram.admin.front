// 회원 테이블 데이터
import React from 'react'
import { gmtTimeToTimeObject, addComma } from '@Helper'
import { EapListItemInterface } from '@Type/InstTypes'

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
    INST_TY_CODE: string | 'M' | 'F'
    BUDGET_ASIGN_AMOUNT: number | null
    MBER_CNT: number | null
    INST_NM_1: string
    INST_NM_2: string
    INST_NO_3: null
    BUDGET_ASIGN_AT: string
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
                name: `휴대폰번호`,
                key: `MBTLNUM`,
            },
            {
                name: `신청소속`,
                key: `INST_NM`,
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
                name: `회원수`,
                key: `MBER_CNT`,
            },
            {
                name: `가입승인대기`,
                key: `REQ_MBER_CNT`,
            },
            {
                name: `리워드 현황`,
                key: `BUDGET_ASIGN_AT`,
                component: ({ el }: { el: InitTableListItemInterface }) => {
                    return <>{el.BUDGET_ASIGN_AT == 'Y' ? '진행중' : ''}</>
                },
            },
            {
                name: `리워드 예산`,
                key: `BUDGET_ASIGN_AMOUNT`,
            },
        ],
    ],
    Lists: [],
}

// Eap 현황 리스트
export const EapTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `EAP_INST_REGISTER_NO`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `소속`,
                key: `INST_NM`,
            },
            {
                name: `신청기간`,
                key: `START_DE`,
                cellWidth: `w036`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return (
                        <>
                            {el.START_DE}~{el.END_DE}
                        </>
                    )
                },
            },
            {
                name: `마음상담`,
                key: `MIND_YN`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return <>{el.MIND_YN == 'Y' ? `사용` : `미사용`}</>
                },
            },
            {
                name: `상담인원`,
                key: `MIND_CURRENT_COUNT`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return (
                        <>{`${addComma(
                            Number(el.MIND_CURRENT_COUNT)
                        )}/${addComma(Number(el.MIND_MAX_COUNT))}`}</>
                    )
                },
            },
            {
                name: `건강상담`,
                key: `HEALTH_YN`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return <>{el.HEALTH_YN == 'Y' ? `사용` : `미사용`}</>
                },
            },
            {
                name: `상담인원`,
                key: `HEALTH_CURRENT_COUNT`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return (
                        <>{`${addComma(
                            Number(el.HEALTH_CURRENT_COUNT)
                        )}/${addComma(Number(el.HEALTH_MAX_COUNT))}`}</>
                    )
                },
            },
            {
                name: `진행여부`,
                key: `IS_LIVE`,
                component: ({ el }: { el: EapListItemInterface }) => {
                    return <>{el.IS_LIVE === 'Y' ? `진행중` : `종료`}</>
                },
            },
        ],
    ],
    Lists: [],
}
