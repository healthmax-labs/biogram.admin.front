import React from 'react'

export default {
    Menus: [
        {
            name: `회원현황`,
            pathName: `/manage/member/member-list`,
            Component: React.lazy(
                () => import('@Page/Manage/Member/MemberListPage')
            ),
        },
        {
            name: `소속현황`,
            pathName: `/manage/belong/belong-status`,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongStatusPage')
            ),
        },
        {
            name: `소속 가입신청`,
            pathName: `/manage/belong/belong-manage`,
            Component: React.lazy(
                () => import('@Page/Manage/Belong/BelongManagePage')
            ),
        },
    ],
}
