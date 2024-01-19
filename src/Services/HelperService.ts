import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@CommonTypes'
import {
    HelperNoticeListInterface,
    HelperNoticeDetailInterface,
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
    ATCHMNFL_NO,
}: {
    TITLE: string
    CONTENT: string
    USE_YN: 'Y' | 'N'
    ATCHMNFL_NO: string
}): Promise<ServicesDefaultResult<null>> {
    return _Axios_({
        method: 'post',
        url: '/notice/v1/add',
        payload: {
            TITLE,
            CONTENT,
            USE_YN,
            ATCHMNFL_NO,
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
    ATCHMNFL_NO,
}: {
    POST_ID: number
    TITLE: string
    CONTENT: string
    USE_YN: 'Y' | 'N'
    ATCHMNFL_NO: string
}) {
    return _Axios_({
        method: 'post',
        url: `/notice/v1/update`,
        payload: {
            POST_ID,
            TITLE,
            CONTENT,
            USE_YN,
            ATCHMNFL_NO,
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
