import { _Axios_ } from '@Module/index'
import { ServicesDefaultResult } from '@Type/CommonTypes'
import {
    FctrFctrGroupListInterface,
    MemberAgesGroupInterface,
    MemberGenderInterface,
    MemberInfoInterface,
    MesureInfoTotalResultInterface,
    MybodyScoreImprvmInterface,
    QmuChartResultInterface,
    RiskFctrListInterface,
    RiskGroupDormantMemberInterface,
} from '@Type/DashBoardTypes'
import _ from 'lodash'

/**
 * 회원 현황
 */
export const getMngDashBoardMberInfo = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<MemberInfoInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }

    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/mber_info/v2`,
        payload: payload,
    })
}

/**
 * 성별 회훤현황
 */
export const getMngDashBoardMberInfoSexdstn = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<MemberGenderInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/mber_info/sexdstn`,
        payload: payload,
    })
}

/**
 * 연령별 회원 현황
 */
export const getMngDashDoardMberInfoAges = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<MemberAgesGroupInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/mber_info/ages`,
        payload: payload,
    })
}

/**
 * 위험 요인 현황
 */
export const getMngDashBoardRiskFctr = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<RiskFctrListInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/risk_fctr/v2`,
        payload: payload,
    })
}

/**
 * 위험 요인별 현황
 */
export const getMngDashBoardRiskFctrFctrGroup = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<FctrFctrGroupListInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/risk_fctr/fctr_group_v2`,
        payload: payload,
    })
}

/**
 * 위험군 휴면 현황
 */
export const getMngDashBoardRiskGroupNotUsed = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<RiskGroupDormantMemberInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/risk_group/not_usedv2`,
        payload: payload,
    })
}

/**
 * 건강 개선률
 */
export const getMngGndnDashBoardMybodyScoreImprvm = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<MybodyScoreImprvmInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/gndn/v1/dash_board/mybody_score/imprvm`,
        payload: payload,
    })
}

/**
 * 측정현황 통합
 */
export const getMngDashboardMesureInfoTotal = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<MesureInfoTotalResultInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/mesure_info/total`,
        payload: payload,
    })
}

export const getDashBoardQmuChart = ({
    instNo,
}: {
    instNo: number | null
}): Promise<ServicesDefaultResult<QmuChartResultInterface>> => {
    const payload: {
        INST_NO?: number | null
    } = {
        INST_NO: instNo,
    }

    if (_.isNull(payload.INST_NO)) {
        delete payload.INST_NO
    }
    return _Axios_({
        method: 'post',
        url: `/mng/v1/dash_board/qmuChart`,
        payload: payload,
    })
}
