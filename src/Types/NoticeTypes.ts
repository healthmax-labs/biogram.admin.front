//게시판 리스트 데이터
export interface NoticeListItemInterface {
    NOTICE_NO: null | string
    NOTICE_SJ: null | string
    REGDT: null | string
    NOTI_DT: null | string
    TRGET_SVC_CODE: null | string
}

//게시판 조회 리스트 데이터
export interface NoticeListInterface {
    NOTICE_LIST: NoticeListItemInterface[]
    TOTAL_COUNT: number
}
