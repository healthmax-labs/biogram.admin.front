import React from 'react'

export default {
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
    reprsntTelno: `1644-2810`,
    maxTabCount: 10,
    mainLayoutTheme: [
        {
            name: `default`,
            code: ``,
        },
        {
            name: `건다온`,
            code: `GeonDaon`,
        },
    ],
    autoLogoutMinTime: 1, // 자동 로그아웃 알럿 타임.
    memberDeleteResnCode: '9999',
    pageUseRecoilKeyName: [
        'memberPage/member-detail',
        'memberPage/member-list',
        'memberPage/msg-send-list',
        'memberPage/msg-book-list',
        'memberPage/consult-list',
        'memberPage/consult-detail',
        'instPage/inst-list',
        'instPage/inst-detail',
        'instPage/inst-join-list',
        'contentsPage/magazine-list',
        'contentsPage/magazine-detail',
        'contentsPage/uhealthzone-list',
        'contentsPage/uhealthzone-detail',
        'statusPage/risk-fctr-list',
        'statusPage/brftr-cmpr-list',
        'statusPage/statistics-list',
        'statusPage/activity-walk-list',
        'analyticsPage/member-analytics-list',
        'analyticsPage/mesure-analytics-list',
        'analyticsPage/mesure-risk-fctr-items-list',
        'analyticsPage/mesure-risk-fctr-count-list',
        'analyticsPage/mesure-device-list',
        'managerPage/stplat-list',
        'managerPage/stplat-detail',
        'statusPage/notice-list',
        'managerPage/notice-detail',
    ],
}
