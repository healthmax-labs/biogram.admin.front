import React, { useCallback, useEffect } from 'react'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import { DetailPageStyle } from '@Style/Pages/ManagerPageStyle'
import Codes from '@Codes'

import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import {
    ConfirmModal,
    ReactQuillEditor,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
    VarySelectBox,
} from '@Elements'
import {
    getNoticeDetail,
    postNoticeDetailInsert,
    postNoticeDetailUpdate,
} from '@Service/NoticeService'
import { useMainLayouts } from '@Hooks'
import Messages from '@Messages'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { NoticeDetailState } from '@Recoil/ManagerPagesState'
import { NoticeItemInterface } from '@Type/MangerTypes'

const {
    TableContainer,
    TableWapper,
    Row,
    LabelCell,
    InputCell,
    ButtonBox,
    ButtonItem,
    QuilEditorLabelCell,
    QuilEditorCell,
} = DetailTableStyle

const { DetailContainer } = DetailPageStyle

const NoticeDetailTable = ({ pageMode }: { pageMode: `new` | `modify` }) => {
    const params = useParams<{ NOTICE_NO: string | undefined }>()
    const { handlMainAlert } = useMainLayouts()
    const navigate = useNavigate()
    const [detailState, setDetailState] = useRecoilState(NoticeDetailState)
    const handleGetInfo = useCallback(
        async (NOTICE_NO: string) => {
            setDetailState(prevState => ({
                ...prevState,
                status: 'loading',
            }))
            const { status, payload } = await getNoticeDetail({
                NOTICE_NO: NOTICE_NO,
            })

            if (status) {
                const {
                    NOTICE_NO,
                    NOTICE_SJ,
                    REGIST_DT,
                    REGIST_ID,
                    NOTICE_CN,
                    PUSH_AT,
                    TRGET_SVC_CODE,
                    TRGET_SVC_CODE_NM,
                    USE_AT,
                } = payload

                setDetailState(prevState => ({
                    ...prevState,
                    status: 'success',
                    info: {
                        ...prevState.info,
                        NOTICE_NO: NOTICE_NO,
                        NOTICE_SJ: NOTICE_SJ,
                        REGIST_DT: REGIST_DT,
                        REGIST_ID: REGIST_ID,
                        NOTICE_CN: NOTICE_CN,
                        PUSH_AT: PUSH_AT,
                        TRGET_SVC_CODE: TRGET_SVC_CODE,
                        TRGET_SVC_CODE_NM: TRGET_SVC_CODE_NM,
                        USE_AT: USE_AT,
                    },
                }))
            } else {
                setDetailState(prevState => ({
                    ...prevState,
                    status: 'failure',
                }))
                handlMainAlert({
                    state: true,
                    message: Messages.Default.pageError,
                })
            }
        },
        [handlMainAlert, setDetailState]
    )

    const handleNotice = async () => {
        const {
            NOTICE_NO,
            NOTICE_SJ,
            NOTI_DT,
            REGIST_DT,
            REGIST_ID,
            NOTICE_CN,
            PUSH_AT,
            TRGET_SVC_CODE,
            TRGET_SVC_CODE_NM,
            USE_AT,
        } = detailState.info

        let payload: NoticeItemInterface = {
            NOTICE_NO: NOTICE_NO ? NOTICE_NO : '',
            NOTICE_SJ: NOTICE_SJ ? NOTICE_SJ : '',
            REGIST_DT: REGIST_DT ? REGIST_DT : '',
            REGIST_ID: REGIST_ID ? REGIST_ID : '',
            NOTI_DT: NOTI_DT ? NOTI_DT : '',
            NOTICE_CN: NOTICE_CN ? NOTICE_CN : '',
            PUSH_AT: PUSH_AT ? PUSH_AT : '',
            TRGET_SVC_CODE: TRGET_SVC_CODE ? TRGET_SVC_CODE : '',
            TRGET_SVC_CODE_NM: TRGET_SVC_CODE_NM ? TRGET_SVC_CODE_NM : '',
            USE_AT: USE_AT ? USE_AT : 'N',
        }

        // 등록
        if (pageMode === 'new') {
            payload.NOTI_DT = NOTI_DT
            payload.REGIST_ID = null
            payload.TRGET_SVC_CODE = TRGET_SVC_CODE
        }
        // else if (pageMode === 'modify') {
        //     console.log('modi!!')
        // }

        let serviceStatus: boolean

        if (pageMode === 'modify' && params.NOTICE_NO) {
            payload = {
                ...payload,
            }

            const { status } = await postNoticeDetailUpdate(payload)
            serviceStatus = status
        } else {
            const { status } = await postNoticeDetailInsert(payload)
            serviceStatus = status
        }

        if (serviceStatus) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })

            navigate({
                pathname:
                    process.env.PUBLIC_URL + `/manage/manager/notice-list`,
            })
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.pageError,
            })
        }
    }

    const handleClickApplyButton = () => {
        //제목이 입력되지 않음
        if (!detailState.info.NOTICE_SJ) {
            handlMainAlert({
                state: true,
                message: Messages.Default.contents.magazine.error.nameEmpty,
            })
            return
        }
        //서브제목이 입력되지 않음
        // if (!detailState.info.MISN_SUBNAME2_u) {
        //     handlMainAlert({
        //         state: true,
        //         message: Messages.Default.inst.instNmCheckYet,
        //     })
        //     return
        // }
        //메인 제목 길이가 25자를 넘음
        // if (detailState.info.MISN_SUBNAME1.length > 25) {
        //     handlMainAlert({
        //         state: true,
        //         message: Messages.Default.contents.magazine.error.nameLong,
        //     })
        //     return
        // }

        handleNotice().then()
    }

    useEffect(() => {
        const funcSetDetail = () => {
            if (params.NOTICE_NO) {
                handleGetInfo(String(params.NOTICE_NO)).then()
            }
        }
        if (
            pageMode === `modify` &&
            params.NOTICE_NO &&
            detailState.status === 'idle'
        ) {
            funcSetDetail()
        } else {
            setDetailState(prevState => ({
                ...prevState,
                status: 'success',
                info: {
                    NOTICE_NO: '',
                    NOTICE_SJ: '',
                    REGIST_DT: '',
                    REGIST_ID: '',
                    NOTI_DT: '',
                    NOTICE_CN: '',
                    PUSH_AT: '',
                    TRGET_SVC_CODE: '',
                    TRGET_SVC_CODE_NM: '',
                    USE_AT: 'N',
                },
            }))
        }
    }, [
        detailState.status,
        handleGetInfo,
        pageMode,
        params.NOTICE_NO,
        setDetailState,
    ])

    return (
        <DetailContainer>
            <TableContainer>
                <TableWapper>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`게시물 제목`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="w-2/4">
                                    <VaryInput
                                        InputType={'text'}
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    NOTICE_SJ: e.target.value,
                                                },
                                            }))
                                        }
                                        id={'id'}
                                        Placeholder={
                                            '게시물 제목을 입력해 주세요'
                                        }
                                        Value={
                                            detailState.info.NOTICE_SJ
                                                ? detailState.info.NOTICE_SJ
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`게시물 유형`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap gap-1">
                                <VarySelectBox
                                    Value={
                                        detailState.info.TRGET_SVC_CODE
                                            ? detailState.info.TRGET_SVC_CODE
                                            : ''
                                    }
                                    Elements={Codes.boardCode.list.map(e => {
                                        return {
                                            value: e.code,
                                            text: e.name,
                                        }
                                    })}
                                    HandleOnChange={e =>
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            info: {
                                                ...prevState.info,
                                                TRGET_SVC_CODE: e.value,
                                                TRGET_SVC_CODE_NM: e.text,
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <LabelCell>
                            <VaryLabel LabelName={`공개 일자`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap gap-1">
                                <VaryDatepickerInput
                                    ContentsType={`search`}
                                    Value={
                                        detailState.info.NOTI_DT
                                            ? changeDatePickerDate(
                                                  detailState.info.NOTI_DT.replaceAll(
                                                      '-',
                                                      ''
                                                  )
                                              )
                                            : new Date()
                                    }
                                    CallBackReturn={e => {
                                        const { year, monthPad, dayPad } =
                                            gmtTimeToTimeObject(e)
                                        setDetailState(prevState => ({
                                            ...prevState,
                                            info: {
                                                ...prevState.info,
                                                NOTI_DT: `${year}${monthPad}${dayPad}`,
                                            },
                                        }))
                                    }}
                                />
                            </div>
                        </InputCell>
                    </Row>
                    <Row>
                        <QuilEditorLabelCell>
                            <VaryLabel LabelName={`내용`} />
                        </QuilEditorLabelCell>
                        <QuilEditorCell colSpan={3}>
                            <div className="flex flex-nowrap w-full items-center">
                                <div className="grow">
                                    <ReactQuillEditor
                                        Value={
                                            detailState.info.NOTICE_CN
                                                ? detailState.info.NOTICE_CN
                                                : ''
                                        }
                                        OnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    NOTICE_CN: e.toString(),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </QuilEditorCell>
                    </Row>
                    <Row>
                        <LabelCell rowSpan={2}>
                            <VaryLabel LabelName={`게시물 노출`} />
                        </LabelCell>
                        <InputCell>
                            <div className="flex flex-nowrap px-0">
                                <div className="mr-2">
                                    <VaryLabelRadioButton
                                        LabelName={`노출`}
                                        Checked={
                                            !!(
                                                detailState.info.USE_AT &&
                                                detailState.info.USE_AT === 'Y'
                                            )
                                        }
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    USE_AT: e.target.checked
                                                        ? 'Y'
                                                        : 'N',
                                                },
                                            }))
                                        }
                                    />
                                </div>

                                <div className="mr-2">
                                    <VaryLabelRadioButton
                                        LabelName={`비노출`}
                                        Checked={
                                            !!(
                                                detailState.info.USE_AT &&
                                                detailState.info.USE_AT === 'N'
                                            )
                                        }
                                        HandleOnChange={e =>
                                            setDetailState(prevState => ({
                                                ...prevState,
                                                info: {
                                                    ...prevState.info,
                                                    USE_AT: e.target.checked
                                                        ? 'N'
                                                        : 'Y',
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
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`돌아가기`}
                        HandleClick={() => {
                            navigate({
                                pathname:
                                    process.env.PUBLIC_URL +
                                    `/manage/manager/notice-list`,
                            })
                        }}
                    />
                </ButtonItem>
                <ButtonItem>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName={`확인`}
                        HandleClick={() =>
                            setDetailState(prevState => ({
                                ...prevState,
                                modal: {
                                    ...prevState.modal,
                                    confirm: true,
                                },
                            }))
                        }
                    />
                </ButtonItem>
            </ButtonBox>
            {detailState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.contents.notice.update}
                    CancleButtonName={`취소`}
                    ApplyButtonName={`확인`}
                    CancleButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                    }}
                    ApplyButtonClick={() => {
                        setDetailState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                confirm: false,
                            },
                        }))
                        console.log(detailState)
                        handleClickApplyButton()
                    }}
                />
            )}
        </DetailContainer>
    )
}

export default NoticeDetailTable
