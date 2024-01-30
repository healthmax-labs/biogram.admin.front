import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/HelperPageStyle'
import {
    ConfirmModal,
    ElementLoading,
    VaryButton,
    VaryImageUpload,
    VaryInput,
    VaryLabel,
    VaryTextArea,
} from '@Element/index'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { QnaDetailState } from '@Recoil/HelperPageState'
import Messages from '@Messages'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const { DetailContainer } = DetailPageStyle

const initializeState = {
    modal: {
        confirm: false,
        deleteConfirm: false,
        answerConfirm: false,
        answerDeleteConfirm: false,
    },
}

const QnaDetailTable = ({
    pageMode,
    HandleDetailSave,
    HandleDetailUpdate,
    HandleDetailDelete,
    HandleResetAfterList,
    HandleDetailAnswerSave,
    HandleDetailAnswerUpdate,
    HandleDetailAnswerDelete,
}: {
    pageMode: `new` | `modify` | `view` | `answer_modify` | `answer_new`
    HandleDetailSave: () => void
    HandleDetailUpdate: () => void
    HandleDetailDelete: () => void
    HandleResetAfterList: () => void
    HandleDetailAnswerSave: () => void
    HandleDetailAnswerUpdate: () => void
    HandleDetailAnswerDelete: () => void
}) => {
    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
            deleteConfirm: boolean
            answerConfirm: boolean
            answerDeleteConfirm: boolean
        }
    }>(initializeState)
    const [qnaDetailState, setQnaDetailState] = useRecoilState(QnaDetailState)

    return (
        <DetailContainer>
            {qnaDetailState.status === `loading` ? (
                <div className="h-[calc(100vh-30rem)]">
                    <ElementLoading FullScreen={false} />
                </div>
            ) : (
                <>
                    <TableContainer>
                        <TableWapper>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`제목`} />
                                </LabelCell>
                                <InputCell WFull={true}>
                                    <div className="flex flex-nowrap w-full items-center">
                                        <div className="w-full">
                                            <VaryInput
                                                InputType={'text'}
                                                ReadOnly={
                                                    !(
                                                        pageMode === `new` ||
                                                        pageMode === `modify`
                                                    )
                                                }
                                                HandleOnChange={e =>
                                                    setQnaDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                TITLE: e.target
                                                                    .value,
                                                            },
                                                        })
                                                    )
                                                }
                                                id={'id'}
                                                Placeholder={
                                                    '제목을 입력해 주세요'
                                                }
                                                Value={
                                                    qnaDetailState.detail.TITLE
                                                }
                                            />
                                        </div>
                                    </div>
                                </InputCell>
                            </Row>
                            {pageMode !== `new` && (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`등록일자`} />
                                    </LabelCell>
                                    <InputCell WFull={true}>
                                        <div className="flex flex-nowrap w-full items-center">
                                            <div className="w-full">
                                                <VaryInput
                                                    InputType={'text'}
                                                    id={'id'}
                                                    ReadOnly={true}
                                                    Placeholder={'등록일자'}
                                                    Value={
                                                        qnaDetailState.detail
                                                            .REGIST_DT
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </InputCell>
                                </Row>
                            )}
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`내용`} />
                                </LabelCell>
                                <InputCell WFull={true}>
                                    <div className="flex flex-nowrap w-full items-center">
                                        <div className="w-full">
                                            <VaryTextArea
                                                Rows={20}
                                                ReadOnly={
                                                    !(
                                                        pageMode === `new` ||
                                                        pageMode === `modify`
                                                    )
                                                }
                                                HandleOnChange={e =>
                                                    setQnaDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                CONTENT:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    )
                                                }
                                                Placeholder={'질문 내용 등록'}
                                                Value={
                                                    qnaDetailState.detail
                                                        .CONTENT
                                                }
                                            />
                                        </div>
                                    </div>
                                </InputCell>
                            </Row>
                            <Row>
                                <LabelCell>
                                    <VaryLabel LabelName={`파일`} />
                                </LabelCell>
                                <InputCell WFull={true}>
                                    <div className="flex flex-nowrap w-full items-center">
                                        <div className="w-full">
                                            <VaryImageUpload
                                                Image={{
                                                    AtchmnflPath:
                                                        qnaDetailState.detail
                                                            .ATCHMNFL_INFO &&
                                                        qnaDetailState.detail
                                                            .ATCHMNFL_INFO
                                                            .ATCHMNFL_PATH
                                                            ? qnaDetailState
                                                                  .detail
                                                                  .ATCHMNFL_INFO
                                                                  .ATCHMNFL_PATH
                                                            : ``,
                                                    OrginlFileNm:
                                                        qnaDetailState.detail
                                                            .ATCHMNFL_INFO &&
                                                        qnaDetailState.detail
                                                            .ATCHMNFL_INFO
                                                            .ORIGINL_FILE_NM
                                                            ? qnaDetailState
                                                                  .detail
                                                                  .ATCHMNFL_INFO
                                                                  .ORIGINL_FILE_NM
                                                            : ``,
                                                    Category: 'ETC',
                                                }}
                                                ShowInform={false}
                                                ShowFileName={true}
                                                Disabled={
                                                    !(
                                                        pageMode === `new` ||
                                                        pageMode === `modify`
                                                    )
                                                }
                                                HideInput={
                                                    !(
                                                        pageMode === `new` ||
                                                        pageMode === `modify`
                                                    )
                                                }
                                                HandleDelete={() =>
                                                    setQnaDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                ATCHMNFL_INFO: {
                                                                    ATCHMNFL_NO: 0,
                                                                    ATCHMNFL_DOWN_PATH: ``,
                                                                    ATCHMNFL_NM: ``,
                                                                    ATCHMNFL_PATH: ``,
                                                                    ORIGINL_FILE_NM: ``,
                                                                },
                                                            },
                                                        })
                                                    )
                                                }
                                                ReturnCallback={e =>
                                                    setQnaDetailState(
                                                        prevState => ({
                                                            ...prevState,
                                                            detail: {
                                                                ...prevState.detail,
                                                                ATCHMNFL_INFO: {
                                                                    ATCHMNFL_NO:
                                                                        Number(
                                                                            e.ATCHMNFL_NO
                                                                        ),
                                                                    ATCHMNFL_DOWN_PATH: ``,
                                                                    ATCHMNFL_NM: ``,
                                                                    ATCHMNFL_PATH: ``,
                                                                    ORIGINL_FILE_NM: ``,
                                                                },
                                                            },
                                                        })
                                                    )
                                                }
                                                ShowDeleteButton={
                                                    pageMode === `new` ||
                                                    pageMode === `modify`
                                                }
                                                ShowPrevBox={false}
                                            />
                                        </div>
                                    </div>
                                </InputCell>
                            </Row>
                            {/* 답변 start */}
                            {(pageMode === `view` ||
                                pageMode === 'answer_new' ||
                                pageMode === `answer_modify`) && (
                                <>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`내용`} />
                                        </LabelCell>
                                        <InputCell WFull={true}>
                                            <div className="flex flex-nowrap w-full items-center">
                                                <div className="w-full">
                                                    <VaryTextArea
                                                        Rows={13}
                                                        ReadOnly={
                                                            pageMode === `view`
                                                        }
                                                        HandleOnChange={e =>
                                                            setQnaDetailState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    detail: {
                                                                        ...prevState.detail,
                                                                        COMMENT:
                                                                            {
                                                                                ...prevState
                                                                                    .detail
                                                                                    .COMMENT,
                                                                                CONTENT:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            },
                                                                    },
                                                                })
                                                            )
                                                        }
                                                        Placeholder={
                                                            '답변 내용 등록'
                                                        }
                                                        Value={
                                                            qnaDetailState
                                                                .detail.COMMENT
                                                                ? qnaDetailState
                                                                      .detail
                                                                      .COMMENT
                                                                      .CONTENT
                                                                : ``
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </InputCell>
                                    </Row>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`파일`} />
                                        </LabelCell>
                                        <InputCell WFull={true}>
                                            <div className="flex flex-nowrap w-full items-center">
                                                <div className="w-full">
                                                    <VaryImageUpload
                                                        Image={{
                                                            AtchmnflPath:
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT &&
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT
                                                                    .ATCHMNFL_INFO &&
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT
                                                                    .ATCHMNFL_INFO
                                                                    .ATCHMNFL_PATH
                                                                    ? qnaDetailState
                                                                          .detail
                                                                          .COMMENT
                                                                          .ATCHMNFL_INFO
                                                                          .ATCHMNFL_PATH
                                                                    : ``,
                                                            OrginlFileNm:
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT &&
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT
                                                                    .ATCHMNFL_INFO &&
                                                                qnaDetailState
                                                                    .detail
                                                                    .COMMENT
                                                                    .ATCHMNFL_INFO
                                                                    .ORIGINL_FILE_NM
                                                                    ? qnaDetailState
                                                                          .detail
                                                                          .COMMENT
                                                                          .ATCHMNFL_INFO
                                                                          .ORIGINL_FILE_NM
                                                                    : ``,
                                                            Category: 'ETC',
                                                        }}
                                                        ShowInform={false}
                                                        HandleDelete={() =>
                                                            setQnaDetailState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    detail: {
                                                                        ...prevState.detail,
                                                                        COMMENT:
                                                                            {
                                                                                ...prevState
                                                                                    .detail
                                                                                    .COMMENT,
                                                                                ATCHMNFL_INFO:
                                                                                    {
                                                                                        ATCHMNFL_NO: 0,
                                                                                        ATCHMNFL_DOWN_PATH: ``,
                                                                                        ATCHMNFL_NM: ``,
                                                                                        ATCHMNFL_PATH: ``,
                                                                                        ORIGINL_FILE_NM: ``,
                                                                                    },
                                                                            },
                                                                    },
                                                                })
                                                            )
                                                        }
                                                        ReturnCallback={e =>
                                                            setQnaDetailState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    detail: {
                                                                        ...prevState.detail,
                                                                        COMMENT:
                                                                            {
                                                                                ...prevState
                                                                                    .detail
                                                                                    .COMMENT,
                                                                                ATCHMNFL_INFO:
                                                                                    {
                                                                                        ATCHMNFL_NO:
                                                                                            Number(
                                                                                                e.ATCHMNFL_NO
                                                                                            ),
                                                                                        ATCHMNFL_DOWN_PATH: ``,
                                                                                        ATCHMNFL_NM: ``,
                                                                                        ATCHMNFL_PATH: ``,
                                                                                        ORIGINL_FILE_NM: ``,
                                                                                    },
                                                                            },
                                                                    },
                                                                })
                                                            )
                                                        }
                                                        ShowDeleteButton={
                                                            pageMode ===
                                                                'answer_new' ||
                                                            pageMode ===
                                                                `answer_modify`
                                                        }
                                                        ShowPrevBox={false}
                                                        ShowFileName={true}
                                                        Disabled={
                                                            !(
                                                                pageMode ===
                                                                    'answer_new' ||
                                                                pageMode ===
                                                                    `answer_modify`
                                                            )
                                                        }
                                                        HideInput={
                                                            !(
                                                                pageMode ===
                                                                    'answer_new' ||
                                                                pageMode ===
                                                                    `answer_modify`
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </InputCell>
                                    </Row>
                                </>
                            )}
                            {/* 답변 end  */}
                        </TableWapper>
                    </TableContainer>
                    {(pageMode === `new` || pageMode === `modify`) && (
                        <ButtonBox>
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`삭제`}
                                    HandleClick={() =>
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                deleteConfirm: true,
                                            },
                                        }))
                                    }
                                />
                            </ButtonItem>
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`등록`}
                                    HandleClick={() =>
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                confirm: true,
                                            },
                                        }))
                                    }
                                />
                            </ButtonItem>
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`취소`}
                                    HandleClick={() => {
                                        HandleResetAfterList()
                                    }}
                                />
                            </ButtonItem>
                        </ButtonBox>
                    )}
                    {(pageMode === `answer_new` ||
                        pageMode === `answer_modify`) && (
                        <ButtonBox>
                            {pageMode === `answer_modify` && (
                                <ButtonItem>
                                    <VaryButton
                                        ButtonType={`default`}
                                        ButtonName={`답변삭제`}
                                        HandleClick={() =>
                                            setPageState(prevState => ({
                                                ...prevState,
                                                modal: {
                                                    ...prevState.modal,
                                                    answerDeleteConfirm: true,
                                                },
                                            }))
                                        }
                                    />
                                </ButtonItem>
                            )}
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`등록`}
                                    HandleClick={() =>
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                answerConfirm: true,
                                            },
                                        }))
                                    }
                                />
                            </ButtonItem>
                            <ButtonItem>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`취소`}
                                    HandleClick={() => {
                                        HandleResetAfterList()
                                    }}
                                />
                            </ButtonItem>
                        </ButtonBox>
                    )}
                    {pageState.modal.confirm && (
                        <ConfirmModal
                            Title={Messages.Default.saveConfirm}
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
                                if (pageMode === `modify`) {
                                    HandleDetailUpdate()
                                } else {
                                    HandleDetailSave()
                                }
                            }}
                        />
                    )}
                    {pageState.modal.deleteConfirm && (
                        <ConfirmModal
                            Title={Messages.Default.deleteConfirm}
                            CancleButtonName={`취소`}
                            ApplyButtonName={`확인`}
                            CancleButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        deleteConfirm: false,
                                    },
                                }))
                            }}
                            ApplyButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        deleteConfirm: false,
                                    },
                                }))

                                HandleDetailDelete()
                            }}
                        />
                    )}
                    {pageState.modal.answerConfirm && (
                        <ConfirmModal
                            Title={Messages.Default.saveConfirm}
                            CancleButtonName={`취소`}
                            ApplyButtonName={`확인`}
                            CancleButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        answerConfirm: false,
                                    },
                                }))
                            }}
                            ApplyButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        answerConfirm: false,
                                    },
                                }))
                                if (pageMode === `answer_modify`) {
                                    HandleDetailAnswerUpdate()
                                } else {
                                    HandleDetailAnswerSave()
                                }
                            }}
                        />
                    )}
                    {pageState.modal.answerDeleteConfirm && (
                        <ConfirmModal
                            Title={Messages.Default.deleteConfirm}
                            CancleButtonName={`취소`}
                            ApplyButtonName={`확인`}
                            CancleButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        answerDeleteConfirm: false,
                                    },
                                }))
                            }}
                            ApplyButtonClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        answerDeleteConfirm: false,
                                    },
                                }))

                                HandleDetailAnswerDelete()
                            }}
                        />
                    )}
                </>
            )}
        </DetailContainer>
    )
}

export default QnaDetailTable
