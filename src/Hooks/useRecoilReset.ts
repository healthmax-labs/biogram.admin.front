import { RecoilStateKeyNameType } from '@CommonTypes'
import { useResetRecoilState } from 'recoil'
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

export default function useRecoilReset() {
    const MemberDetailStateReset = useResetRecoilState(MemberDetailState)
    const MemberListStateReset = useResetRecoilState(MemberListState)
    const MsgSendListStateReset = useResetRecoilState(MsgSendListState)
    const MsgBookListStateReset = useResetRecoilState(MsgBookListState)
    const ConsultListStateReset = useResetRecoilState(ConsultListState)
    const ConsultDetailStateReset = useResetRecoilState(ConsultDetailState)

    const InstListStateReset = useResetRecoilState(InstListState)
    const InstDetailStateReset = useResetRecoilState(InstDetailState)
    const InstJoinListStateReset = useResetRecoilState(InstJoinListState)

    const MagazineListStateReset = useResetRecoilState(MagazineListState)
    const MagazineDetailStateReset = useResetRecoilState(MagazineDetailState)
    const UhealthzoneListStateReset = useResetRecoilState(UhealthzoneListState)
    const UhealthzoneDetailStateReset = useResetRecoilState(
        UhealthzoneDetailState
    )

    const RiskFctrListStateReset = useResetRecoilState(RiskFctrListState)
    const BrftrCmprListStateReset = useResetRecoilState(BrftrCmprListState)
    const StatisticsListStateReset = useResetRecoilState(StatisticsListState)
    const ActivityWalkListStateReset = useResetRecoilState(
        ActivityWalkListState
    )

    const MberAnalyticsListStateReset = useResetRecoilState(
        MberAnalyticsListState
    )
    const MesureAnalyticsListStateReset = useResetRecoilState(
        MesureAnalyticsListState
    )
    const RiskFctrItemsAnalyticsListStateReset = useResetRecoilState(
        RiskFctrItemsAnalyticsListState
    )
    const RiskFctrCountAnalyticsListStateReset = useResetRecoilState(
        RiskFctrCountAnalyticsListState
    )
    const DeviceAnalyticsListStateReset = useResetRecoilState(
        DeviceAnalyticsListState
    )

    const StplatListStateReset = useResetRecoilState(StplatListState)
    const StplatDetailStateReset = useResetRecoilState(StplatDetailState)
    const NoticeListStateReset = useResetRecoilState(NoticeListState)

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
                console.debug('managerPage/notice-detail'),
            default: () => {
                //
            },
        }
        ;(recoilState[recoilKey] || recoilState['default'])()
    }

    const recoilReset = (recoilKey: RecoilStateKeyNameType) => {
        resetTask(recoilKey)
    }

    return {
        recoilReset,
    }
}
