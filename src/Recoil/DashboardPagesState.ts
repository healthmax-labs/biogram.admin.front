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

interface DashBoardPageStateInterface {
    status: 'idle' | 'end'
    member: {
        // 회원 현황 리스트 페이지
        status: DefaultStatus
        list: MemberInfoItemInterface[]
    }
    gender: {
        // 성별 회원 현황
        status: DefaultStatus
        list: MemberGenderItemInterface[]
        count: {
            today: number
            total: number
        }
    }
    ageGroup: {
        // 연령별 회원 현환
        status: DefaultStatus
        list: MemberAgesGroupItemInterface[]
    }
    riskFctr: {
        // 위험 요인 현황
        status: DefaultStatus
        list: RiskFctrListITemInterface[]
    }
    fctrFctrGroup: {
        // 위험 요인별 현황
        status: DefaultStatus
        list: FctrFctrGroupListItemInterface[]
    }
    riskGroupDormant: {
        // 위혐군 휴면 현황
        status: DefaultStatus
        list: RiskGroupDormantMemberItemInterface[]
    }
    mesureInfo: {
        // 측정현황
        status: DefaultStatus
        list: MesureInfoItemInterface[]
    }
    mesureInfoZone: {
        // 존 측정 현황
        status: DefaultStatus
        list: MesureInfoZoneItemInterface[]
    }
    mesureInfoZoneDevice: {
        // 존 기기별 측정현황
        status: DefaultStatus
        list: MesureInfoZoneDeviceItemInterface[]
    }
    mybodyScoreImprvm: {
        // 건강 개선률
        status: DefaultStatus
        list: MybodyScoreImprvmItemInterface[]
    }
}

// 대시보드
export const DashBoardPageState = atom<DashBoardPageStateInterface>({
    key: `dashBoardPage/dashboard`,
    default: {
        status: 'idle',
        member: {
            status: 'idle',
            list: [],
        },
        gender: {
            status: 'idle',
            list: [],
            count: {
                today: 0,
                total: 0,
            },
        },
        ageGroup: {
            status: 'idle',
            list: [],
        },
        riskFctr: {
            status: 'idle',
            list: [],
        },
        fctrFctrGroup: {
            status: 'idle',
            list: [],
        },
        riskGroupDormant: {
            status: 'idle',
            list: [],
        },
        mesureInfo: {
            status: 'idle',
            list: [],
        },
        mesureInfoZone: {
            status: 'idle',
            list: [],
        },
        mesureInfoZoneDevice: {
            status: 'idle',
            list: [],
        },
        mybodyScoreImprvm: {
            status: 'idle',
            list: [],
        },
    },
})
