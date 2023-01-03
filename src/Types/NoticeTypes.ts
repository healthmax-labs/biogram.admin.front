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

//게시판 상세 데이터
export interface NoticeItemInterface {
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGIST_DT: null | string
    REGIST_ID: null | string
    NOTI_DT: null | string
    NOTICE_CN: null | string
    PUSH_AT: null | string
    TRGET_SVC_CODE: null | string
    TRGET_SVC_CODE_NM: null | string
    USE_AT: null | string
}
