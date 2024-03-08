export default {
    DefaultStartRouter: '/manage/dashboard',
    Layout: {
        Width: {
            LeftMenuWidth: `w48`, // 192px
            LeftMenuMarginLeft: `ml48`, // 192px
            CenterWidth: ``,
        },
    },
    reprsntTelno: `1644-2810`,
    maxTabCount: 10,
    maxLength: {
        loginId: 6,
        height: {
            start: 20,
            end: 250,
        },
        bdwgh: {
            start: 1,
            end: 200,
        },
        waistCrcmfrnc: {
            start: 20,
            end: 150,
        },
    },
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
        'dashBoardPage/dashboard',

        'memberPage/member-list',
        'memberPage/member-detail',
        'memberPage/consult-list',
        'memberPage/consult-detail',
        'memberPage/consult-chart-list',
        'memberPage/consult-chart',
        'memberPage/consult-sms-send',
        'memberPage/consult-my-coach',
        'memberPage/consult-survey',
        'memberPage/consult-message-box',
        'memberPage/consult-raw-age',
        'memberPage/consult-meal-diary',
        'memberPage/msg-send-list',
        'memberPage/msg-book-list',
        'memberPage/consult-my-graph',

        'memberPage/consult-group-list',
        'memberPage/consult-group-detail',

        'instPage/inst-join-list',
        'instPage/inst-list',
        'instPage/inst-detail',
        'instPage/eap-list',
        'instPage/eap-detail',
        'instPage/budget-list',
        'instPage/budget-detail',

        'contentsPage/magazine-list',
        'contentsPage/magazine-detail',
        'contentsPage/uhealthzone-list',
        'contentsPage/uhealthzone-detail',

        'statusPage/risk-fctr-list',
        'statusPage/stress-list',
        'statusPage/brain-list',
        'statusPage/brftr-cmpr-list',
        'statusPage/statistics-list',
        'statusPage/activity-walk-list',
        'statusPage/non-measure-list',
        'statusPage/health-indicators-list',
        'statusPage/walk-ranking-list',

        'analyticsPage/member-list',
        'analyticsPage/mesure-list',
        'analyticsPage/device-list',
        'analyticsPage/mesure-risk-fctr-items-list',
        'analyticsPage/mesure-risk-fctr-count-list',
        'analyticsPage/imprvm-list',

        'managerPage/stplat-list',
        'managerPage/notice-list',
        'managerPage/stplat-detail',
        'managerPage/notice-detail',
        'managerPage/popup-manage-list',
        'managerPage/popup-manage-detail',

        'helperPage/notice-list',
        'helperPage/notice-detail',
        'helperPage/qna-list',
        'helperPage/qna-detail',

        'tab/TabState',
    ],
    GeonDaonThemeSiteURL: 'geondaon.com',
    RiskFctrJdgmnt: [
        // 위험 요인 값 색
        {
            key: ``,
            name: `주의`,
            textColor: `eb6060`,
        },
        {
            key: ``,
            name: `나쁨`,
            textColor: `eb6060`,
        },
        {
            key: ``,
            name: `매우나쁨`,
            textColor: `eb6060`,
        },
    ],
    Pages: {
        perPage: 30,
    },
    MasterInstNo: `1000`,
    MemberIdStringFilter: [`master`, `system`, `admin`],
}
