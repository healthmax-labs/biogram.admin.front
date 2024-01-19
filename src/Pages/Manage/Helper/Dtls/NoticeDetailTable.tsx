import { useRecoilState } from 'recoil'
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
} from '@Element/index'
import React from 'react'

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

const NoticeDetailTable = ({
    pageMode,
    HandleDetailSave,
    HandleDetailUpdate,
    HandleDetailDelete,
    HandleResetAfterList,
}: {
    pageMode: `new` | `modify`
    HandleDetailSave: () => void
    HandleDetailUpdate: () => void
    HandleDetailDelete: () => void
    HandleResetAfterList: () => void
}) => {
    const [noticeDetailState, setNoticeDetailState] =
        useRecoilState(NoticeDetailState)
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
                                            HandleOnChange={e =>
                                                console.debug(e)
                                            }
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
                                        Value={noticeDetailState.detail.CONTENT}
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
                                                noticeDetailState.detail
                                                    .ATCHMNFL_INFO
                                                    .ATCHMNFL_DOWN_PATH,
                                            OrginlFileNm:
                                                noticeDetailState.detail
                                                    .ATCHMNFL_INFO
                                                    .ORIGINL_FILE_NM,
                                            Category: 'ETC',
                                        }}
                                        ShowInform={false}
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
                                            noticeDetailState.detail.USE_YN ===
                                            `Y`
                                        }
                                        HandleOnChange={() =>
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    USE_YN: `Y`,
                                                },
                                            }))
                                        }
                                    />
                                    <VaryLabelCheckBox
                                        LabelName={`미사용`}
                                        Checked={
                                            noticeDetailState.detail.USE_YN ===
                                            `N`
                                        }
                                        HandleOnChange={() =>
                                            setNoticeDetailState(prevState => ({
                                                ...prevState,
                                                detail: {
                                                    ...prevState.detail,
                                                    USE_YN: `N`,
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                </TableWapper>
            </TableContainer>
            <ButtonBox>
                {pageMode === `modify` && (
                    <ButtonItem>
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`삭제`}
                            HandleClick={() => HandleDetailDelete()}
                        />
                    </ButtonItem>
                )}
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`등록`}
                        HandleClick={() =>
                            pageMode === `modify`
                                ? HandleDetailUpdate()
                                : HandleDetailSave()
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
        </DetailContainer>
    )
}

export default NoticeDetailTable
