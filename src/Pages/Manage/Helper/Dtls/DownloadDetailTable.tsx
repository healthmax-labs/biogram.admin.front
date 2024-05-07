import { useRecoilState } from 'recoil'
import { DownloadlistDetailState } from '@Recoil/HelperPageState'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/HelperPageStyle'
import {
    VaryButton,
    VaryInput,
    VaryLabel,
    VaryTextArea,
    VaryImageUpload,
    ConfirmModal,
} from '@Element/index'
import React, { useState } from 'react'
import Messages from '@Messages'

const { DetailContainer } = DetailPageStyle
const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
} = DetailTableStyle

const initializeState = {
    modal: {
        confirm: false,
        deleteConfirm: false,
    },
}

const DownloadDetailTable = ({
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
    }>(initializeState)

    const [detailState, setDetailState] = useRecoilState(
        DownloadlistDetailState
    )
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
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    TITLE: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        ReadOnly={authority === `view`}
                                        Placeholder={'제목을 입력해 주세요'}
                                        Value={detailState.detail.TITLE}
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
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
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    CONTENT: e.target.value,
                                                },
                                            }))
                                        }
                                        Placeholder={'내용을 입력해 주세요'}
                                        ReadOnly={authority === `view`}
                                        Value={detailState.detail.CONTENT}
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
                                            AtchmnflPath: detailState.detail
                                                .ATCHMNFL_INFO
                                                ? detailState.detail
                                                      .ATCHMNFL_INFO
                                                      .ATCHMNFL_PATH
                                                : ``,
                                            OrginlFileNm: detailState.detail
                                                .ATCHMNFL_INFO
                                                ? detailState.detail
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
                                            setDetailState(prevState => ({
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
                                            setDetailState(prevState => ({
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

export default DownloadDetailTable
