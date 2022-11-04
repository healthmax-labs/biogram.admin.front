// 회원 테이블 데이터
export interface tableListInterface {
    MBER_NO: number
    MEBER_NM: string
    MBTLNUM: string
    BRTHDY: string
    SEXDSTN: string
    INST_NM: string
    DEPT_NM: string | null
    CONFM_DE: string
    STAT: string
}

// 테이블 설정.
export const TableConfig = {
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
            key: `MEBER_NM`,
        },
        {
            name: `휴대폰번호`,
            key: `MBTLNUM`,
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
            name: `소속이름`,
            key: `INST_NM`,
        },
        {
            name: `부서`,
            key: `DEPT_NM`,
        },
        {
            name: `소속가입일`,
            key: `CONFM_DE`,
        },
        {
            name: `상태`,
            key: `STAT`,
        },
    ],
    Lists: [],
}
