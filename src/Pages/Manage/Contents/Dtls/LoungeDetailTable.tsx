import React, { useState } from 'react'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ContentsPageStyle'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
import {
    ConfirmModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
    VaryProfile,
    VarySelectBox,
} from '@Elements'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

import VaryImageUpload from '@Element/Inputs/VaryImageUpload'
// import {
//     postLoungeDetail,
//     postLoungeDetailUpdate,
// } from '@Service/ContentsService'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useMainLayouts, useTab } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { LoungeDetailState, LoungeListState } from '@Recoil/ContentsPagesState'
import _ from 'lodash'
import { comment } from 'postcss'
import {
    getLoungeCommentAiGen,
    getLoungeDetailComments,
    postLoungeComment,
} from '@Service/ContentsService'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    LabelCellFull,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer, DatePickerLine } = DetailPageStyle

const textMaxLength: { title: number; content: number } = {
    title: 100,
    content: 1000,
}

const initializeState = {
    modal: {
        confirm: false,
    },
}

const LoungeDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ postId: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(LoungeDetailState)
    const setLoungeListState = useSetRecoilState(LoungeListState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    // 등록처리
    const handleSave = async () => {
        const { postId } = detailState.detail.postInfo

        // const { status } = await postLoungeDetail({
        //     ATCHMNFL_NO: Number(ATCHMNFL_NO),
        //     BEGIN_DT: BEGIN_DT,
        //     CN_ATCHMNFL_NO: Number(CN_ATCHMNFL_NO),
        //     END_DT: END_DT,
        //     EXPOSCD: 'DALY_REPEAT',
        //     FIX_AT: 'N',
        //     MISN_CD: 'FT_INFO',
        //     MISN_COMPT_REWARD_POINT: String(MISN_COMPT_REWARD_POINT),
        //     MISN_DC: MISN_SUBNAME1.first,
        //     MISN_NAME: '건강 매거진 평가',
        //     MISN_SUBNAME1: MISN_SUBNAME1.first + '\n' + MISN_SUBNAME1.second,
        //     MISN_SUBNAME2: MISN_SUBNAME2.first + '\n' + MISN_SUBNAME2.second,
        //     USE_AT: USE_AT,
        // })

        if (status) {
            // 리스트로 가기전에 상태 변경.
            setLoungeListState(prevState => ({
                ...prevState,
                status: 'idle',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/contents/lounge-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    // 수정 처리.
    const handleModify = async () => {
        if (params.postId) {
            // const { status } = await postLoungeDetailUpdate({
            //     MISN_STEP: Number(params.misn_step),
            //     BEGIN_DT: detailState.info.BEGIN_DT,
            //     END_DT: detailState.info.END_DT,
            //     MISN_COMPT_REWARD_POINT: String(
            //         detailState.info.MISN_COMPT_REWARD_POINT
            //     ),
            //     MISN_DC: detailState.info.MISN_SUBNAME1.first,
            //     MISN_SUBNAME1:
            //         detailState.info.MISN_SUBNAME1.first +
            //         '\n' +
            //         detailState.info.MISN_SUBNAME1.second,
            //     MISN_SUBNAME2:
            //         detailState.info.MISN_SUBNAME2.first +
            //         '\n' +
            //         detailState.info.MISN_SUBNAME2.second,
            //     USE_AT: detailState.info.USE_AT,
            // })

            if (status) {
                // 리스트로 가기전에 상태 변경.
                setLoungeListState(prevState => ({
                    ...prevState,
                    status: 'idle',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })

                navigate({
                    pathname:
                        process.env.PUBLIC_URL + `/manage/contents/lounge-list`,
                })
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }

    // 댓글등록처리
    const handleComment = async () => {
        const {
            postInfo: { postId },
            comment: { content, authorNo },
        } = detailState.detail

        const { status } = await postLoungeComment({
            postId: `${postId}`,
            authorMemberNo: Number(authorNo),
            content: content,
        })

        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            const { status: comment_status, payload } =
                await getLoungeDetailComments({
                    post_id: `${postId}`,
                })

            if (comment_status) {
                const { totalElements, content } = payload.responseData
                setDetailState(prevState => ({
                    ...prevState,
                    detail: {
                        ...prevState.detail,
                        postInfo: {
                            ...prevState.detail.postInfo,
                            commentCount: totalElements,
                        },
                        commentList: content,
                        comment: {
                            content: '',
                            authorNo: '',
                        },
                    },
                }))
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    // AI댓글 생성
    const handleCommentAiGen = async () => {
        const {
            postInfo: { postId },
            comment: { authorNo },
        } = detailState.detail

        const { status, payload } = await getLoungeCommentAiGen({
            postId: `${postId}`,
            authorMemberNo: `${authorNo}`,
        })

        if (status) {
            const { content: aiComment } = payload.responseData

            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            setDetailState(prevState => ({
                ...prevState,
                detail: {
                    ...prevState.detail,
                    comment: {
                        ...prevState.detail.comment,
                        content: aiComment,
                    },
                },
            }))
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    // 댓글 등록
    const handleClickCommentButton = () => {
        const { content, authorNo } = detailState.detail.comment

        if (_.isEmpty(content)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.lounge.empty.comment,
            })
            return
        }

        if (_.isEmpty(authorNo)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.lounge.empty.author,
            })
            return
        }

        handleComment().then()
    }

    // AI 댓글 생성
    const handleClickCommentAiGenButton = () => {
        const { authorNo } = detailState.detail.comment

        if (_.isEmpty(authorNo)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.lounge.empty.author,
            })
            return
        }

        handleCommentAiGen().then()
    }

    // 저장 버튼 벨리데이션.
    const handleClickApplyButton = () => {
        const { postId, postTitle, postContent } = detailState.detail.postInfo

        if (_.isEmpty(postTitle)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.lounge.empty.title,
            })
            return
        }

        if (_.isEmpty(postContent)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.lounge.empty.content,
            })
            return
        }

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                confirm: true,
            },
        }))
    }

    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`제목`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.title
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    postTitle: e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={'제목을 입력하세요'}
                                        Value={
                                            detailState.detail.postInfo
                                                .postTitle
                                                ? detailState.detail.postInfo
                                                      .postTitle
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {
                                        detailState.detail.postInfo.postTitle
                                            ?.length
                                    }
                                    /{textMaxLength.title})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`내용`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.content
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    postContent: e.target.value,
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={'내용을 입력하세요.'}
                                        Value={
                                            detailState.detail.postInfo
                                                .postContent
                                                ? detailState.detail.postInfo
                                                      .postContent
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {
                                        detailState.detail.postInfo.postContent
                                            ?.length
                                    }
                                    /{textMaxLength.content})
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>

            <ButtonBox>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`돌아가기`}
                        HandleClick={() => {
                            handleDeleteTabbyMatchRouter(
                                '/manage/contents/lounge/new'
                            )
                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/contents/lounge-list`,
                            })
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`저장`}
                        HandleClick={() => handleClickApplyButton()}
                    />
                </ButtonItem>
            </ButtonBox>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`댓글쓰기`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e => {
                                            if (
                                                e.target.value.length >
                                                textMaxLength.content
                                            ) {
                                                return
                                            }
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    comment: {
                                                        ...prevState.detail
                                                            .comment,
                                                        content: e.target.value,
                                                    },
                                                },
                                            }))
                                        }}
                                        id={'id'}
                                        Placeholder={'댓글을 입력하세요'}
                                        Value={
                                            detailState.detail.comment.content
                                                ? detailState.detail.comment
                                                      .content
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="flex items-end text-xs h-8 pl-1">
                                    (
                                    {detailState.detail.comment.content?.length}
                                    /{textMaxLength.content})
                                </div>
                                <SearchItemWapper>
                                    <SearchLabel>
                                        <VaryLabel LabelName={`작성자`} />
                                    </SearchLabel>
                                    <SearchItem>
                                        <VarySelectBox
                                            Width={`w60`}
                                            ContentsType={`search`}
                                            PlaceholderDisable={false}
                                            Placeholder={`작성자를 선택해주세요.`}
                                            Value={`${detailState.detail.comment.authorNo}`}
                                            Elements={detailState.detail.aiAuthors.map(
                                                author => {
                                                    return {
                                                        value: author.memberNo,
                                                        text: author.memberNickname,
                                                    }
                                                }
                                            )}
                                            HandleOnChange={e => {
                                                if (
                                                    !_.isEmpty(
                                                        detailState.detail
                                                            .comment.authorNo
                                                    )
                                                ) {
                                                    detailState.detail.comment.content =
                                                        ''
                                                }

                                                setDetailState(prevState => ({
                                                    ...prevState,
                                                    detail: {
                                                        ...prevState.detail,
                                                        comment: {
                                                            ...prevState.detail
                                                                .comment,
                                                            authorNo: e.value,
                                                        },
                                                    },
                                                }))
                                            }}
                                        />
                                    </SearchItem>
                                </SearchItemWapper>
                                <VaryButton
                                    ButtonType={`default`}
                                    BgColor={`steel`}
                                    ButtonName={`댓글등록`}
                                    HandleClick={() =>
                                        handleClickCommentButton()
                                    }
                                />
                                <VaryButton
                                    ButtonType={`default`}
                                    BgColor={`steel`}
                                    ButtonName={`AI댓글생성`}
                                    HandleClick={() =>
                                        handleClickCommentAiGenButton()
                                    }
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCellFull colSpan={2}>
                            <div className="w-full h-12 flex justify-center items-center">
                                댓글 목록
                            </div>
                        </LabelCellFull>
                    </Row>
                    {detailState.detail.postInfo.commentCount &&
                        detailState.detail.commentList.map(
                            (comment: {
                                content: string
                                authorNickname: string
                                profileImageUrl: string
                            }) => {
                                return (
                                    <Row>
                                        <LabelCellFull colSpan={2}>
                                            <div className="w-full flex items-center gap-4 h-12">
                                                <VaryProfile
                                                    ProfileName={
                                                        comment.authorNickname
                                                    }
                                                    ProfileUrl={
                                                        comment.profileImageUrl
                                                    }
                                                />
                                                {comment.content}
                                            </div>
                                        </LabelCellFull>
                                    </Row>
                                )
                            }
                        )}
                </TableWapper>
            </TableContainer>

            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.contents.lounge.update}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                        if (pageMode === 'modify') {
                            handleModify().then()
                        } else {
                            handleSave().then()
                        }
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default LoungeDetailTable
