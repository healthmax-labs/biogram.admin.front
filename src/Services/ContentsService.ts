import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    MagazineListItemInterface,
    MagazineItemInterface,
} from '@Type/ContentsTypes'
import { UhealthZoneListItemInterface } from '@Type/ContentsTypes'

/**
 * 매거진 리스트
 */
export function getMagazineList({
    CUR_PAGE,
    SEARCH_KEY,
}: {
    CUR_PAGE: string
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        MISN_MAGAZINE_LIST: MagazineListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/todo/v1/misn/magazine/list/${CUR_PAGE}`,
        payload: {
            SEARCH_KEY,
        },
    })
}

/**
 * 매거진 상세 조회
 */
export function getMagazineDetail({
    misn_step,
}: {
    misn_step: string
}): Promise<
    ServicesDefaultResult<{
        MISN_MAGAZINE_INFO: MagazineItemInterface
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/todo/v1/misn/magazine/${misn_step}`,
        payload: {},
    })
}

/**
 * 매거진 등록
 * @param payload
 */
export const postMagazineDetail = (
    payload: MagazineItemInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/todo/v1/misn/magazine`,
        payload: payload,
    })
}

/**
 * 매거진 수정
 * @param payload
 */
export const postMagazineDetailUpdate = (
    payload: MagazineItemInterface
): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/todo/v1/misn/magazine/${payload.MISN_STEP}/update`,
        payload: payload,
    })
}

/**
 * 바이오그램 존 리스트
 */
export function getUhealthzoneList({
    CUR_PAGE,
    SEARCH_KEY,
}: {
    CUR_PAGE: string
    SEARCH_KEY: string
}): Promise<
    ServicesDefaultResult<{
        CUR_PAGE: string
        UHEALTH_ZONE_LIST: UhealthZoneListItemInterface[]
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/data/v1/uhealth_zone/list/${CUR_PAGE}`,
        payload: {
            SEARCH_KEY,
        },
    })
}
