import { RecoilStateKeyNameType } from '@CommonTypes'
import { useResetRecoilState } from 'recoil'
import Const from '@Const'
import _ from 'lodash'
import {
    ConsultDetailState,
    ConsultListState,
    MemberDetailState,
    MemberListState,
    MsgBookListState,
    MsgSendListState,
} from '@Recoil/MemberPagesState'
import {
    InstDetailState,
    InstJoinListState,
    InstListState,
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
} from '@Recoil/StatusPagesState'
import {
    DeviceAnalyticsListState,
    MberAnalyticsListState,
    MesureAnalyticsListState,
    RiskFctrCountAnalyticsListState,
    RiskFctrItemsAnalyticsListState,
} from '@Recoil/AnalyticsPagesState'
import {
    NoticeListState,
    StplatDetailState,
    StplatListState,
} from '@Recoil/ManagerPagesState'
import { AtomPageTabState } from '@Recoil/PageTabState'

export default function useRecoilReset() {
    const MemberDetailStateReset = useResetRecoilState(MemberDetailState) // 회원상세
    const MemberListStateReset = useResetRecoilState(MemberListState) // 회원현황
    const MsgSendListStateReset = useResetRecoilState(MsgSendListState) // 메세지 발송이력
    const MsgBookListStateReset = useResetRecoilState(MsgBookListState) // 메세지 예약현황
    const ConsultListStateReset = useResetRecoilState(ConsultListState) // 상담회원 현황
    const ConsultDetailStateReset = useResetRecoilState(ConsultDetailState) // 상담회원 상세

    const InstListStateReset = useResetRecoilState(InstListState) // 소속현황
    const InstDetailStateReset = useResetRecoilState(InstDetailState) // 소속상세
    const InstJoinListStateReset = useResetRecoilState(InstJoinListState) // 소속 가입신청

    const MagazineListStateReset = useResetRecoilState(MagazineListState) // 매거진
    const MagazineDetailStateReset = useResetRecoilState(MagazineDetailState) // 메거진 상세
    const UhealthzoneListStateReset = useResetRecoilState(UhealthzoneListState) // 바이오그램 존
    const UhealthzoneDetailStateReset = useResetRecoilState(
        // 바이오그램 존 상세
        UhealthzoneDetailState
    )

    const RiskFctrListStateReset = useResetRecoilState(RiskFctrListState) // 위험요인 현황
    const BrftrCmprListStateReset = useResetRecoilState(BrftrCmprListState) // 전후비교 현황
    const StatisticsListStateReset = useResetRecoilState(StatisticsListState) // 기기측정 현황
    const ActivityWalkListStateReset = useResetRecoilState(
        // 활동량 현황
        ActivityWalkListState
    )

    const MberAnalyticsListStateReset = useResetRecoilState(
        // FIXME : 구분X
        MberAnalyticsListState
    )
    const MesureAnalyticsListStateReset = useResetRecoilState(
        // FIXME : 구분X
        MesureAnalyticsListState
    )
    const RiskFctrItemsAnalyticsListStateReset = useResetRecoilState(
        // FIXME : 구분X
        RiskFctrItemsAnalyticsListState
    )
    const RiskFctrCountAnalyticsListStateReset = useResetRecoilState(
        // FIXME : 구분X
        RiskFctrCountAnalyticsListState
    )
    const DeviceAnalyticsListStateReset = useResetRecoilState(
        // FIXME : 구분X
        DeviceAnalyticsListState
    )

    const StplatListStateReset = useResetRecoilState(StplatListState) // 이용 약관 관리
    const StplatDetailStateReset = useResetRecoilState(StplatDetailState) // 이용 약관 관리 상세
    const NoticeListStateReset = useResetRecoilState(NoticeListState) // 게시판 관리

    const AtomPageTabStateREset = useResetRecoilState(AtomPageTabState) // 메인 텝

    const resetTask = (recoilKey: RecoilStateKeyNameType): void => {
        const recoilState: {
            default: () => void
            'memberPage/member-detail': () => void
            'memberPage/member-list': () => void
            'memberPage/msg-send-list': () => void
            'memberPage/msg-book-list': () => void
            'memberPage/consult-list': () => void
            'memberPage/consult-detail': () => void
            'instPage/inst-list': () => void
            'instPage/inst-detail': () => void
            'instPage/inst-join-list': () => void
            'contentsPage/magazine-list': () => void
            'contentsPage/magazine-detail': () => void
            'contentsPage/uhealthzone-list': () => void
            'contentsPage/uhealthzone-detail': () => void
            'statusPage/risk-fctr-list': () => void
            'statusPage/brftr-cmpr-list': () => void
            'statusPage/statistics-list': () => void
            'statusPage/activity-walk-list': () => void
            'analyticsPage/member-analytics-list': () => void
            'analyticsPage/mesure-analytics-list': () => void
            'analyticsPage/mesure-risk-fctr-items-list': () => void
            'analyticsPage/mesure-risk-fctr-count-list': () => void
            'analyticsPage/mesure-device-list': () => void
            'managerPage/stplat-list': () => void
            'managerPage/stplat-detail': () => void
            'statusPage/notice-list': () => void
            'managerPage/notice-detail': () => void
        } = {
            'memberPage/member-detail': () => MemberDetailStateReset(),
            'memberPage/member-list': () => MemberListStateReset(),
            'memberPage/msg-send-list': () => MsgSendListStateReset(),
            'memberPage/msg-book-list': () => MsgBookListStateReset(),
            'memberPage/consult-list': () => ConsultListStateReset(),
            'memberPage/consult-detail': () => ConsultDetailStateReset(),
            'instPage/inst-list': () => InstListStateReset(),
            'instPage/inst-detail': () => InstDetailStateReset(),
            'instPage/inst-join-list': () => InstJoinListStateReset(),
            'contentsPage/magazine-list': () => MagazineListStateReset(),
            'contentsPage/magazine-detail': () => MagazineDetailStateReset(),
            'contentsPage/uhealthzone-list': () => UhealthzoneListStateReset(),
            'contentsPage/uhealthzone-detail': () =>
                UhealthzoneDetailStateReset(),
            'statusPage/risk-fctr-list': () => RiskFctrListStateReset(),
            'statusPage/brftr-cmpr-list': () => BrftrCmprListStateReset(),
            'statusPage/statistics-list': () => StatisticsListStateReset(),
            'statusPage/activity-walk-list': () => ActivityWalkListStateReset(),
            'analyticsPage/member-analytics-list': () =>
                MberAnalyticsListStateReset(),
            'analyticsPage/mesure-analytics-list': () =>
                MesureAnalyticsListStateReset(),
            'analyticsPage/mesure-risk-fctr-items-list': () =>
                RiskFctrItemsAnalyticsListStateReset(),
            'analyticsPage/mesure-risk-fctr-count-list': () =>
                RiskFctrCountAnalyticsListStateReset(),
            'analyticsPage/mesure-device-list': () =>
                DeviceAnalyticsListStateReset(),
            'managerPage/stplat-list': () => StplatListStateReset(),
            'managerPage/stplat-detail': () => StplatDetailStateReset(),
            'statusPage/notice-list': () => NoticeListStateReset(),
            'managerPage/notice-detail': () =>
                console.debug('managerPage/notice-detail'), // FIXME: 공지사항 recoil 개발 필요.
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

        AtomPageTabStateREset()
    }

    return {
        fullRecoilReset,
        recoilReset,
    }
}
