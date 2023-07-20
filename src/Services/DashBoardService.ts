import { _Axios_ } from '@Module/index'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    FctrFctrGroupListInterface,
    MemberAgesGroupInterface,
    MemberGenderInterface,
    MemberInfoInterface,
    MesureInfoTotalResultInterface,
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
        method: 'post',
        url: `/mng/v1/dash_board/mber_info/v2`,
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
        method: 'post',
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
        method: 'post',
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
        method: 'post',
        url: `/mng/v1/dash_board/risk_fctr/v2`,
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
        method: 'post',
        url: `/mng/v1/dash_board/risk_fctr/fctr_group_v2`,
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
        method: 'post',
        url: `/mng/v1/dash_board/risk_group/not_usedv2`,
        payload: {},
    })
}

/**
 * 건강 개선률
 */
export const getMngGndnDashBoardMybodyScoreImprvm = (): Promise<
    ServicesDefaultResult<MybodyScoreImprvmInterface>
> => {
    return _Axios_({
        method: 'post',
        url: `/mng/gndn/v1/dash_board/mybody_score/imprvm`,
        payload: {},
    })
}

/**
 * 측정현황 통합
 */
export const getMngDashboardMesureInfoTotal = (): Promise<
    ServicesDefaultResult<MesureInfoTotalResultInterface>
> => {
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/mesure_info/total`,
        payload: {},
    })
}
