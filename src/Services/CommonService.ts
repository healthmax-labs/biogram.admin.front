import { _Axios_ } from '@Modules'
import {
    InstLowInstCodeInterface,
    InstTopInstCodeInterface,
    MemberSearchItemInterface,
    ServicesDefaultResult,
    SiGunGroupInterface,
    SiGunGuCodeInterface,
    StplatInfoItem,
    CommonGetFileInfoInterface,
} from '@Type/CommonTypes'
import { PstinstInfoItemInterface } from '@Type/MemberTypes'

// 회원 약관 정보
export const getStplatInfo = ({
    instNo,
}: {
    instNo: string
}): Promise<
    ServicesDefaultResult<{
        STPLAT_INFO_LIST: StplatInfoItem[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/stplat/info/${instNo}`,
        payload: {},
    })
}

/**
 * 회원 가입시 필요한 약관 정보.
 * @param infoNo
 */
export const getCommonStplatInfo = ({
    infoNo,
}: {
    infoNo: number
}): Promise<
    ServicesDefaultResult<{
        STPLAT_INFO_LIST: StplatInfoItem[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/stplat/info/${infoNo}`,
        payload: {},
    })
}

/**
 * 소속 변경 시 사용할 약관 정보.
 * @param infoNo
 */
export const getCommonThptyStplatInfo = ({
    infoNo,
}: {
    infoNo: number
}): Promise<
    ServicesDefaultResult<{
        THPTY_STPLAT_INFO_LIST: StplatInfoItem[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/v1/thpty/stplat/info/${infoNo}`,
        payload: {},
    })
}

/**
 * 소속 리스트
 */
export const getPstinst = (): Promise<
    ServicesDefaultResult<{
        PSTINST_INFO_LIST: PstinstInfoItemInterface[]
    }>
> => {
    return _Axios_({
        method: 'get',
        url: '/mber/v1/pstinst',
        payload: {},
    })
}

/**
 * 소속-상위 소속코드 조회
 */
export const getInstTopInstCode = (): Promise<
    ServicesDefaultResult<InstTopInstCodeInterface>
> => {
    return _Axios_({
        method: 'get',
        url: '/inst/v1/top_inst_code',
        payload: {},
    })
}

/**
 * 소속-하위 소속코드 조회
 * @param instNo
 */
export const getInstLowInstCode = ({
    instNo,
}: {
    instNo: number
}): Promise<ServicesDefaultResult<InstLowInstCodeInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/inst/v1/low_inst_code/${instNo}`,
        payload: {},
    })
}

/**
 * 시도 구분
 */
export const getSiGunGroup = (): Promise<
    ServicesDefaultResult<SiGunGroupInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/common/code/group/CM17`,
        payload: {},
    })
}

/**
 * 시도 구분 상세
 * @param GuBun
 */
export const getSiGunCode = ({
    GuBun,
}: {
    GuBun: string
}): Promise<ServicesDefaultResult<SiGunGuCodeInterface>> => {
    return _Axios_({
        method: 'post',
        url: `/common/code/group/CM18`,
        payload: {
            SEARCH_KEY: GuBun,
        },
    })
}

/**
 * 이미지 업로드 인서트
 * @param formData
 * @param Category
 * @param FileExtensionCode
 */
export const commonFileImg = (
    formData: FormData,
    Category: string,
    FileExtensionCode: string
): Promise<ServicesDefaultResult<{ ATCHMNFL_NO: number }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/file/${Category}/${FileExtensionCode}`,
        payload: formData,
    })
}

/**
 * 업로드 이미지 정보 조회
 * @param AtchmnflNo
 */
export const commonGetFileInfo = ({
    AtchmnflNo,
}: {
    AtchmnflNo: string
}): Promise<ServicesDefaultResult<CommonGetFileInfoInterface>> => {
    return _Axios_({
        method: 'get',
        url: `/common/file/${AtchmnflNo}`,
        payload: null,
    })
}

/**
 * 문자 보내기.
 * @param payload
 */
export const postMberSendSms = (payload: {
    INST_NO?: string
    SMS_SJ: string
    SMS_CN: string
    SNDNG_NO: string
    SNDNG_DT: string
    SEND_ALL_MBER: 'N' | 'Y'
    SEND_MBER_INFO_LIST: MemberSearchItemInterface[]
}): Promise<ServicesDefaultResult<{ test: boolean }>> => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/send/sms`,
        payload: payload,
    })
}

/**
 * 회원 앱 푸시 보내기.
 * @param payload
 */
export const postMberSendPush = (payload: {
    INST_NO?: string
    PUSH_CN: string
    PUSH_CODE: string // 'SV00'
    PUSH_SJ: string
    SEND_ALL_MBER: 'Y' | 'N'
    SEND_MBER_INFO_LIST: MemberSearchItemInterface[]
    SNDNG_DT: string
}) => {
    return _Axios_({
        method: 'post',
        url: `/mber/v1/send/push`,
        payload: payload,
    })
}
// /common/file/:atchmnfl_no/delete
export const commonFileDelete = ({
    atchmnfl_no,
}: {
    atchmnfl_no: string
}): Promise<ServicesDefaultResult<null>> => {
    return _Axios_({
        method: 'post',
        url: `/common/file/${atchmnfl_no}/delete`,
        payload: {},
    })
}
