import React from 'react'
import { HelperQnaListItemInterface } from '@Type/HelperTypes'

export const NoticeTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `POST_ID`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `번호`,
                key: `POST_ID`,
            },
            {
                name: `제목`,
                key: `TITLE`,
            },
            {
                name: `등록 일자`,
                key: `REGIST_DT`,
            },
            {
                name: `조회수`,
                key: `VIEW_CNT`,
            },
        ],
    ],
    Lists: [],
}

export const QnaTableConfig = {
    Loading: true,
    Options: {
        selectAll: false,
        indexKey: `POST_ID`,
        bgState: true,
    },
    Columns: [
        [
            {
                name: `번호`,
                key: `POST_ID`,
            },
            {
                name: `소속`,
                key: `INST_NM`,
            },
            {
                name: `제목`,
                key: `TITLE`,
            },
            {
                name: `등록일자`,
                key: `REGIST_DT`,
            },
            {
                name: `답변여부`,
                key: `COMPLETE_YN`,
                component: ({ el }: { el: HelperQnaListItemInterface }) => {
                    return <>{el.COMPLETE_YN === 'Y' ? `답변완료` : `대기중`}</>
                },
            },
            {
                name: `응답`,
                key: `LIKE_CNT`,
            },
        ],
    ],
    Lists: [],
}
