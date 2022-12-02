import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { InstJoinListItemInterface, InstListInterface } from '@Type/InstTypes'

/**
 * 소속관리 리스트
 */
export const getInstList = (): Promise<
    ServicesDefaultResult<InstListInterface>
> => {
    return _Axios_({
        method: 'post',
        url: `/inst/v1/list/0`,
        payload: {},
    })
}

/**
 * 회원 소속 등록.
 * @param CUR_PAGE
 * @param INST_NO
 * @param SEARCH_KEY
 */
export const getInstJoinList = ({
    CUR_PAGE,
    INST_NO,
    SEARCH_KEY,
}: {
    CUR_PAGE: string
    INST_NO: string
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        PSTINST_REQUEST_INFO_LIST: InstJoinListItemInterface[]
        TOTAL_COUNT: number
    }>
> => {
    return _Axios_({
        method: 'post',
        url: '/inst/v1/request/list/' + CUR_PAGE,
        payload: {
            INST_NO,
            SEARCH_KEY,
        },
    })
}
