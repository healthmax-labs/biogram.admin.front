import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@CommonTypes'
import {
    HelperNoticeListInterface,
    HelperNoticeDetailInterface,
    HelperQnaListInterface,
    HelperQnaDetailInterface,
    HelperDownloadListInterface,
    HelperDownloadDetailInterface,
} from '@Type/HelperTypes'

export function getNoticeList(): Promise<
    ServicesDefaultResult<HelperNoticeListInterface>
> {
    return _Axios_({
        method: 'get',
        url: '/notice/v1/list',
        payload: null,
    })
}

export function postNoticeAdd({
    TITLE,
    CONTENT,
    USE_YN,
    POPUP_YN,
    ATCHMNFL_NO,
}: {
    TITLE: string
    CONTENT: string
    USE_YN: 'Y' | 'N'
    POPUP_YN: 'Y' | 'N'
    ATCHMNFL_NO: string
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: '/notice/v1/add',
        payload: {
            TITLE: TITLE,
            CONTENT: CONTENT,
            USE_YN: USE_YN,
            POPUP_YN: POPUP_YN,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

export function getNoticeView({
    POST_ID,
}: {
    POST_ID: string
}): Promise<ServicesDefaultResult<HelperNoticeDetailInterface>> {
    return _Axios_({
        method: 'get',
        url: `/notice/v1/view?pk=${POST_ID}`,
        payload: null,
    })
}

export function postNoticeUpdate({
    POST_ID,
    TITLE,
    CONTENT,
    USE_YN,
    POPUP_YN,
    ATCHMNFL_NO,
}: {
    POST_ID: number
    TITLE: string
    CONTENT: string
    USE_YN: 'Y' | 'N'
    POPUP_YN: 'Y' | 'N'
    ATCHMNFL_NO: string | null
}) {
    return _Axios_({
        method: 'post',
        url: `/notice/v1/update`,
        payload: {
            POST_ID: POST_ID,
            TITLE: TITLE,
            CONTENT: CONTENT,
            USE_YN: USE_YN,
            POPUP_YN: POPUP_YN,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

export function postNoticeDelete({
    POST_ID,
}: {
    POST_ID: string
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/notice/v1/delete?pk=${POST_ID}`,
        payload: null,
    })
}

export function getNoticeLog({ POST_ID }: { POST_ID: string }): Promise<
    ServicesDefaultResult<{
        POST_VIEW_LOG_LIST: Array<{
            INST_NO: string
            INST_NM: string
            NM: string
            REGIST_ID: string
            REGIST_DT: string
        }>
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/notice/v1/log/list?pk=${POST_ID}`,
        payload: null,
    })
}

export function getQuestionlist(): Promise<
    ServicesDefaultResult<HelperQnaListInterface>
> {
    return _Axios_({
        method: 'get',
        url: `/qna/v1/question-list`,
        payload: null,
    })
}

export function getSearchQuestionlist({
    TITLE,
    COMPLETE_YN,
}: {
    COMPLETE_YN: string | 'A' | `Y` | `N`
    TITLE: string | null
}): Promise<ServicesDefaultResult<HelperQnaListInterface>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/search-question-list`,
        payload: {
            TITLE: TITLE,
            COMPLETE_YN: COMPLETE_YN,
        },
    })
}

export function getQuestionDetail({
    POST_ID,
}: {
    POST_ID: string
}): Promise<ServicesDefaultResult<HelperQnaDetailInterface>> {
    return _Axios_({
        method: 'get',
        url: `/qna/v1/question-detail?postId=${POST_ID}`,
        payload: null,
    })
}

export function postAddQnaQuestion({
    TITLE,
    CONTENT,
    ATCHMNFL_NO,
}: {
    TITLE: string
    CONTENT: string
    ATCHMNFL_NO: null | number
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/add-question`,
        payload: {
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

export function postEditQnaQuestion({
    POST_ID,
    TITLE,
    CONTENT,
    ATCHMNFL_NO,
}: {
    POST_ID: number
    TITLE: string
    CONTENT: string
    ATCHMNFL_NO: number | null
}) {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/edit-question`,
        payload: {
            POST_ID: POST_ID,
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

export function postDeleteQnaQuestion({
    POST_ID,
}: {
    POST_ID: number
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/del-question`,
        payload: {
            POST_ID: POST_ID,
        },
    })
}

export function postQnaAddComment({
    POST_ID,
    CONTENT,
    ATCHMNFL_NO,
}: {
    POST_ID: number
    CONTENT: string
    ATCHMNFL_NO: null | number
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/add-comment`,
        payload: {
            POST_ID: POST_ID,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

export function postQnaEditComment({
    POST_ID,
    COMMENT_ID,
    CONTENT,
    ATCHMNFL_NO,
}: {
    COMMENT_ID: number
    POST_ID: number
    CONTENT: string
    ATCHMNFL_NO: number | null
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/edit-comment`,
        payload: {
            COMMENT_ID,
            POST_ID,
            CONTENT,
            ATCHMNFL_NO,
        },
    })
}

export function postQnaDeleteComment({
    COMMENT_ID,
    POST_ID,
}: {
    COMMENT_ID: number
    POST_ID: number
}) {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/del-comment`,
        payload: {
            COMMENT_ID,
            POST_ID,
        },
    })
}

export function postQnaVoteUpDown({
    POST_ID,
    vote,
}: {
    POST_ID: number
    vote: `UP` | `DOWN`
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/qna/v1/vote-updown`,
        payload: {
            POST_ID: POST_ID,
            UP_DOWN: vote,
        },
    })
}

// 자료실 목록
export function getRepoList(): Promise<
    ServicesDefaultResult<HelperDownloadListInterface>
> {
    return _Axios_({
        method: 'get',
        url: `/repo/v1/list`,
        payload: null,
    })
}

// 자료실 등록
export function postRepoAdd({
    TITLE,
    CONTENT,
    ATCHMNFL_NO,
}: {
    TITLE: string
    CONTENT: string
    ATCHMNFL_NO: number
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: `/repo/v1/add`,
        payload: {
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

// 자료실 정보
export function getRepoView({
    POST_ID,
}: {
    POST_ID: string
}): Promise<ServicesDefaultResult<HelperDownloadDetailInterface>> {
    return _Axios_({
        method: 'get',
        url: `/repo/v1/view?pk=${POST_ID}`,
        payload: null,
    })
}

// 자료실 정보 업데이트
export function postRepoUpdate({
    POST_ID,
    TITLE,
    CONTENT,
    ATCHMNFL_NO,
}: {
    POST_ID: string
    TITLE: string
    CONTENT: string
    ATCHMNFL_NO: string
}) {
    return _Axios_({
        method: 'post',
        url: `/repo/v1/update`,
        payload: {
            POST_ID: POST_ID,
            TITLE: TITLE,
            CONTENT: CONTENT,
            ATCHMNFL_NO: ATCHMNFL_NO,
        },
    })
}

// 자료실 정보 삭제
export function postRepoDelete({ POST_ID }: { POST_ID: string }) {
    return _Axios_({
        method: 'post',
        url: `/repo/v1/delete?pk=${POST_ID}`,
        payload: null,
    })
}
