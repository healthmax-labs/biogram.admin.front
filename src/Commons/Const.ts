import React from 'react'

export default {
    Routers: [
        {
            mainCode: `10000`,
            menuCode: `10101`,
            name: `회원현황`,
            pathName: `/manage/member/member-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: ``,
            name: `회원상세`,
            pathName: `/manage/member/:MEMBER_NO/detail`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberDetailPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10201`,
            name: `메세지 발송이력`,
            pathName: `/manage/member/msgsend-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MsgSendListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10301`,
            name: `예약 메세지 발송현황`,
            pathName: `/manage/member/msgbook-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MsgBookListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10401`,
            name: `상담회원 현황`,
            pathName: `/manage/member/consult-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10401`,
            name: `상담회원 상세`,
            pathName: `/manage/member/consult-detail/:memNo/:category`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultDetailPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속현황`,
            pathName: `/manage/inst/inst-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstListPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속등록`,
            pathName: `/manage/inst/inst-list/new`,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstNewPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속상세`,
            pathName: `/manage/inst/inst-list/:instNo/detail`,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstDetailPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20201`,
            name: `소속 가입신청`,
            pathName: `/manage/inst/join-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/JoinListPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30101`,
            name: `매거진`,
            pathName: `/manage/contents/magazine-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/MagazineListPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30201`,
            name: `바이오그램 존`,
            pathName: `/manage/contents/uhealthzone-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/UhealthzoneListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40101`,
            name: `위험요인 현황`,
            pathName: `/manage/status/risk-fctr`,
            Component: React.lazy(
                () => import('@Page/Manage/Status/RiskFctrListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40201`,
            name: `전후비교 현황`,
            pathName: `/manage/status/brftt-cmpr`,
            Component: React.lazy(
                () => import('@Page/Manage/Status/BrftrCmprListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40301`,
            name: `기기측정 현황`,
            pathName: `/manage/status/statistics`,
            Component: React.lazy(
                () => import('@Page/Manage/Status/StatisticsListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40401`,
            name: `활동량 현황`,
            pathName: `/manage/status/activity-walk`,
            Component: React.lazy(
                () => import('@Page/Manage/Status/ActivityWalkListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40501`,
            name: `미측정 현황`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50101`,
            name: `사용자 통계`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50201`,
            name: `위험군 통계`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50301`,
            name: `위험요인 통계`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50401`,
            name: `복약 통계`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50501`,
            name: `기기사용 통계`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60101`,
            name: `태블릿 시리얼키 관리`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60201`,
            name: `이용 약관 관리`,
            pathName: `/manage/manager/stplat`,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/StplatListPage')
            ),
        },
        {
            mainCode: `70000`,
            menuCode: `70101`,
            name: `게시판 관리`,
            pathName: `/manage/manager/notice-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/NoticeListPage')
            ),
        },
    ],
    Layout: {
        Width: {
            LeftMenuWidth: `w48`, // 192px
            LeftMenuMarginLeft: `ml48`, // 192px
            CenterWidth: ``,
        },
    },
    ConsultTabs: [
        {
            name: `마이데이터`,
            category: `mydata`,
            active: false,
            Component: React.lazy(
                () =>
                    import('@Page/Manage/Member/Dtls/ConsultDetailTableMyData')
            ),
        },
        {
            name: `마이그래프`,
            category: `mygraph`,
            active: false,
            Component: React.lazy(
                () =>
                    import('@Page/Manage/Member/Dtls/ConsultDetailTableMyData')
            ),
        },
        {
            name: `생체나이`,
            category: `raw-age`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailRawAge')
            ),
        },
        {
            name: `마이코치`,
            category: `mycoach`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailMyCoach')
            ),
        },
        {
            name: `식사일기`,
            category: `mealdiary`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailMealdiary')
            ),
        },
        {
            name: `설문조사`,
            category: `survey`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailSurvey')
            ),
        },
        {
            name: `메시지 발송함`,
            category: `mesg`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailMessage')
            ),
        },
        {
            name: `상담차트`,
            category: `chart`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailChart')
            ),
        },
    ],
}
