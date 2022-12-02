// 회원 테이블 데이터
export interface MagazineTableListItemInterface {
    MISN_STEP: null | number
    OPEN_STATUS: null | string
    MISN_SUBNAME1: number | string
    BEGIN_DE: null | string
    END_DE: null | string
    MISN_COMPT_REWARD_POINT: null | number
    REGIST_DT: null | string
}

// 테이블 설정.
export const MagazineTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
    },
    Columns: [
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
    Lists: [],
}
