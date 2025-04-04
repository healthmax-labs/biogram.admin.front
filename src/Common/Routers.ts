import React from 'react'

export default {
    Main: [
        {
            mainCode: `00000`,
            menuCode: `00000`,
            name: `대시보드`,
            pathName: `/manage/dashboard`,
            category: `dashboard`,
            recooilKey: ``,
            showFlag: 'Y',
            reloadButton: true,
            Component: React.lazy(
                () => import('@Page/Manage/Dashboard/DashboardPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10101`,
            name: `회원현황`,
            pathName: `/manage/member/member-list`,
            category: `member`,
            recooilKey: `memberPage/member-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: ``,
            name: `회원등록`,
            pathName: `/manage/member/new-member`,
            category: `member`,
            recooilKey: `memberPage/member-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberDetailPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: ``,
            name: `회원상세`,
            pathName: `/manage/member/:MEMBER_NO/detail`,
            category: `member`,
            recooilKey: `memberPage/member-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberDetailPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10201`,
            name: `메시지 발송이력`,
            pathName: `/manage/member/msgsend-list`,
            category: `msgsend`,
            recooilKey: `memberPage/msg-send-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MsgSendListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10301`,
            name: `메시지 예약현황`,
            pathName: `/manage/member/msgbook-list`,
            category: `msgbook`,
            recooilKey: `memberPage/msg-book-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MsgBookListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10401`,
            name: `상담회원 현황`,
            pathName: `/manage/member/consult-list`,
            category: `consult`,
            recooilKey: `memberPage/consult-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10401`,
            name: `상담회원 상세`,
            pathName: `/manage/member/consult-detail/:memNo/:category`,
            category: `consult`,
            recooilKey: `memberPage/consult-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultDetailPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10501`,
            name: `상담회원그룹`,
            pathName: `/manage/member/consult-group-list`,
            category: `consult-group`,
            recooilKey: `memberPage/consult-group-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultGroupListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10502`,
            name: `상담회원그룹 상세`,
            pathName: `/manage/member/consult-group/:groupNo/detail`,
            category: `consult-group`,
            recooilKey: `memberPage/consult-group-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultGroupDetailPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10503`,
            name: `상담회원그룹 등록`,
            pathName: `/manage/member/consult-group-list/new`,
            category: `consult-group`,
            recooilKey: `memberPage/consult-group-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/ConsultGroupDetailPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속현황`,
            pathName: `/manage/inst/inst-list`,
            category: `inst`,
            recooilKey: `instPage/inst-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstListPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속등록`,
            pathName: `/manage/inst/inst-list/new`,
            category: `inst`,
            recooilKey: `instPage/inst-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstNewPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속상세`,
            pathName: `/manage/inst/inst-list/:instNo/detail`,
            category: `inst`,
            recooilKey: `instPage/inst-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/InstDetailPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20201`,
            name: `소속 가입신청`,
            pathName: `/manage/inst/join-list`,
            category: `join`,
            recooilKey: `instPage/inst-join-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/JoinListPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20301`,
            name: `EAP 현황`,
            pathName: `/manage/inst/eap-list`,
            category: `eap`,
            recooilKey: `instPage/eap-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/EapListPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20301`,
            name: `EAP 상세`,
            pathName: `/manage/inst/eap-list/:eapNo/detail`,
            category: `eap`,
            recooilKey: `instPage/eap-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/EapDetailPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20301`,
            name: `EAP 등록`,
            pathName: `/manage/inst/eap-list/new`,
            category: `eap`,
            recooilKey: `instPage/eap-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Inst/EapDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30101`,
            name: `매거진`,
            pathName: `/manage/contents/magazine-list`,
            category: `magazine`,
            recooilKey: `contentsPage/magazine-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/MagazineListPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30101`,
            name: `메거진 상세`,
            pathName: `/manage/contents/:misn_step/detail`,
            category: `magazine`,
            recooilKey: `contentsPage/magazine-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/MagazineDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30101`,
            name: `매거진 신규 등록`,
            pathName: `/manage/contents/magazine-list/new`,
            category: `magazine`,
            recooilKey: `contentsPage/magazine-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/MagazineDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30201`,
            name: `바이오그램 존`,
            pathName: `/manage/contents/uhealthzone-list`,
            category: `uhealthzone`,
            recooilKey: `contentsPage/uhealthzone-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/UhealthzoneListPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30201`,
            name: `바이오그램 존 상세`,
            pathName: `/manage/contents/uhealthzone/:UhealthZoneNo/detail`,
            category: `uhealthzone`,
            recooilKey: `contentsPage/uhealthzone-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/UhealthzoneDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30201`,
            name: `바이오그램 등록`,
            pathName: `/manage/contents/uhealthzone/new`,
            category: `uhealthzone`,
            recooilKey: `contentsPage/uhealthzone-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/UhealthzoneDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30301`,
            name: `마인드 라운지`,
            pathName: `/manage/contents/lounge-list`,
            category: `lounge`,
            recooilKey: `contentsPage/lounge-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/LoungeListPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30301`,
            name: `마인드 라운지 상세`,
            pathName: `/manage/contents/lounge/:postId/detail`,
            category: `lounge`,
            recooilKey: `contentsPage/lounge-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/LoungeDetailPage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30301`,
            name: `마인드 라운지 등록`,
            pathName: `/manage/contents/lounge/new`,
            category: `lounge`,
            recooilKey: `contentsPage/lounge-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Contents/LoungeDetailPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40101`,
            name: `위험요인 현황`,
            pathName: `/manage/status/risk-fctr`,
            category: `risk-fctr`,
            recooilKey: `statusPage/risk-fctr-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/RiskFctrListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40801`,
            name: `스트레스 현황`,
            pathName: `/manage/status/stress-list`,
            category: `stress-list`,
            recooilKey: `statusPage/stress-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/StressListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40901`,
            name: `뇌기능 현황`,
            pathName: `/manage/status/brain-list`,
            category: `brain-list`,
            recooilKey: `statusPage/brain-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/BrainListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40201`,
            name: `전후비교 현황`,
            pathName: `/manage/status/brftt-cmpr`,
            category: `brftt-cmpr`,
            recooilKey: `statusPage/brftr-cmpr-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/BrftrCmprListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40301`,
            name: `기기측정 현황`,
            pathName: `/manage/status/statistics`,
            category: `statistics`,
            recooilKey: `statusPage/statistics-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/StatisticsListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40401`,
            name: `활동량 현황`,
            pathName: `/manage/status/activity-walk`,
            category: `activity-walk`,
            recooilKey: `statusPage/activity-walk-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/ActivityWalkListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40501`,
            name: `미측정 현황`,
            pathName: `/manage/status/non-measure`,
            category: `non-measure`,
            recooilKey: `statusPage/non-measure-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/NonMeasureListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40601`,
            name: `건강지표개선 현황`,
            pathName: `/manage/status/health-indicators`,
            category: `health-indicators`,
            recooilKey: `statusPage/health-indicators-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/HealthIndicatorsListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40701`,
            name: `보행수 랭킹`,
            pathName: `/manage/status/walk-ranking`,
            category: `walk-ranking`,
            recooilKey: `statusPage/walk-ranking-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Status/WalkRankingListPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50601`,
            name: `회원 통계`,
            pathName: `/manage/analytics/member`,
            category: `member`,
            recooilKey: `analyticsPage/member-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/MemberPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50701`,
            name: `측정 이용자 통계`,
            pathName: `/manage/analytics/measure-user`,
            category: `measure-user`,
            recooilKey: `analyticsPage/mesure-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/MeasureUserPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50801`,
            name: `위험요인 항목별 통계`,
            pathName: `/manage/analytics/risk-fctr-items`,
            category: `risk-fctr-items`,
            recooilKey: `analyticsPage/mesure-risk-fctr-items-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/RiskFctrItemsPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `51201`,
            name: `스트레스 통계`,
            pathName: `/manage/analytics/stress`,
            category: `stress`,
            recooilKey: `analyticsPage/stress-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/StressPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `50901`,
            name: `위험요인 개수별 통계`,
            pathName: `/manage/analytics/risk-fctr-count`,
            category: `risk-fctr-count`,
            recooilKey: `analyticsPage/mesure-risk-fctr-count-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/RiskFctrCountPage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `51001`,
            name: `기기사용 통계`,
            pathName: `/manage/analytics/device-use`,
            category: `device-use`,
            recooilKey: `analyticsPage/mesure-device-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/DeviceUsePage')
            ),
        },
        {
            mainCode: `50000`,
            menuCode: `51101`,
            name: `건강지표 개선통계`,
            pathName: `/manage/analytics/health-indicators`,
            category: `health-indicators`,
            recooilKey: `analyticsPage/health-indicators-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Analytics/HealthIndicatorsPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60101`,
            name: `태블릿 시리얼키 관리`,
            pathName: ``,
            category: ``,
            recooilKey: ``,
            showFlag: 'N',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60201`,
            name: `이용 약관 관리`,
            pathName: `/manage/manager/stplat`,
            category: `stplat`,
            recooilKey: `managerPage/stplat-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/StplatListPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60201`,
            name: `이용 약관 관리 상세`,
            pathName: `/manage/manager/stplat/:seCode/:kndCode/:SN/detail`,
            category: `stplat`,
            recooilKey: `managerPage/stplat-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/StplatDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60202`,
            name: `이용 약관 관리 개정`,
            pathName: `/manage/manager/stplat/:seCode/:kndCode/:SN/:STPLAT/stplat`,
            category: `stplat`,
            recooilKey: `managerPage/stplat-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/StplatDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60301`,
            name: `게시판 관리`,
            pathName: `/manage/manager/notice-list`,
            category: `notice`,
            recooilKey: `managerPage/notice-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/NoticeListPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60301`,
            name: `게시판 상세`,
            pathName: `/manage/manager/notice/:NOTICE_NO/detail`,
            category: `notice`,
            recooilKey: `managerPage/notice-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/NoticeDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60301`,
            name: `게시판 신규 등록`,
            pathName: `/manage/manager/notice/new`,
            category: `notice`,
            recooilKey: `managerPage/notice-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/NoticeDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60401`,
            name: `팝업 관리`,
            pathName: `/manage/manager/popup-manage-list`,
            category: `popup`,
            recooilKey: `managerPage/popup-manage-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/PopupManageListPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60401`,
            name: `팝업 관리 등록`,
            pathName: `/manage/manager/popup-manage-list/new`,
            category: `popup`,
            recooilKey: `managerPage/popup-manage-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/PopupManageDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60401`,
            name: `팝업 관리 상세`,
            pathName: `/manage/manager/popup-manage-list/:POPUP_PK/detail`,
            category: `popup`,
            recooilKey: `managerPage/popup-manage-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/PopupManageDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60501`,
            name: `리워드 관리`,
            pathName: `/manage/manager/budget-list`,
            category: `budget`,
            recooilKey: `managerPage/budget-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/BudgetListPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60501`,
            name: `리워드 등록`,
            pathName: `/manage/manager/budget-list/new`,
            category: `budget`,
            recooilKey: `managerPage/budget-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/BudgetDetailPage')
            ),
        },
        {
            mainCode: `60000`,
            menuCode: `60501`,
            name: `리워드 상세`,
            pathName: `/manage/manager/budget-list/:BUDGET_SN/detail`,
            category: `budget`,
            recooilKey: `managerPage/budget-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Manager/BudgetDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80101`,
            name: `공지사항`,
            pathName: `/manage/helper/notice-list`,
            category: `notice`,
            recooilKey: `helperPage/notice-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/NoticeListPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80101`,
            name: `공지사항 등록`,
            pathName: `/manage/helper/notice/new`,
            category: `notice`,
            recooilKey: `helperPage/notice-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/NoticeDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80101`,
            name: `공지사항 상세`,
            pathName: `/manage/helper/notice/:POST_ID/detail`,
            category: `notice`,
            recooilKey: `helperPage/notice-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/NoticeDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80201`,
            name: `질문답변`,
            pathName: `/manage/helper/qna-list`,
            category: `qna`,
            recooilKey: `helperPage/qna-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/QnaListPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80201`,
            name: `질문답변 등록`,
            pathName: `/manage/helper/qna/new`,
            category: `qna`,
            recooilKey: `helperPage/qna-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/QnaDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80201`,
            name: `질문답변 상세`,
            pathName: `/manage/helper/qna/:POST_ID/detail`,
            category: `qna`,
            recooilKey: `helperPage/qna-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/QnaDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80301`,
            name: `자료실`,
            pathName: `/manage/helper/download-list`,
            category: `download`,
            recooilKey: `helperPage/download-list`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/DownloadListPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80301`,
            name: `자료실 등록`,
            pathName: `/manage/helper/download-list/new`,
            category: `download`,
            recooilKey: `helperPage/download-list-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/DownloadDetailPage')
            ),
        },
        {
            mainCode: `80000`,
            menuCode: `80301`,
            name: `자료실 상세`,
            pathName: `/manage/helper/download-list/:POST_ID/detail`,
            category: `download`,
            recooilKey: `helperPage/download-list-detail`,
            showFlag: 'Y',
            reloadButton: false,
            Component: React.lazy(
                () => import('@Page/Manage/Helper/DownloadDetailPage')
            ),
        },
    ],
    ConsultTabs: [
        {
            name: `마이데이터`,
            category: `mydata`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailPartMyData')
            ),
        },
        {
            name: `마이그래프`,
            category: `mygraph`,
            active: false,
            Component: React.lazy(
                () =>
                    import('@Page/Manage/Member/Dtls/ConsultDetailPartMyGraph')
            ),
        },
        {
            name: `생체나이`,
            category: `raw-age`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailPartRawAge')
            ),
        },
        {
            name: `마이코치`,
            category: `mycoach`,
            active: false,
            Component: React.lazy(
                () =>
                    import('@Page/Manage/Member/Dtls/ConsultDetailPartMyCoach')
            ),
        },
        {
            name: `식사일기`,
            category: `mealdiary`,
            active: false,
            Component: React.lazy(
                () =>
                    import(
                        '@Page/Manage/Member/Dtls/ConsultDetailPartMealdiary'
                    )
            ),
        },
        {
            name: `설문조사`,
            category: `survey`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailPartSurvey')
            ),
        },
        {
            name: `메시지 발송함`,
            category: `mesg`,
            active: false,
            Component: React.lazy(
                () =>
                    import('@Page/Manage/Member/Dtls/ConsultDetailPartMessage')
            ),
        },
        {
            name: `상담차트`,
            category: `chart`,
            active: false,
            Component: React.lazy(
                () => import('@Page/Manage/Member/Dtls/ConsultDetailPartChart')
            ),
        },
        {
            name: `영양레포트`,
            category: `nutrition-report`,
            active: false,
            Component: React.lazy(
                () =>
                    import(
                        '@Page/Manage/Member/Dtls/ConsultDetailPartNutritionReport'
                    )
            ),
        },
    ],
}
