import { RecoilStateKeyNameType } from '@CommonTypes'
import { useResetRecoilState } from 'recoil'
import Const from '@Const'
import _ from 'lodash'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import {
    ConsultDetailState,
    ConsultListState,
    MemberDetailState,
    MemberListState,
    MsgBookListState,
    MsgSendListState,
    ConsultDetailChartListState,
    ConsultDetailChartSmsState,
    ConsultSurveyState,
    ConsultMsgBoxListState,
    ConsultMyCoachState,
    MealDiaryState,
    RawAgeState,
    MyGraphState,
    ConsultGroupListState,
    ConsultGroupDetailState,
} from '@Recoil/MemberPagesState'
import {
    InstDetailState,
    InstJoinListState,
    InstListState,
    EapListState,
    EapDetailState,
} from '@Recoil/InstPagesState'
import {
    MagazineDetailState,
    MagazineListState,
    UhealthzoneDetailState,
    UhealthzoneListState,
} from '@Recoil/ContentsPagesState'
import {
    ActivityWalkListState,
    BrftrCmprListState,
    RiskFctrListState,
    StatisticsListState,
    HealthIndicatorsListState,
    NonMeasureListState,
    WalkRankingListState,
    BrainListState,
    StressListState,
} from '@Recoil/StatusPagesState'
import {
    DeviceListState,
    MemberListState as AnalyticsMemberListState,
    MesureListState,
    RiskFctrCountListState,
    RiskFctrItemsListState,
} from '@Recoil/AnalyticsPagesState'
import {
    NoticeListState,
    StplatDetailState,
    StplatListState,
    NoticeDetailState,
    PopupManageListState,
    PopupManageDetailState,
    BudgetListState,
    BudgetDetailState,
} from '@Recoil/ManagerPagesState'
import {
    NoticeListState as HelperNoticeListState,
    NoticeDetailState as HelperNoticeDetailState,
    QnaListState as HelperQnaListState,
    QnaDetailState as HelperQnaDetailState,
    DownloadListState as HelperDownloadListState,
    DownloadlistDetailState as HelperDowloadListDetailState,
} from '@Recoil/HelperPageState'

import { AtomPageTabState } from '@Recoil/PageTabState'

