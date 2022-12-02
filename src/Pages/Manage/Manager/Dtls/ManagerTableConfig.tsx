// 위험요인 현황 테이블 데이터
export interface StplatTableListItemInterface {
    STPLAT_SE_CODE: string
    STPLAT_SE_CODE_NM: string
    STPLAT_KND_CODE: string
    STPLAT_KND_CODE_NM: string
    STPLAT_SN: string
    STPLAT_CHANGE_DE: string
    STPLAT_CHANGE_RESN: string
}

//위험요인 현황 테이블 설정.
export const StplatTableConfig = {
    Loading: true,
    Options: {
        selectAll: true,
    },
    Columns: [
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
        },
        {
            name: `변경 사유`,
            key: `STPLAT_CHANGE_RESN`,
        },
    ],
    Lists: [],
}
