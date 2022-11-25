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
            menuCode: `10102`,
            name: `메세지 발송이력`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberListPage')
            ),
        },
        {
            mainCode: `10000`,
            menuCode: `10103`,
            name: `예약 메세지 발송현황`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberListPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20101`,
            name: `소속현황`,
            pathName: `/manage/belong/belong-status`,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongStatusPage')
            ),
        },
        {
            mainCode: `20000`,
            menuCode: `20201`,
            name: `소속 가입신청`,
            pathName: `/manage/belong/belong-manage`,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30101`,
            name: `매거진`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `30000`,
            menuCode: `30201`,
            name: `바이오그램 존`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40101`,
            name: `위험요인 현황`,
            pathName: `/manage/status-list/risk-fctr`,
            Component: React.lazy(
                () => import('@Page/Manage/RiskFctrList/RiskFctrListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40201`,
            name: `전후비교 현황`,
            pathName: `/manage/status-list/brftt-cmpr`,
            Component: React.lazy(
                () => import('@Page/Manage/BrftrCmprList/BrftrCmprListPage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40301`,
            name: `기기측정 현황`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `40000`,
            menuCode: `40401`,
            name: `활동량 현황`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
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
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
        {
            mainCode: `70000`,
            menuCode: `70101`,
            name: `게시판 관리`,
            pathName: ``,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
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
}
