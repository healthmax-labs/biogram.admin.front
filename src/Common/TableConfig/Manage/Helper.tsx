import React from 'react'
import { HelperQnaListItemInterface } from '@Type/HelperTypes'
import { postQnaVoteUpDown } from '@Service/HelperService'
import { gmtTimeToTimeObject } from '@Helper'

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
                component: ({ el }: { el: HelperQnaListItemInterface }) => {
                    if (el.REGIST_DT) {
                        const dateObj = gmtTimeToTimeObject(
                            new Date(el.REGIST_DT)
                        )
                        return (
                            <>{`${dateObj.year}-${dateObj.monthPad}-${dateObj.dayPad}`}</>
                        )
                    } else {
                        return <></>
                    }
                },
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
                component: ({ el }: { el: HelperQnaListItemInterface }) => {
                    // like button 은 본인이 올린글이 아니고, 이미 누른 게시물은 클릭이 안되게 처리.

                    const {
                        MBER_NO,
                        POST_ID,
                        LIKE_CNT,
                        REGIST_ID,
                        COMPLETE_YN,
                    } = el

                    const handleLikeUpClick = async () => {
                        if (MBER_NO !== REGIST_ID) return
                        if (LIKE_CNT !== 0) return
                        if (COMPLETE_YN === 'N') return

                        await postQnaVoteUpDown({
                            POST_ID: POST_ID,
                            vote: `UP`,
                        })
                    }
                    const handleLikeDownClick = async () => {
                        if (MBER_NO !== REGIST_ID) return
                        if (LIKE_CNT !== 0) return
                        if (COMPLETE_YN === 'N') return

                        await postQnaVoteUpDown({
                            POST_ID: POST_ID,
                            vote: `DOWN`,
                        })
                    }
                    return (
                        <div className="flex flex-nowrap w-full items-center justify-center h-4 gap-2">
                            {(LIKE_CNT === 0 || LIKE_CNT > 0) && (
                                <div className="flex h-4">
                                    <svg
                                        onClick={() => handleLikeUpClick()}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                    </svg>
                                </div>
                            )}
                            {(LIKE_CNT === 0 || LIKE_CNT < 0) && (
                                <div className="flex h-4">
                                    <svg
                                        onClick={() => handleLikeDownClick()}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    )
                },
            },
        ],
    ],
    Lists: [],
}