export default function useRecoilReset() {
    const DashBoardPageStateReset = useResetRecoilState(DashBoardPageState) // 대시보드
    const MemberListStateReset = useResetRecoilState(MemberListState) // 회원현황
    const MemberDetailStateReset = useResetRecoilState(MemberDetailState) // 회원상세
    const ConsultListStateReset = useResetRecoilState(ConsultListState) // 상담회원 현황
    const ConsultDetailStateReset = useResetRecoilState(ConsultDetailState) // 상담회원 상세
    const ConsultDetailChartListStateReset = useResetRecoilState(
        ConsultDetailChartListState
    )
    // 상담회원 차트,메시지 발송
    const ConsultDetailChartSmsStateReset = useResetRecoilState(
        ConsultDetailChartSmsState
    )
    // 상담회원 메시지발송
    const ConsultMyCoachStateReset = useResetRecoilState(ConsultMyCoachState) // 상담 회원 마이코치
    const ConsultSurveyStateReset = useResetRecoilState(ConsultSurveyState) // 상담회원 설문조사
    const RawAgeStateReset = useResetRecoilState(RawAgeState) // 상담회원 설문조사
    const MealDiaryStateReset = useResetRecoilState(MealDiaryState) // 상담회원 식사일기
    const MyGraphStateReset = useResetRecoilState(MyGraphState) // 상담회원 마이그래프
    const ConsultGroupListStateReset = useResetRecoilState(
        ConsultGroupListState
    ) // 상담회원그룹 목록
    const ConsultGroupDetailStateReset = useResetRecoilState(
        ConsultGroupDetailState
    ) // 상담회원그룹 상세

    const ConsultMsgBoxListStateReset = useResetRecoilState(
        ConsultMsgBoxListState
    ) // 상담 회원 마이코치
    const MsgSendListStateReset = useResetRecoilState(MsgSendListState) // 메시지 발송이력
    const MsgBookListStateReset = useResetRecoilState(MsgBookListState) // 메시지 예약현황

    const InstJoinListStateReset = useResetRecoilState(InstJoinListState) // 소속 가입신청
    const InstListStateReset = useResetRecoilState(InstListState) // 소속현황
    const InstDetailStateReset = useResetRecoilState(InstDetailState) // 소속상세
    const EapListStateReset = useResetRecoilState(EapListState) // Eap현황
    const EapDetailStateReset = useResetRecoilState(EapDetailState) // Eap상세

    const MagazineListStateReset = useResetRecoilState(MagazineListState) // 매거진
    const MagazineDetailStateReset = useResetRecoilState(MagazineDetailState) // 메거진 상세
    const UhealthzoneListStateReset = useResetRecoilState(UhealthzoneListState) // 바이오그램 존
    const UhealthzoneDetailStateReset = useResetRecoilState(
        UhealthzoneDetailState
    ) // 바이오그램 존 상세

    const RiskFctrListStateReset = useResetRecoilState(RiskFctrListState) // 위험요인 현황
    const StressListStateReset = useResetRecoilState(StressListState) // 스트레스 현황
    const BrainListStateReset = useResetRecoilState(BrainListState) // 뇌기능 현황
    const BrftrCmprListStateReset = useResetRecoilState(BrftrCmprListState) // 전후비교 현황
    const StatisticsListStateReset = useResetRecoilState(StatisticsListState) // 기기측정 현황
    const ActivityWalkListStateReset = useResetRecoilState(
        ActivityWalkListState
    ) // 활동량 현황

    const NonMeasureListStateReset = useResetRecoilState(NonMeasureListState) // 미측정 현황
    const HealthIndicatorsListStateReset = useResetRecoilState(
        HealthIndicatorsListState
    ) // 미측정 현황
    const WalkRankingListStateReset = useResetRecoilState(WalkRankingListState) // 보행수 랭킹

    const AnalyticsMemberListStateReset = useResetRecoilState(
        AnalyticsMemberListState
    ) // 회원 통계
    const MesureListStateReset = useResetRecoilState(MesureListState) // 측정이용자 통계
    const DeviceListStateReset = useResetRecoilState(DeviceListState) // 기기 사용 통계

    const RiskFctrCountListStateReset = useResetRecoilState(
        RiskFctrCountListState
    ) // 위험요인 개수별 통계
    const RiskFctrItemsListStateReset = useResetRecoilState(
        RiskFctrItemsListState
    ) // 위험요인 항목별 통계

    const StplatListStateReset = useResetRecoilState(StplatListState) // 이용 약관 관리
    const NoticeListStateReset = useResetRecoilState(NoticeListState) // 게시판 관리
    const StplatDetailStateReset = useResetRecoilState(StplatDetailState) // 이용 약관 관리 상세
    const NoticeDetailStateReset = useResetRecoilState(NoticeDetailState) // 게시판 상세
    const PopupManageListStateReset = useResetRecoilState(PopupManageListState) // 팝업관리 리스트
    const PopupManageDetailStatetReset = useResetRecoilState(
        PopupManageDetailState
    ) // 팝업 관리 상세
    const BudgetListStateReset = useResetRecoilState(BudgetListState) // 리워드 관리 리스트
    const BudgetDetailStateReset = useResetRecoilState(BudgetDetailState) // 리워드 관리 상세

    const HelperNoticeListStateReset = useResetRecoilState(
        HelperNoticeListState
    ) // 고객센터 공지사항 리스트
    const HelperNoticeDetailStateReset = useResetRecoilState(
        HelperNoticeDetailState
    ) // 고객센터 공지사항 상세
    const HelperQnaListStateReset = useResetRecoilState(HelperQnaListState)
    const HelperQnaDetailStateReset = useResetRecoilState(HelperQnaDetailState)
    const HelperDownloadListStateReset = useResetRecoilState(
        HelperDownloadListState
    )
    const HelperDowloadListDetailStateReset = useResetRecoilState(
        HelperDowloadListDetailState
    )

    const AtomPageTabStateReset = useResetRecoilState(AtomPageTabState) // 메인 텝

    const resetTask = (recoilKey: RecoilStateKeyNameType): void => {
        const recoilState: {
            default: () => void
            'dashBoardPage/dashboard': () => void

            'memberPage/member-list': () => void
            'memberPage/member-detail': () => void
            'memberPage/consult-list': () => void
            'memberPage/consult-detail': () => void
            'memberPage/consult-chart-list': () => void
            'memberPage/consult-chart-sms': () => void
            'memberPage/consult-my-coach': () => void
            'memberPage/consult-survey': () => void
            'memberPage/consult-raw-age': () => void
            'memberPage/consult-message-box': () => void
            'memberPage/consult-meal-diary': () => void
            'memberPage/consult-my-graph': () => void
            'memberPage/consult-group-list': () => void
            'memberPage/consult-group-detail': () => void

            'memberPage/msg-send-list': () => void
            'memberPage/msg-book-list': () => void

            'instPage/inst-join-list': () => void
            'instPage/inst-list': () => void
            'instPage/inst-detail': () => void
            'instPage/eap-list': () => void
            'instPage/eap-detail': () => void
            'instPage/budget-list': () => void
            'instPage/budget-detail': () => void

            'contentsPage/magazine-list': () => void
            'contentsPage/magazine-detail': () => void
            'contentsPage/uhealthzone-list': () => void
            'contentsPage/uhealthzone-detail': () => void

            'statusPage/risk-fctr-list': () => void
            'statusPage/stress-list': () => void
            'statusPage/brain-list': () => void
            'statusPage/brftr-cmpr-list': () => void
            'statusPage/statistics-list': () => void
            'statusPage/activity-walk-list': () => void
            'statusPage/non-measure-list': () => void
            'statusPage/health-indicators-list': () => void
            'statusPage/walk-ranking-list': () => void

            'analyticsPage/member-list': () => void
            'analyticsPage/mesure-list': () => void
            'analyticsPage/device-list': () => void
            'analyticsPage/mesure-risk-fctr-items-list': () => void
            'analyticsPage/mesure-risk-fctr-count-list': () => void
            'analyticsPage/imprvm-list': () => void

            'managerPage/stplat-list': () => void
            'managerPage/notice-list': () => void
            'managerPage/stplat-detail': () => void
            'managerPage/notice-detail': () => void
            'managerPage/popup-manage-list': () => void
            'managerPage/popup-manage-detail': () => void

            'helperPage/notice-list': () => void
            'helperPage/notice-detail': () => void
            'helperPage/qna-list': () => void
            'helperPage/qna-detail': () => void
            'helperPage/download-list': () => void
            'helperPage/download-list-detail': () => void

            'tab/TabState': () => void
        } = {
            'dashBoardPage/dashboard': () => DashBoardPageStateReset(),

            'memberPage/member-list': () => MemberListStateReset(),
            'memberPage/member-detail': () => MemberDetailStateReset(),
            'memberPage/consult-list': () => ConsultListStateReset(),
            'memberPage/consult-detail': () => ConsultDetailStateReset(),
            'memberPage/consult-chart-list': () =>
                ConsultDetailChartListStateReset(),
            'memberPage/consult-chart-sms': () =>
                ConsultDetailChartSmsStateReset(),
            'memberPage/consult-my-coach': () => ConsultMyCoachStateReset(),
            'memberPage/consult-survey': () => ConsultSurveyStateReset(),
            'memberPage/consult-message-box': () =>
                ConsultMsgBoxListStateReset(),
            'memberPage/consult-raw-age': () => RawAgeStateReset(),
            'memberPage/consult-meal-diary': () => MealDiaryStateReset(),
            'memberPage/msg-send-list': () => MsgSendListStateReset(),
            'memberPage/msg-book-list': () => MsgBookListStateReset(),
            'memberPage/consult-my-graph': () => MyGraphStateReset(),

            'memberPage/consult-group-list': () => ConsultGroupListStateReset(),
            'memberPage/consult-group-detail': () =>
                ConsultGroupDetailStateReset(),

            'instPage/inst-join-list': () => InstJoinListStateReset(),
            'instPage/inst-list': () => InstListStateReset(),
            'instPage/inst-detail': () => InstDetailStateReset(),
            'instPage/eap-list': () => EapListStateReset(),
            'instPage/eap-detail': () => EapDetailStateReset(),
            'instPage/budget-list': () => BudgetListStateReset(),
            'instPage/budget-detail': () => BudgetDetailStateReset(),

            'contentsPage/magazine-list': () => MagazineListStateReset(),
            'contentsPage/magazine-detail': () => MagazineDetailStateReset(),
            'contentsPage/uhealthzone-list': () => UhealthzoneListStateReset(),
            'contentsPage/uhealthzone-detail': () =>
                UhealthzoneDetailStateReset(),

            'statusPage/risk-fctr-list': () => RiskFctrListStateReset(),
            'statusPage/stress-list': () => StressListStateReset(),
            'statusPage/brain-list': () => BrainListStateReset(),
            'statusPage/brftr-cmpr-list': () => BrftrCmprListStateReset(),
            'statusPage/statistics-list': () => StatisticsListStateReset(),
            'statusPage/activity-walk-list': () => ActivityWalkListStateReset(),
            'statusPage/non-measure-list': () => NonMeasureListStateReset(),
            'statusPage/health-indicators-list': () =>
                HealthIndicatorsListStateReset(),
            'statusPage/walk-ranking-list': () => WalkRankingListStateReset(),

            'analyticsPage/member-list': () => AnalyticsMemberListStateReset(),
            'analyticsPage/mesure-list': () => MesureListStateReset(),
            'analyticsPage/device-list': () => DeviceListStateReset(),
            'analyticsPage/mesure-risk-fctr-items-list': () =>
                RiskFctrCountListStateReset(),
            'analyticsPage/mesure-risk-fctr-count-list': () =>
                RiskFctrItemsListStateReset(),
            'analyticsPage/imprvm-list': () => StplatListStateReset(),

            'managerPage/stplat-list': () => StplatListStateReset(),
            'managerPage/notice-list': () => NoticeListStateReset(),
            'managerPage/stplat-detail': () => StplatDetailStateReset(),
            'managerPage/notice-detail': () => NoticeDetailStateReset(),
            'managerPage/popup-manage-list': () => PopupManageListStateReset(),
            'managerPage/popup-manage-detail': () =>
                PopupManageDetailStatetReset(),

            'helperPage/notice-list': () => HelperNoticeListStateReset(),
            'helperPage/notice-detail': () => HelperNoticeDetailStateReset(),
            'helperPage/qna-list': () => HelperQnaListStateReset(),
            'helperPage/qna-detail': () => HelperQnaDetailStateReset(),
            'helperPage/download-list': () => HelperDownloadListStateReset(),
            'helperPage/download-list-detail': () =>
                HelperDowloadListDetailStateReset(),
            'tab/TabState': () => AtomPageTabStateReset(),
            default: () => {
                //
            },
        }
        ;(recoilState[recoilKey] || recoilState['default'])()
    }

    const recoilReset = (recoilKey: RecoilStateKeyNameType) => {
        resetTask(recoilKey)
    }

    const fullRecoilReset = () => {
        _.forEach(Const.pageUseRecoilKeyName, e => {
            resetTask(e as RecoilStateKeyNameType)
        })
    }

    return {
        fullRecoilReset,
        recoilReset,
    }
}
