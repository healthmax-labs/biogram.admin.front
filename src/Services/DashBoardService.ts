import { _Axios_ } from '@Module/index'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    FctrFctrGroupListInterface,
    MemberAgesGroupInterface,
    MemberGenderInterface,
    MemberInfoInterface,
    MesureInfoInterface,
    MesureInfoZoneDeviceInterface,
    MesureInfoZoneInterface,
    MybodyScoreImprvmInterface,
    RiskFctrListInterface,
    RiskGroupDormantMemberInterface,
} from '@Type/DashBoardTypes'

/**
 * 회원 현황
 */
export const getMngDashBoardMberInfo = (): Promise<
    ServicesDefaultResult<MemberInfoInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mber_info`,
        payload: {},
    })
}

/**
 * 성별 회훤현황
 */
export const getMngDashBoardMberInfoSexdstn = (): Promise<
    ServicesDefaultResult<MemberGenderInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mber_info/sexdstn`,
        payload: {},
    })
}

/**
 * 연령별 회원 현황
 */
export const getMngDashDoardMberInfoAges = (): Promise<
    ServicesDefaultResult<MemberAgesGroupInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mber_info/ages`,
        payload: {},
    })
}

/**
 * 위험 요인 현황
 */
export const getMngDashBoardRiskFctr = (): Promise<
    ServicesDefaultResult<RiskFctrListInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/risk_fctr`,
        payload: {},
    })
}

/**
 * 위험 요인별 현황
 */
export const getMngDashBoardRiskFctrFctrGroup = (): Promise<
    ServicesDefaultResult<FctrFctrGroupListInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/risk_fctr/fctr_group`,
        payload: {},
    })
}

/**
 * 위험군 휴면 현황
 */
export const getMngDashBoardRiskGroupNotUsed = (): Promise<
    ServicesDefaultResult<RiskGroupDormantMemberInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/risk_group/not_used`,
        payload: {},
    })
}

/**
 * 측정현황
 */
export const getMngDashBoardMesureInfo = (): Promise<
    ServicesDefaultResult<MesureInfoInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mesure_info`,
        payload: {},
    })
}

/**
 * 존 측정현황
 */
export const getMngDashBoardMesureInfoZone = (): Promise<
    ServicesDefaultResult<MesureInfoZoneInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mesure_info/zone`,
        payload: {},
    })
}

/**
 * 존 기기별 측정현황
 */
export const getMngDashBoardMesureInfoZoneDevice = (): Promise<
    ServicesDefaultResult<MesureInfoZoneDeviceInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/v1/dash_board/mesure_info/zone_device`,
        payload: {},
    })
}

// /mng/gndn/v1/dash_board/mybody_score/imprvm
export const getMngGndnDashBoardMybodyScoreImprvm = (): Promise<
    ServicesDefaultResult<MybodyScoreImprvmInterface>
> => {
    return _Axios_({
        method: 'get',
        url: `/mng/gndn/v1/dash_board/mybody_score/imprvm`,
        payload: {},
    })
}
