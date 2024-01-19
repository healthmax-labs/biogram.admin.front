export interface HelperNoticeListItemInterface {
    POST_ID: string
    POST_TYPE: string
    TITLE: string
    CONTENT: string
    VIEW_CNT: string
    USE_YN: 'Y' | 'N'
    REGIST_DT: string
    REGIST_ID: string
    UPDT_DT: string
    UPDT_ID: string
}

export interface HelperNoticeListInterface {
    POST_NOTICE_INFO: Array<HelperNoticeListItemInterface>
}

export interface HelperNoticeDetailInterface {
    POST_ID: string
    POST_TYPE: string
    TITLE: string
    CONTENT: string
    VIEW_CNT: string
    USE_YN: 'N' | 'Y'
    REGIST_DT: string
    UPDT_DT: string
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: string
        ATCHMNFL_NM: string
        ATCHMNFL_PATH: string
        ORIGINL_FILE_NM: string
        ATCHMNFL_DOWN_PATH: string
    }
}
