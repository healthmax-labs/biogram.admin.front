import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'

const {} = ContentsStyle

//회원통계 연령별 테이블
export interface MemberAgeTableListItemInterface {
    AGE_GROUP: string | number
    TOT_MBER_CNT: string | number
    TOT_WOMAN_CNT: string | number
    TOT_MAN_CNT: string | number
    NEW_MBER_CNT: string | number
    NEW_WOMAN_CNT: string | number
    NEW_MAN_CNT: string | number
    DEL_MBER_CNT: string | number
    DLE_WOMAN_CNT: string | number
    DEL_MAN_CNT: string | number
}

//회원통계(연령별)테이블 설정.
export const MemberAgeTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `AGE_GROUP`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: `전체 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
            {
                name: `신규 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
            {
                name: `탈퇴 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
        ],
        [
            {
                name: `연령`,
                key: `AGE_GROUP`,
            },
            {
                name: `전체`,
                key: `TOT_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `TOT_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `TOT_MAN_CNT`,
            },
            {
                name: `전체`,
                key: `NEW_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `NEW_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `NEW_MAN_CNT`,
            },
            {
                name: `전체`,
                key: `DEL_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `DLE_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `DEL_MAN_CNT`,
            },
        ],
    ],
    Lists: [],
}

//회원통계 기간별 테이블
export interface MemberPeriodTableListItemInterface {
    PERIOD: string | number
    TOT_MBER_CNT: string | number
    TOT_WOMAN_CNT: string | number
    TOT_MAN_CNT: string | number
    NEW_MBER_CNT: string | number
    NEW_WOMAN_CNT: string | number
    NEW_MAN_CNT: string | number
    DEL_MBER_CNT: string | number
    DLE_WOMAN_CNT: string | number
    DEL_MAN_CNT: string | number
}

//회원통계(기간별)테이블 설정.
export const MemberPeriodTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `PERIOD`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: ``,
                rowSpan: 1,
                colSpan: 1,
            },
            {
                name: `전체 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
            {
                name: `신규 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
            {
                name: `탈퇴 회원수`,
                rowSpan: 1,
                colSpan: 3,
            },
        ],
        [
            {
                name: `연령`,
                key: `PERIOD`,
            },
            {
                name: `전체`,
                key: `TOT_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `TOT_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `TOT_MAN_CNT`,
            },
            {
                name: `전체`,
                key: `NEW_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `NEW_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `NEW_MAN_CNT`,
            },
            {
                name: `전체`,
                key: `DEL_MBER_CNT`,
            },
            {
                name: `여성`,
                key: `DLE_WOMAN_CNT`,
            },
            {
                name: `남성`,
                key: `DEL_MAN_CNT`,
            },
        ],
    ],
    Lists: [],
}
