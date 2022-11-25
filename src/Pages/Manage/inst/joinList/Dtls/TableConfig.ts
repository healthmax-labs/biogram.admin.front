// 회원 테이블 데이터
export interface tableListItemInterface {
    MBER_NO: number
    NM: null | string
    BRTHDY: null | string
    SEXDSTN: null | string
    MBTLNUM: null | string
}

// 테이블 설정.
export const TableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
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
    Lists: [],
}
