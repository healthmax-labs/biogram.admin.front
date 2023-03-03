import { _Axios_ } from '@Modules'
import {
    InstLowInstCodeInterface,
    InstTopInstCodeInterface,
    ServicesDefaultResult,
    SiGunGroupInterface,
    SiGunGuCodeInterface,
    StplatInfoItem,
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
 * 이미지 업로드.
 * @param formData
 */
export const commonFileInst = (
    formData: FormData
): Promise<ServicesDefaultResult<{ ATCHMNFL_NO: number }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/file/INST/I`,
        payload: formData,
    })
}

/**
 * 이미지 업로드 인서트
 * @param formData
 * @param Category
 */
export const commonFileImg = (
    formData: FormData,
    Category: string
): Promise<ServicesDefaultResult<{ ATCHMNFL_NO: number }>> => {
    return _Axios_({
        method: 'post',
        url: `/common/file/${Category}/I`,
        payload: formData,
    })
}
