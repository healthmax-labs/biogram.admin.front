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
