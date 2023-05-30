import Const from '@Const'
import React, { useEffect, useState } from 'react'
import { DefaultStatus, MemberSearchItemInterface } from '@CommonTypes'
import { useMainLayouts } from '@Hook/index'
import _ from 'lodash'
import Messages from '@Messages'
import { gmtTimeToTimeObject, hangulContentsByteLength } from '@Helper'
import { postMberSendPush, postMberSendSms } from '@Service/CommonService'
import {
    PstinstSelector,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryModal,
    VaryTextArea,
    MemberSearchModal,
} from '@Element/index'
import { DetailTableStyle } from '@Style/Elements/TableStyles'

const { InputCell, LabelCell, Row, TableContainer, TableWapper } =
    DetailTableStyle

const contentsByteLengthLimit = 500
const titleByteLengthLimit = 20

const initializeState = {
    status: 'idle',
    modal: {
        pstinstSelector: false,
        memberSearch: false,
    },
    message: {
        type: 'sms',
        title: '',
        contents: '',
        contentsLength: 0,
        instNo: null,
        allSendCheck: false,
        selectedMember: [],
        sndngNo: Const.reprsntTelno,
        sendTime: {
            selectTime: new Date(),
            sendParam: 'N',
        },
    },
}

const MessageSendModal = ({
    MessageType,
    SendFinished,
    SelectMember,
}: {
    MessageType: string | 'sms' | 'push'
    SendFinished: () => void
    SelectMember?: MemberSearchItemInterface[]
}) => {
    const [pageState, setPageState] = useState<{
        status: string | DefaultStatus
        modal: {
            pstinstSelector: boolean
            memberSearch: boolean
        }
        message: {
            title: string
            contents: string
            contentsLength: number
            instNo: number | null
            allSendCheck: boolean
            selectedMember: MemberSearchItemInterface[]
            sndngNo: string
            sendTime: {
                selectTime: Date
                sendParam: string | 'N' | 'R'
            }
        }
    }>(initializeState)
    const { handlMainAlert } = useMainLayouts()

    // 문자 발송 처리.
    const handleMessageSend = async () => {
        const {
            sendTime: { selectTime },
            allSendCheck,
            instNo,
            sndngNo,
            contents,
            selectedMember,
        } = pageState.message

        if (_.isEmpty(contents)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptyContents,
            })
            return
        }

        if (instNo === null && selectedMember.length === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptyTarget,
            })
            return
        }

        if (_.isEmpty(sndngNo)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptySndngNo,
            })
            return
        }

        const { year, monthPad, dayPad, hourPad, minutePad, secondPad } =
            gmtTimeToTimeObject(selectTime)

        const payload: {
            INST_NO?: string
            SMS_SJ: string
            SMS_CN: string
            SNDNG_NO: string
            SNDNG_DT: string
            SEND_ALL_MBER: 'N' | 'Y'
            SEND_MBER_INFO_LIST: MemberSearchItemInterface[]
        } = {
            INST_NO: String(instNo),
            SMS_SJ: `관리자 페이지 메시지 전송`,
            SMS_CN: contents,
            SNDNG_NO: sndngNo,
            SEND_ALL_MBER: instNo && allSendCheck ? 'Y' : 'N',
            SEND_MBER_INFO_LIST: selectedMember.map(e => {
                return {
                    MBER_NO: Number(e.MBER_NO),
                    MBTLNUM: e.MBTLNUM,
                    USID: e.USID,
                    SV00_NTCN_AT: e.SV00_NTCN_AT,
                    NM: e.NM,
                    MBTLNUM_CRTFC_AT: e.MBTLNUM_CRTFC_AT,
                }
            }),
            SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
        }

        if (_.isEmpty(payload.INST_NO) || _.isNull(payload.INST_NO)) {
            delete payload.INST_NO
        }

        setPageState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { status } = await postMberSendSms(payload)
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            setPageState(prevState => ({
                ...prevState,
                status: 'success',
            }))
            SendFinished()
        } else {
            setPageState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    // 앱푸시 발송
    const handleAppPushSend = async () => {
        const {
            sendTime: { selectTime },
            allSendCheck,
            instNo,
            title,
            contents,
            selectedMember,
        } = pageState.message

        if (_.isEmpty(contents)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptyTitle,
            })
            return
        }

        if (_.isEmpty(contents)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptyContents,
            })
            return
        }

        if (instNo === null && selectedMember.length === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.messageSend.emptyTarget,
            })
            return
        }

        const { year, monthPad, dayPad, hourPad, minutePad, secondPad } =
            gmtTimeToTimeObject(selectTime)

        const payload: {
            INST_NO?: string
            PUSH_CN: string
            PUSH_CODE: string // 'SV00'
            PUSH_SJ: string
            SEND_ALL_MBER: 'Y' | 'N'
            SEND_MBER_INFO_LIST: MemberSearchItemInterface[]
            SNDNG_DT: string
        } = {
            INST_NO: String(instNo),
            PUSH_CN: title,
            PUSH_SJ: contents,
            PUSH_CODE: 'SV00',
            SEND_ALL_MBER: instNo && allSendCheck ? 'Y' : 'N',
            SEND_MBER_INFO_LIST: selectedMember.map(e => {
                return {
                    MBER_NO: Number(e.MBER_NO),
                    MBTLNUM: e.MBTLNUM,
                    USID: e.USID,
                    SV00_NTCN_AT: e.SV00_NTCN_AT,
                    NM: e.NM,
                    MBTLNUM_CRTFC_AT: e.MBTLNUM_CRTFC_AT,
                }
            }),
            SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
        }

        if (_.isEmpty(payload.INST_NO) || _.isNull(payload.INST_NO)) {
            delete payload.INST_NO
        }

        setPageState(prevState => ({
            ...prevState,
            status: 'loading',
        }))

        const { status } = await postMberSendPush(payload)
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            setPageState(prevState => ({
                ...prevState,
                status: 'success',
            }))
            SendFinished()
        } else {
            setPageState(prevState => ({
                ...prevState,
                status: 'failure',
            }))
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
        }
    }

    useEffect(() => {
        if (SelectMember && SelectMember.length > 0) {
            setPageState(prevState => ({
                ...prevState,
                message: {
                    ...prevState.message,
                    selectedMember: SelectMember,
                },
            }))
        }
    }, [SelectMember])

    // clean
    useEffect(() => {
        return () => {
            setPageState(initializeState)
        }
    }, [])

    useEffect(() => {
        setPageState({
            ...initializeState,
            message: {
                ...initializeState.message,
                sendTime: {
                    ...initializeState.message.sendTime,
                    selectTime: new Date(),
                },
            },
        })
    }, [])

    return (
        <>
            <VaryModal
                ModalLoading={pageState.status === 'loading'}
                MaxWidth={`xl5`}
                NeedMax={false}
                Children={
                    <>
                        <TableContainer>
                            <TableWapper>
                                {MessageType === 'push' && (
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`제목`} />
                                        </LabelCell>
                                        <InputCell colSpan={3}>
                                            <div className="flex w-full flex-col">
                                                <VaryInput
                                                    InputType={'text'}
                                                    Value={
                                                        pageState.message.title
                                                    }
                                                    HandleOnChange={e => {
                                                        const stateTitleLength =
                                                            pageState.message
                                                                .title.length
                                                        const valueLength =
                                                            e.target.value
                                                                .length
                                                        if (
                                                            stateTitleLength >
                                                                titleByteLengthLimit ||
                                                            valueLength >
                                                                titleByteLengthLimit
                                                        ) {
                                                            return
                                                        } else {
                                                            setPageState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    message: {
                                                                        ...prevState.message,
                                                                        title: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }}
                                                />
                                                <div className="flex text-left pt-1">
                                                    {`${pageState.message.title.length}/${titleByteLengthLimit} 자`}
                                                </div>
                                            </div>
                                        </InputCell>
                                    </Row>
                                )}
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`내용`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <div className="flex w-full flex-col">
                                            <VaryTextArea
                                                Rows={10}
                                                Placeholder={`내용을 입력해 주세요`}
                                                Value={
                                                    pageState.message.contents
                                                }
                                                HandleOnChange={e => {
                                                    if (
                                                        hangulContentsByteLength(
                                                            e.target.value
                                                        ) >
                                                        contentsByteLengthLimit
                                                    ) {
                                                        return
                                                    } else {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    contents:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        )
                                                    }
                                                }}
                                            />
                                            <div className="flex text-left pt-1">
                                                {`${hangulContentsByteLength(
                                                    pageState.message.contents
                                                )}/${contentsByteLengthLimit} byte`}
                                            </div>
                                        </div>
                                    </InputCell>
                                </Row>
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`수신소속`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <div className="flex flex-nowrap gap-2">
                                            <PstinstSelector
                                                HandleSelectValue={({
                                                    instNo,
                                                }) => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            instNo: instNo
                                                                ? instNo
                                                                : null,
                                                        },
                                                    }))
                                                }}
                                            />
                                            <VaryLabelCheckBox
                                                LabelName="소속기관 회원 전체 선택"
                                                LabelWidth={`wMin`}
                                                Checked={
                                                    pageState.message
                                                        .allSendCheck
                                                }
                                                HandleOnChange={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            allSendCheck:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </InputCell>
                                </Row>
                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`수신자`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <div className="flex">
                                            <VaryButton
                                                ButtonType={`default`}
                                                HandleClick={() =>
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        modal: {
                                                            ...prevState.modal,
                                                            memberSearch: true,
                                                        },
                                                    }))
                                                }
                                                ButtonName={`추가`}
                                            />
                                        </div>
                                        <div className="flex pt-2">
                                            <div className="flex flex-wrap max-w-12 gap-2">
                                                {_.map(
                                                    pageState.message
                                                        .selectedMember,
                                                    (mem, memIndex) => {
                                                        return (
                                                            <span
                                                                key={`consult-manage-box-selected-member-item-${memIndex}`}
                                                                className="inline-flex items-center px-2 py-1 mr-2 text-xs text-gray-500 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                                                {`${mem.NM}`}
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                                                                    data-dismiss-target="#badge-dismiss-dark"
                                                                    aria-label="Remove"
                                                                    onClick={() => {
                                                                        setPageState(
                                                                            prevState => ({
                                                                                ...prevState,
                                                                                message:
                                                                                    {
                                                                                        ...prevState.message,
                                                                                        selectedMember:
                                                                                            _.filter(
                                                                                                prevState
                                                                                                    .message
                                                                                                    .selectedMember,
                                                                                                s =>
                                                                                                    s.MBER_NO !==
                                                                                                    mem.MBER_NO
                                                                                            ),
                                                                                    },
                                                                            })
                                                                        )
                                                                    }}>
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        className="w-3.5 h-3.5"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                            clipRule="evenodd"></path>
                                                                    </svg>
                                                                    <span className="sr-only">
                                                                        Remove
                                                                        badge
                                                                    </span>
                                                                </button>
                                                            </span>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </InputCell>
                                </Row>
                                {MessageType === 'sms' && (
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`발신번호`} />
                                        </LabelCell>
                                        <InputCell colSpan={3}>
                                            <VaryInput
                                                Width={'w60'}
                                                InputType={'text'}
                                                Value={
                                                    pageState.message.sndngNo
                                                }
                                                HandleOnChange={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            sndngNo:
                                                                e.target.value,
                                                        },
                                                    }))
                                                }}
                                            />
                                        </InputCell>
                                    </Row>
                                )}

                                <Row>
                                    <LabelCell>
                                        <VaryLabel LabelName={`발신 시간`} />
                                    </LabelCell>
                                    <InputCell colSpan={3}>
                                        <div className="flex flex-nowrap gap-4">
                                            <VaryDatepickerInput
                                                ReadOnly={
                                                    pageState.message.sendTime
                                                        .sendParam === 'N'
                                                }
                                                InputeType={'default'}
                                                Width={`w36`}
                                                Value={
                                                    pageState.message.sendTime
                                                        .selectTime
                                                }
                                                CallBackReturn={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            sendTime: {
                                                                ...prevState
                                                                    .message
                                                                    .sendTime,
                                                                selectTime: e,
                                                            },
                                                        },
                                                    }))
                                                }}
                                            />
                                            <VaryDatepickerInput
                                                ReadOnly={
                                                    pageState.message.sendTime
                                                        .sendParam === 'N'
                                                }
                                                ShowType={`time`}
                                                Width={`w20`}
                                                InputeType={`default`}
                                                DateFormat={'h시 mm분'}
                                                Value={
                                                    pageState.message.sendTime
                                                        .selectTime
                                                }
                                                CallBackReturn={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            sendTime: {
                                                                ...prevState
                                                                    .message
                                                                    .sendTime,
                                                                selectTime: e,
                                                            },
                                                        },
                                                    }))
                                                }}
                                            />
                                            <VaryLabelCheckBox
                                                Checked={
                                                    pageState.message.sendTime
                                                        .sendParam === 'N'
                                                }
                                                LabelWidth={`wMin`}
                                                LabelName="바로발송"
                                                HandleOnChange={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            sendTime: {
                                                                ...prevState
                                                                    .message
                                                                    .sendTime,
                                                                sendParam: e
                                                                    .target
                                                                    .checked
                                                                    ? 'N'
                                                                    : 'R',
                                                            },
                                                        },
                                                    }))
                                                }}
                                            />
                                            <VaryLabelCheckBox
                                                Checked={
                                                    pageState.message.sendTime
                                                        .sendParam === 'R'
                                                }
                                                LabelWidth={`wMin`}
                                                LabelName="예약발송"
                                                HandleOnChange={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            sendTime: {
                                                                ...prevState
                                                                    .message
                                                                    .sendTime,
                                                                sendParam: e
                                                                    .target
                                                                    .checked
                                                                    ? 'R'
                                                                    : 'N',
                                                            },
                                                        },
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </InputCell>
                                </Row>
                            </TableWapper>
                        </TableContainer>
                    </>
                }
                Buttons={
                    <>
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'취소'}
                            HandleClick={() => {
                                SendFinished()
                            }}
                        />
                        <VaryButton
                            ButtonType={'default'}
                            ButtonName={'보내기'}
                            HandleClick={() => {
                                MessageType === 'sms'
                                    ? handleMessageSend().then()
                                    : handleAppPushSend().then()
                            }}
                        />
                    </>
                }></VaryModal>
            {pageState.modal.memberSearch && (
                <MemberSearchModal
                    SearchType={`default`}
                    SearchTitle={`수신자 추가`}
                    InstNo={Number(1000)}
                    PermiCode={Number(1000) === 1000 ? 'SM00' : 'IM00'}
                    CloseButtonClick={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: { ...prevState.modal, memberSearch: false },
                        }))
                    }
                    SaveButtonClick={e => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: { ...prevState.modal, memberSearch: false },
                            message: {
                                ...prevState.message,
                                selectedMember: _.uniqBy(
                                    _.concat(
                                        prevState.message.selectedMember,
                                        e.selected
                                    ),
                                    'MBER_NO'
                                ),
                            },
                        }))
                    }}
                />
            )}
        </>
    )
}

export default MessageSendModal
