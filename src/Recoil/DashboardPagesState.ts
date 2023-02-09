import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    FctrFctrGroupListItemInterface,
    MemberAgesGroupItemInterface,
    MemberGenderItemInterface,
    MemberInfoItemInterface,
    MesureInfoItemInterface,
    MesureInfoZoneDeviceItemInterface,
    MesureInfoZoneItemInterface,
    MybodyScoreImprvmItemInterface,
    RiskFctrListITemInterface,
    RiskGroupDormantMemberItemInterface,
} from '@Type/DashBoardTypes'

interface MemberListStateInterface {
    status: DefaultStatus
    list: MemberInfoItemInterface[]
}

interface MemberGenderListStateInterface {
    status: DefaultStatus
    list: MemberGenderItemInterface[]
    count: {
        today: number
        total: number
    }
}

interface MemberAgeGroupListStateInterface {
    status: DefaultStatus
    list: MemberAgesGroupItemInterface[]
}

interface RiskFctrListStateInterface {
    status: DefaultStatus
    list: RiskFctrListITemInterface[]
}

interface FctrFctrGroupListStateInterface {
    status: DefaultStatus
    list: FctrFctrGroupListItemInterface[]
}

interface RiskGroupDormantMemberListInterface {
    status: DefaultStatus
    list: RiskGroupDormantMemberItemInterface[]
}

interface MesureInfoStateInterface {
    status: DefaultStatus
    list: MesureInfoItemInterface[]
}

interface MesureInfoZoneStateInterface {
    status: DefaultStatus
    list: MesureInfoZoneItemInterface[]
}

interface MesureInfoZoneDeviceStateInterface {
    status: DefaultStatus
    list: MesureInfoZoneDeviceItemInterface[]
}

interface MybodyScoreImprvmStateInterface {
    status: DefaultStatus
    list: MybodyScoreImprvmItemInterface[]
}

// 회원 현황 리스트 페이지
export const MemberListState = atom<MemberListStateInterface>({
    key: `dashboardPage/member-list`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 성별 회원 현황
export const MemberGenderListState = atom<MemberGenderListStateInterface>({
    key: `dashboardPage/gender-list`,
    default: {
        status: 'idle',
        list: [],
        count: {
            today: 0,
            total: 0,
        },
    },
})

// 연령별 회원 현환
export const MemberAgeGroupListState = atom<MemberAgeGroupListStateInterface>({
    key: `dashboardPage/age-group-list`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 위험 요인 현황
export const RiskFctrListState = atom<RiskFctrListStateInterface>({
    key: `dashboardPage/risk-fctr-list`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 위험 요인별 현황
export const FctrFctrGroupListState = atom<FctrFctrGroupListStateInterface>({
    key: `dashboardPage/fctr-fctr-group-list`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 위혐군 휴면 현황
export const RiskGroupDormantMemberListState =
    atom<RiskGroupDormantMemberListInterface>({
        key: `dashboardPage/risk-group-dormant-member-list`,
        default: {
            status: 'idle',
            list: [],
        },
    })

// 측정현황
export const MesureInfoState = atom<MesureInfoStateInterface>({
    key: `dashboardPage/mesure-info-list`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 존 측정 현황
export const MesureInfoZoneState = atom<MesureInfoZoneStateInterface>({
    key: `dashboardPage/mesure-info-zone`,
    default: {
        status: 'idle',
        list: [],
    },
})

// 존 측정 현황
export const MesureInfoZoneDeviceState =
    atom<MesureInfoZoneDeviceStateInterface>({
        key: `dashboardPage/mesure-info-zone-device`,
        default: {
            status: 'idle',
            list: [],
        },
    })

// 존 측정 현황
export const MybodyScoreImprvmState = atom<MybodyScoreImprvmStateInterface>({
    key: `dashboardPage/mybody-score-imprvm`,
    default: {
        status: 'idle',
        list: [],
    },
})
