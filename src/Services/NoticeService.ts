import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { NoticeItemInterface, NoticeListItemInterface } from '@Type/MangerTypes'

/**
 * 게시판 리스트
 */
export function getNoticeList({
    CUR_PAGE,
    ITEM_COUNT,
    REGIST_DT,
    TRGET_SVC_CODE,
    TRGET_SVC_CODE_NM,
    USE_AT,
}: {
    CUR_PAGE: number
    ITEM_COUNT: number
    REGIST_DT: string
    TRGET_SVC_CODE: string
    TRGET_SVC_CODE_NM: string
    USE_AT: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: number
        NOTICE_LIST: NoticeListItemInterface[]
        TOTAL_COUNT: number
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/data/v1/notice/list/${CUR_PAGE}`,
        payload: {
            CUR_PAGE,
            ITEM_COUNT,
            REGIST_DT,
            TRGET_SVC_CODE,
            TRGET_SVC_CODE_NM,
            USE_AT,
        },
    })
}

/**
 * 공지사항 상세 조회
 */
export function getNoticeDetail({
    NOTICE_NO,
}: {
    NOTICE_NO: string | null
}): Promise<
    ServicesDefaultResult<{
        NOTICE_NO: null | string
        NOTICE_SJ: null | string
        REGIST_DT: null | string
        REGIST_ID: null | string
        NOTICE_CN: null | string
        PUSH_AT: null | string
        TRGET_SVC_CODE: null | string
        TRGET_SVC_CODE_NM: null | string
        USE_AT: null | string
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/hp/v1/cpnoti/detail`,
        payload: { NOTICE_NO: NOTICE_NO },
    })
}

/**
 * 공지사항 등록
 * @param payload
 */
export const postNoticeDetailInsert = (
    payload: NoticeItemInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/hp/v1/cpnoti/reg`,
        payload: payload,
    })
}

/**
 * 공지사항 수정
 * @param payload
 */
export const postNoticeDetailUpdate = (
    payload: NoticeItemInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/notice/${payload.NOTICE_NO}/update`,
        payload: payload,
    })
}
