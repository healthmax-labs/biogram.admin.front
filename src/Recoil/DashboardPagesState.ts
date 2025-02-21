import { atom } from 'recoil'
import { DefaultStatus } from '@CommonTypes'
import {
    FctrFctrGroupListItemInterface,
    MemberAgesGroupItemInterface,
    MemberGenderItemInterface,
    MemberInfoItemInterface,
    MesureInfoItemInterface,
    MesureInfoTotalResultMesureTotalListItemInterface,
    MesureInfoZoneDeviceItemInterface,
    MybodyScoreImprvmItemInterface,
    NoticeResultItemInterface,
    QmuChartItemInterface,
    RiskFctrListItemInterface,
    RiskGroupDormantMemberItemInterface,
} from '@Type/DashBoardTypes'

interface DashBoardPageStateInterface {
    status: 'idle' | 'end'
    instNo: number | null
    instNm: string | null
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
        list: RiskFctrListItemInterface[]
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
        list: MesureInfoTotalResultMesureTotalListItemInterface[]
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
    qmu: {
        // qmu 차트
        status: DefaultStatus
        list: QmuChartItemInterface[]
    }
    notice: {
        status: DefaultStatus
        list: NoticeResultItemInterface[]
    }
    noticePopup: {
        show: boolean
        todayShow: boolean
        notice: {
            POST_ID: string
            TITLE: string
            CONTENT: string
            ATCHMNFL_INFO: {
                ATCHMNFL_NO: string
                ATCHMNFL_NM: string
                ATCHMNFL_PATH: string
                ORIGINL_FILE_NM: string
                ATCHMNFL_DOWN_PATH: string
            }
        }
    }
    commonPopup: {
        show: boolean
    }
}

// 대시보드
export const DashBoardPageState = atom<DashBoardPageStateInterface>({
    key: `dashBoardPage/dashboard`,
    default: {
        status: 'idle',
        instNo: null,
        instNm: null,
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
        qmu: {
            status: 'idle',
            list: [],
        },
        notice: {
            status: `idle`,
            list: [],
        },
        noticePopup: {
            show: false,
            todayShow: true,
            notice: {
                POST_ID: '',
                TITLE: '',
                CONTENT: '',
                ATCHMNFL_INFO: {
                    ATCHMNFL_NO: '',
                    ATCHMNFL_NM: '',
                    ATCHMNFL_PATH: '',
                    ORIGINL_FILE_NM: '',
                    ATCHMNFL_DOWN_PATH: '',
                },
            },
        },
        commonPopup: {
            show: false,
        },
    },
})
