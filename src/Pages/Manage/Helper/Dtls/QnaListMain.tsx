import { PageContainerStyle } from '@Style/Layouts/Manage/MainStyles'
import { MainStyle } from '@Style/Pages/CommonStyle'
import QnaListTable from './QnaListTable'
import QnaManageBox from './QnaManageBox'
import React, { useCallback, useEffect, useState } from 'react'
import QnaSearchBox from './QnaSearchBox'
import { RecoilStateKeyNameType } from '@CommonTypes'
import { LikeUpDownImageClickInterace } from '@Type/HelperTypes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AtomPageTabState } from '@Recoil/PageTabState'
import { useMainLayouts, useRecoilReset } from '@Hook/index'
import { QnaListState } from '@Recoil/HelperPageState'
import {
    getSearchQuestionlist,
    postQnaVoteUpDown,
} from '@Service/HelperService'
import { AtomRootState } from '@Recoil/AppRootState'
import _ from 'lodash'
import { VaryModal } from '@Elements'
import Messages from '@Messages'

const {
    ListPage: { Container },
} = PageContainerStyle
const { SearchWapper, TableWapper, ManageWapper } = MainStyle

const initializeState = {
    modal: {
        voidLoading: false,
        likeMessage: false,
    },
}

const QnaListMain = () => {
    const { recoilReset } = useRecoilReset()
    const [tabState, setTabState] = useRecoilState(AtomPageTabState)
    const [listState, setListState] = useRecoilState(QnaListState)
    const RootState = useRecoilValue(AtomRootState)
    const [pageState, setPageState] = useState<{
        modal: {
            voidLoading: boolean
            likeMessage: boolean
        }
    }>(initializeState)
    const { handlMainAlert } = useMainLayouts()

    const getList = useCallback(async () => {
        const {
            userinfo: { MBER_NO },
        } = RootState

        if (MBER_NO) {
            setListState(prevState => ({
                ...prevState,
                status: `loading`,
            }))

            const { status, payload } = await getSearchQuestionlist({
                TITLE: listState.search.TITLE,
                COMPLETE_YN: listState.search.COMPLETE_YN,
            })
            if (status) {
                setListState(prevState => ({
                    ...prevState,
                    status: `success`,
                    list: {
                        QUESTION_LIST: _.map(payload.QUESTION_LIST, e => {
                            return {
                                ...e,
                                MBER_NO: MBER_NO,
                            }
                        }),
                    },
                }))
            } else {
                setListState(prevState => ({
                    ...prevState,
                    status: `failure`,
                    list: {
                        QUESTION_LIST: [],
                    },
                }))
            }
        } else {
            setListState(prevState => ({
                ...prevState,
                status: `failure`,
                list: {
                    QUESTION_LIST: [],
                },
            }))
        }
    }, [
        RootState,
        listState.search.COMPLETE_YN,
        listState.search.TITLE,
        setListState,
    ])

    const handleLikeUpClick = async (el: LikeUpDownImageClickInterace) => {
        // like button 은 본인이 올린글이 아니고, 이미 누른 게시물은 클릭이 안되게 처리.
        const { MBER_NO } = RootState.userinfo
        const { REGIST_ID, LIKE_CNT, POST_ID, COMPLETE_YN } = el
        if (MBER_NO !== REGIST_ID) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.notRegisterLikeButton,
            })
            return
        }

        // 이미 클릭한 게시물일떄
        if (LIKE_CNT !== 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.alreadyLikeButton,
            })
            return
        }

        // 대기중일 때
        if (COMPLETE_YN === 'N') {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.yetComplete,
            })
            return
        }

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                voidLoading: true,
            },
        }))

        const { status } = await postQnaVoteUpDown({
            POST_ID: POST_ID,
            vote: `UP`,
        })

        if (status) {
            getList().then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                voidLoading: false,
            },
        }))
    }
    const handleLikeDownClick = async (el: LikeUpDownImageClickInterace) => {
        // like button 은 본인이 올린글이 아니고, 이미 누른 게시물은 클릭이 안되게 처리.
        const { MBER_NO } = RootState.userinfo
        const { REGIST_ID, LIKE_CNT, POST_ID, COMPLETE_YN } = el
        if (MBER_NO !== REGIST_ID) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.notRegisterLikeButton,
            })
            return
        }

        // 이미 클릭한 게시물일떄
        if (LIKE_CNT !== 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.alreadyLikeButton,
            })
            return
        }

        // 대기중일 때
        if (COMPLETE_YN === 'N') {
            handlMainAlert({
                state: true,
                message: Messages.Default.Helper.qna.yetComplete,
            })
            return
        }

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                voidLoading: true,
            },
        }))

        const { status } = await postQnaVoteUpDown({
            POST_ID: POST_ID,
            vote: `DOWN`,
        })

        if (status) {
            getList().then()
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                voidLoading: false,
            },
        }))
    }

    useEffect(() => {
        const pageStart = () => {
            if (listState.status === `idle`) {
                getList().then()
            }
        }

        pageStart()
    }, [getList, listState.status])

    useEffect(() => {
        /**
         * 현재 활성화 되어 있는 텝을 닫았을때 MainTabComponent 에서 recoil을 리셋 했을경우
         * pageStart 함수에서 idle 로 인식해서 api를 다시 콜하는 버그를 해결하기 위해
         * 현재 텝에서 리셋해야 하는경우를 구분을 해서 현재 component가 사라질때 recoil을 리셋해준다.
         */
        return () => {
            if (tabState.close.recoilResetWhere === 'mainComponent') {
                recoilReset(tabState.close.recoilKey as RecoilStateKeyNameType)

                setTabState(prevState => ({
                    ...prevState,
                    close: {
                        closeIndex: null,
                        recoilKey: null,
                        recoilResetWhere: null,
                    },
                }))
            }
        }

        // FIXME : 종속성에서 recoilReset, setTabState, tabState.close.recoilKey, tabState.close.recoilResetWhere 업데이트 되면
        // 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabState.close])

    return (
        <Container>
            <SearchWapper>
                <QnaSearchBox HandleGetList={() => getList()} />
            </SearchWapper>
            <ManageWapper>
                <QnaManageBox />
            </ManageWapper>
            <TableWapper>
                <QnaListTable
                    HandleLikeUpClick={el => handleLikeUpClick(el)}
                    HandleLikeDownClick={el => handleLikeDownClick(el)}
                />
            </TableWapper>
            {pageState.modal.voidLoading && (
                <VaryModal
                    ModalLoading={true}
                    MaxWidth={'sm'}
                    Children={<></>}
                />
            )}
        </Container>
    )
}

export default QnaListMain
