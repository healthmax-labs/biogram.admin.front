import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    MagazineItemInterface,
    MagazineListItemInterface,
    UhealthZoneChargerInfoInterface,
    UhealthzoneInfoInterface,
    UhealthZoneListItemInterface,
} from '@Type/ContentsTypes'

/**
 * 매거진 리스트
 * @param CUR_PAGE
 * @param SEARCH_KEY
 */
export const getMagazineList = ({
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
> => {
    return _Axios_({
        method: 'post',
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
 * @param CUR_PAGE
 * @param SEARCH_KEY
 */
export const getUhealthzoneList = ({
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
> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/uhealth_zone/list/${CUR_PAGE}`,
        payload: {
            SEARCH_KEY,
        },
    })
}

/**
 * 지점명 중복 확인
 * @param instlPlace
 */
export const getDataCheckInstlPlace = ({
    instlPlace,
}: {
    instlPlace: string
}): Promise<
    ServicesDefaultResult<{
        INSTL_PLACE_USE_AT: 'Y' | 'N'
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/data/v1/check/instl_place?instl_place=${encodeURIComponent(
            instlPlace
        )}`,
        payload: {},
    })
}

/**
 * 바이오그램 존 등록
 * @param payload
 */
export const postDataUhealthZone = (
    payload: UhealthzoneInfoInterface
): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/uhealth_zone`,
        payload: payload,
    })
}

/**
 * 바이오그램 존 정보 조회
 * @param zoneNum
 */
export const getDataUhealthZoneChargerInfo = ({
    zoneNum,
}: {
    zoneNum: number
}): Promise<ServicesDefaultResult<UhealthZoneChargerInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/data/v1/uhealth_zone/charger_info/${zoneNum}`,
        payload: {},
    })
}

/**
 * 바이그램존 내용 업데이트
 * @param zoneNum
 * @param payload
 */
export const postDataUhealthZoneUpdate = ({
    zoneNum,
    payload,
}: {
    zoneNum: number
    payload: UhealthzoneInfoInterface
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/uhealth_zone/${zoneNum}/update`,
        payload: payload,
    })
}

/**
 * 바이오그램 존 삭제
 * @param zoneNum
 */
export const postDataUhealthZoneDelete = ({
    zoneNum,
}: {
    zoneNum: number
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/data/v1/uhealth_zone/${zoneNum}/delete`,
        payload: {},
    })
}
