import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import { MagazineListItemInterface } from '@Type/ContentsTypes'
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
