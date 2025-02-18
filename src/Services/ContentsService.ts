import { pageSizes } from '@amcharts/amcharts5/.internal/plugins/exporting/Exporting'
import _ApiAxios_ from '@Module/_ApiAxios_'
import { _Axios_ } from '@Modules'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    LoungeCommentAiAuthorInterface,
    LoungeCommentAiGenInterface,
    LoungeCommentInterface,
    LoungeItemInterface,
    LoungeListItemInterface,
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
    CUR_PAGE: number
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
export const postMagazineDetail = (payload: {
    ATCHMNFL_NO: number
    BEGIN_DT: string
    CN_ATCHMNFL_NO: number
    END_DT: string
    EXPOSCD: string
    FIX_AT: string | 'Y' | 'N'
    MISN_CD: string
    MISN_COMPT_REWARD_POINT: string
    MISN_DC: string
    MISN_NAME: string
    MISN_SUBNAME1: string
    MISN_SUBNAME2: string
    USE_AT: string | 'Y' | 'N'
}): Promise<
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
export const postMagazineDetailUpdate = ({
    MISN_STEP,
    BEGIN_DT,
    END_DT,
    MISN_COMPT_REWARD_POINT,
    MISN_DC,
    MISN_SUBNAME1,
    MISN_SUBNAME2,
    USE_AT,
}: {
    MISN_STEP: number
    BEGIN_DT: string
    END_DT: string
    MISN_COMPT_REWARD_POINT: string
    MISN_DC: string
    MISN_SUBNAME1: string
    MISN_SUBNAME2: string
    USE_AT: string | 'Y' | 'N'
}): Promise<
    ServicesDefaultResult<{
        test: boolean
    }>
> => {
    return _Axios_({
        method: 'post',
        url: `/todo/v1/misn/magazine/${MISN_STEP}/update`,
        payload: {
            BEGIN_DT,
            END_DT,
            MISN_COMPT_REWARD_POINT,
            MISN_DC,
            MISN_SUBNAME1,
            MISN_SUBNAME2,
            USE_AT,
        },
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
    CUR_PAGE: number
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

/**
 * 마인드 라운지 리스트
 * @param CUR_PAGE
 * @param SEARCH_KEY
 */
export const getLoungeList = ({
    page,
    size,
    sortType,
}: {
    page: number
    size: number
    sortType: 'latest' | 'popular'
}): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: {
            content: LoungeListItemInterface[]
            totalPages: number
            totalElements: number
            page: number
            size: number
            cursorRegistDt: string
            cursorLikeCount: number
            cursorPostId: number
            empty: boolean
            last: boolean
        }
    }>
> => {
    return _ApiAxios_({
        method: 'get',
        url: `mind/v1/mind-lounge/posts?page=${
            page < 1 ? 0 : page - 1
        }&size=${size}&sortType=${sortType}`,
        payload: {},
    })
}

/**
 * 마인드 라운지 상세 조회
 */
export function getLoungeDetail({ post_id }: { post_id: string }): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: LoungeItemInterface
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/mind/v1/mind-lounge/posts/${post_id}/detail`,
        payload: {},
    })
}

/**
 * 마인드 라운지 댓글 등록
 */
export function postLoungeComment({
    postId,
    authorMemberNo,
    content,
}: {
    postId: string
    authorMemberNo: number
    content: string
}): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: LoungeItemInterface
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/mind/v1/mind-lounge/${postId}/comments`,
        payload: {
            authorMemberNo,
            content,
        },
    })
}

/**
 * 마인드 라운지 댓글 조회
 */
export function getLoungeDetailComments({
    post_id,
}: {
    post_id: string
}): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: LoungeCommentInterface
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/mind/v1/mind-lounge/${post_id}/comments`,
        payload: {},
    })
}

/**
 * 마인드 라운지 댓글 AI 생성
 */
export function getLoungeCommentAiGen({
    postId,
    authorMemberNo,
}: {
    postId: string
    authorMemberNo: string
}): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: LoungeCommentAiGenInterface
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/mind/v1/mind-lounge/${postId}/comments/${authorMemberNo}/gen`,
        payload: {},
    })
}

/**
 * 마인드 라운지 댓글 AI작성자 목록
 */
export function getLoungeCommentsAiAuthors(): Promise<
    ServicesDefaultResult<{
        responseCode: string
        responseMessage: string
        responseData: LoungeCommentAiAuthorInterface[]
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/member/v1/api/temp/users`,
        payload: {},
    })
}
