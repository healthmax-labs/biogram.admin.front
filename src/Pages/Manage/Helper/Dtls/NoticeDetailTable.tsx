import { useRecoilState, useRecoilValue } from 'recoil'
import { NoticeDetailState } from '@Recoil/HelperPageState'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/HelperPageStyle'
import {
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryTextArea,
    VaryImageUpload,
    ConfirmModal,
} from '@Element/index'
import React, { useEffect, useState } from 'react'
import Messages from '@Messages'
import { AtomRootState } from '@Recoil/AppRootState'
import _ from 'lodash'

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
    },
    notice: {
        atchmnflImage: false,
        atchmnflImageUrl: ``,
    },
}

const NoticeDetailTable = ({
    pageMode,
    authority,
    HandleDetailSave,
    HandleDetailUpdate,
    HandleDetailDelete,
    HandleResetAfterList,
}: {
    pageMode: `new` | `modify`
    authority: string | `view` | `modify`
    HandleDetailSave: () => void
    HandleDetailUpdate: () => void
    HandleDetailDelete: () => void
    HandleResetAfterList: () => void
}) => {
    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
            deleteConfirm: boolean
        }
        notice: {
            atchmnflImage: boolean
            atchmnflImageUrl: string
        }
    }>(initializeState)

    const rootState = useRecoilValue(AtomRootState)

    const [noticeDetailState, setNoticeDetailState] =
        useRecoilState(NoticeDetailState)

    useEffect(() => {
        const {
            detail: { ATCHMNFL_INFO },
        } = noticeDetailState

        if (
            !_.isEmpty(ATCHMNFL_INFO) &&
            !_.isEmpty(ATCHMNFL_INFO?.ATCHMNFL_NM)
        ) {
            const { ORIGINL_FILE_NM, ATCHMNFL_PATH } = ATCHMNFL_INFO
            if (ORIGINL_FILE_NM.match(/\.(jpg|jpeg|png|gif)$/i)) {
                setPageState(prevState => ({
                    ...prevState,
                    notice: {
                        atchmnflImage: true,
                        atchmnflImageUrl: `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${ATCHMNFL_PATH}`,
                    },
                }))
            }
        }
    }, [noticeDetailState])

    return (
        <DetailContainer>
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
                                        HandleOnChange={e =>
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    TITLE: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        ReadOnly={authority === `view`}
                                        Placeholder={
                                            '공지사항 제목을 입력해 주세요'
                                        }
                                        Value={noticeDetailState.detail.TITLE}
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    {pageMode === `modify` && (
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
                                                noticeDetailState.detail
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
                                        Rows={26}
                                        HandleOnChange={e =>
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    CONTENT: e.target.value,
                                                },
                                            }))
                                        }
                                        Placeholder={
                                            '게시물 제목을 입력해 주세요'
                                        }
                                        ReadOnly={authority === `view`}
                                        Value={noticeDetailState.detail.CONTENT}
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    {pageState.notice.atchmnflImage && (
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`이미지`} />
                            </LabelCell>
                            <InputCell WFull={true}>
                                <div className="flex flex-nowrap w-full items-center justify-center">
                                    <div className="flex w-full items-center justify-center">
                                        <img
                                            className="max-w-xl"
                                            src={
                                                pageState.notice
                                                    .atchmnflImageUrl
                                            }
                                            alt={'...'}
                                        />
                                    </div>
                                </div>
                            </InputCell>
                        </Row>
                    )}
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`파일`} />
                        </LabelCell>
                        <InputCell WFull={true}>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-full">
                                    <VaryImageUpload
                                        Image={{
                                            AtchmnflPath: noticeDetailState
                                                .detail.ATCHMNFL_INFO
                                                ? noticeDetailState.detail
                                                      .ATCHMNFL_INFO
                                                      .ATCHMNFL_PATH
                                                : ``,
                                            OrginlFileNm: noticeDetailState
                                                .detail.ATCHMNFL_INFO
                                                ? noticeDetailState.detail
                                                      .ATCHMNFL_INFO
                                                      .ORIGINL_FILE_NM
                                                : ``,
                                            Category: 'ETC',
                                        }}
                                        NeedDownload={true}
                                        ShowInform={false}
                                        ShowFileName={true}
                                        Disabled={authority === `view`}
                                        HandleDelete={() => {
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    ATCHMNFL_INFO: {
                                                        ATCHMNFL_NO: ``,
                                                        ATCHMNFL_DOWN_PATH: ``,
                                                        ATCHMNFL_NM: ``,
                                                        ATCHMNFL_PATH: ``,
                                                        ORIGINL_FILE_NM: ``,
                                                    },
                                                },
                                            }))
                                        }}
                                        ReturnCallback={e => {
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    ATCHMNFL_INFO: {
                                                        ATCHMNFL_NO: `${e.ATCHMNFL_NO}`,
                                                        ATCHMNFL_DOWN_PATH: ``,
                                                        ATCHMNFL_NM: ``,
                                                        ATCHMNFL_PATH: ``,
                                                        ORIGINL_FILE_NM: ``,
                                                    },
                                                },
                                            }))
                                        }}
                                        ShowDeleteButton={false}
                                        ShowPrevBox={false}
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    {(() => {
                        const {
                            userinfo: { AUTH_CODE, INST_NO },
                        } = rootState

                        if (AUTH_CODE === 'SM00' || INST_NO === '1000') {
                            return (
                                <Row>
                                    <LabelCell>
                                        <VaryLabel
                                            LabelName={`팝업으로 표시`}
                                        />
                                    </LabelCell>
                                    <InputCell WFull={true}>
                                        <div className="flex flex-nowrap w-full items-center">
                                            <div className="flex flex-nowrap justify-start gap-2">
                                                <VaryLabelCheckBox
                                                    LabelName={`사용`}
                                                    Checked={
                                                        noticeDetailState.detail
                                                            .POPUP_YN === `Y`
                                                    }
                                                    HandleOnChange={() =>
                                                        setNoticeDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    POPUP_YN: `Y`,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                                <VaryLabelCheckBox
                                                    LabelName={`미사용`}
                                                    Checked={
                                                        noticeDetailState.detail
                                                            .POPUP_YN === `N`
                                                    }
                                                    HandleOnChange={() =>
                                                        setNoticeDetailState(
                                                            prevState => ({
                                                                ...prevState,
                                                                detail: {
                                                                    ...prevState.detail,
                                                                    POPUP_YN: `N`,
                                                                },
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </InputCell>
                                </Row>
                            )
                        }
                        return <></>
                    })()}
                    {authority === `modify` && (
                        <Row>
                            <LabelCell>
                                <VaryLabel LabelName={`사용 여부`} />
                            </LabelCell>
                            <InputCell WFull={true}>
                                <div className="flex flex-nowrap w-full items-center">
                                    <div className="flex flex-nowrap justify-start gap-2">
                                        <VaryLabelCheckBox
                                            LabelName={`사용`}
                                            Checked={
                                                noticeDetailState.detail
                                                    .USE_YN === `Y`
                                            }
                                            HandleOnChange={() =>
                                                setNoticeDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        detail: {
                                                            ...prevState.detail,
                                                            USE_YN: `Y`,
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                        <VaryLabelCheckBox
                                            LabelName={`미사용`}
                                            Checked={
                                                noticeDetailState.detail
                                                    .USE_YN === `N`
                                            }
                                            HandleOnChange={() =>
                                                setNoticeDetailState(
                                                    prevState => ({
                                                        ...prevState,
                                                        detail: {
                                                            ...prevState.detail,
                                                            USE_YN: `N`,
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </InputCell>
                        </Row>
                    )}
                </TableWapper>
            </TableContainer>
            <ButtonBox>
                {authority === `modify` && (
                    <>
                        {pageMode === `modify` && (
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
                                            confirm: true,
                                        },
                                    }))
                                }
                            />
                        </ButtonItem>
                    </>
                )}
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
        </DetailContainer>
    )
}

export default NoticeDetailTable
