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
    POPUP_YN: 'Y' | 'N'
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: string
        ATCHMNFL_NM: string
        ATCHMNFL_PATH: string
        ORIGINL_FILE_NM: string
        ATCHMNFL_DOWN_PATH: string
    } | null
}

export interface HelperQnaListItemInterface {
    POST_ID: number
    INST_NM: string
    INST_NO: number
    TITLE: string
    REGIST_DT: string
    COMPLETE_YN: 'N' | 'Y'
    LIKE_CNT: number
    REGIST_ID: number
    MBER_NO: number // 작성자가 본인인지 확인 하기 위해 임시 추가
}

export interface HelperQnaListInterface {
    QUESTION_LIST: Array<HelperQnaListItemInterface>
}

export interface HelperQnaDetailInterface {
    POST_ID: number
    INST_NM: string
    INST_NO: number
    TITLE: string
    CONTENT: string
    REGIST_DT: string
    COMPLETE_YN: string | 'Y' | 'N'
    ATCHMNFL_INFO: {
        ATCHMNFL_NO: number | null
        ATCHMNFL_NM: string | null
        ATCHMNFL_PATH: string | null
        ORIGINL_FILE_NM: string | null
        ATCHMNFL_DOWN_PATH: string | null
    } | null
    COMMENTS: null
    COMMENT: {
        COMMENT_ID: number
        POST_ID: number
        CONTENT: string
        ATCHMNFL_INFO: {
            ATCHMNFL_NO: number | null
            ATCHMNFL_NM: string | null
            ATCHMNFL_PATH: string | null
            ORIGINL_FILE_NM: string | null
            ATCHMNFL_DOWN_PATH: string | null
        } | null
    }
}

export interface LikeUpDownImageClickInterace {
    POST_ID: number
    LIKE_CNT: number
    REGIST_ID: number
    COMPLETE_YN: 'N' | 'Y'
}

//자료실 리스트
export interface HelperDownloadListItemInterface {
    POST_ID: string
    POST_TYPE: string
    TITLE: string
    CONTENT: string
    REGIST_DT: string
    REGIST_ID: string
    UPDT_DT: string
    UPDT_ID: string
}

export interface HelperDownloadListInterface {
    REPO_NOTICE_INFO: Array<HelperDownloadListItemInterface>
}

export interface HelperDownloadDetailInterface {
    POST_ID: string
    POST_TYPE: string
    TITLE: string
    CONTENT: string
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
