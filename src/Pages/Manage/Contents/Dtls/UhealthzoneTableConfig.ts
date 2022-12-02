// 회원 테이블 데이터
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

// 테이블 설정.
export const UhealthzoneTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
    },
    Columns: [
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
        },
        {
            name: `로그인 방식`,
            key: `LOGIN_AT`,
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
    Lists: [],
}
