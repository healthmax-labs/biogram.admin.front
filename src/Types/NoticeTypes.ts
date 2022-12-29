//게시판 리스트 데이터
export interface NoticeListItemInterface {
    NM: null | string
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGIST_DT: null | string
    REGIST_ID: null | string
    TRGET_SVC_CODE: null | string
    TRGET_SVC_CODE_NM: null | string
}

//게시판 조회 리스트 데이터
export interface NoticeListInterface {
    NOTICE_LIST: NoticeListItemInterface[]
    TOTAL_COUNT: number
}
