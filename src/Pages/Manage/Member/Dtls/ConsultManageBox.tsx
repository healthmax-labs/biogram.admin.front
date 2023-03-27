import React, { useEffect, useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DetailTableStyle } from '@Style/Elements/TableStyles'
import {
    VaryButton,
    VaryLabelCheckBox,
    VaryModal,
    VaryLabel,
    VaryTextArea,
    VaryInput,
    VaryDatepickerInput,
    PstinstSelector,
    MemberSearchModal,
} from '@Elements'
import _ from 'lodash'
import { MemberSearchItemInterface } from '@CommonTypes'
import Const from '@Const'
import Messages from '@Messages'
import { useMainLayouts } from '@Hook/index'
import { gmtTimeToTimeObject } from '@Helper'
import { postMberSendSms } from '@Service/CommonService'

const { Wapper, Buttons } = ManageBoxStyle
const { InputCell, LabelCell, Row, TableContainer, TableWapper } =
    DetailTableStyle

const initializeState = {
    modal: {
        sendMessage: false,
        pstinstSelector: false,
        memberSearch: false,
    },
    message: {
        title: '',
        contents: '',
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

const ConsultManageBox = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            sendMessage: boolean
            pstinstSelector: boolean
            memberSearch: boolean
        }
        message: {
            title: string
            contents: string
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

    // 발송 처리.
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
            SEND_MBER_INFO_LIST: Array<{
                MBER_NO: string
                NM: string
                USID: string
                MBTLNUM: string
                MBTLNUM_CRTFC_AT: 'Y' | 'N'
                SV00_NTCN_AT: 'Y' | 'N'
            }>
        } = {
            INST_NO: String(instNo),
            SMS_SJ: `관리자 페이지 메세지 전송`,
            SMS_CN: contents,
            SNDNG_NO: sndngNo,
            SEND_ALL_MBER: instNo && allSendCheck ? 'Y' : 'N',
            SEND_MBER_INFO_LIST: selectedMember.map(e => {
                return {
                    MBER_NO: String(e.MBER_NO),
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

        const { status } = await postMberSendSms(payload)
        if (status) {
            handlMainAlert({
                state: true,
                message: Messages.Default.processSuccess,
            })
            setPageState(prevState => ({
                ...prevState,
                modal: {
                    ...prevState.modal,
                    sendMessage: false,
                },
            }))
            return
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
            return
        }
    }

    useEffect(() => {
        return () => {
            setPageState(initializeState)
        }
    }, [])

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                sendMessage: true,
                            },
                        }))
                    }}
                    ButtonName={'메세지 보내기'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'앱 푸시 보내기'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'엑셀 내려받기'}
                />
            </Buttons>

            {pageState.modal.sendMessage && (
                <VaryModal
                    ModalLoading={false}
                    MaxWidth={`xl5`}
                    NeedMax={false}
                    Children={
                        <>
                            <TableContainer>
                                <TableWapper>
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel LabelName={`내용`} />
                                        </LabelCell>
                                        <InputCell colSpan={3}>
                                            <VaryTextArea
                                                Rows={10}
                                                Placeholder={`내용을 입력해 주세요`}
                                                Value={
                                                    pageState.message.contents
                                                }
                                                HandleOnChange={e => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        message: {
                                                            ...prevState.message,
                                                            contents:
                                                                e.target.value,
                                                        },
                                                    }))
                                                }}
                                            />
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
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    instNo: instNo
                                                                        ? instNo
                                                                        : null,
                                                                },
                                                            })
                                                        )
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
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    allSendCheck:
                                                                        e.target
                                                                            .checked,
                                                                },
                                                            })
                                                        )
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
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                modal: {
                                                                    ...prevState.modal,
                                                                    memberSearch:
                                                                        true,
                                                                },
                                                            })
                                                        )
                                                    }
                                                    ButtonName={`추가`}
                                                />
                                            </div>
                                            <div className="flex pt-2">
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
                                        </InputCell>
                                    </Row>
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
                                    <Row>
                                        <LabelCell>
                                            <VaryLabel
                                                LabelName={`발신 시간`}
                                            />
                                        </LabelCell>
                                        <InputCell colSpan={3}>
                                            <div className="flex flex-nowrap gap-4">
                                                <VaryDatepickerInput
                                                    ReadOnly={
                                                        pageState.message
                                                            .sendTime
                                                            .sendParam === 'N'
                                                    }
                                                    InputeType={'default'}
                                                    Width={`w36`}
                                                    Value={
                                                        pageState.message
                                                            .sendTime.selectTime
                                                    }
                                                    CallBackReturn={e => {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    sendTime: {
                                                                        ...prevState
                                                                            .message
                                                                            .sendTime,
                                                                        time: e,
                                                                    },
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                                <VaryDatepickerInput
                                                    ReadOnly={
                                                        pageState.message
                                                            .sendTime
                                                            .sendParam === 'N'
                                                    }
                                                    ShowType={`time`}
                                                    Width={`w20`}
                                                    InputeType={`default`}
                                                    DateFormat={'h시 mm분'}
                                                    Value={
                                                        pageState.message
                                                            .sendTime.selectTime
                                                    }
                                                    CallBackReturn={e => {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    sendTime: {
                                                                        ...prevState
                                                                            .message
                                                                            .sendTime,
                                                                        time: e,
                                                                    },
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={
                                                        pageState.message
                                                            .sendTime
                                                            .sendParam === 'N'
                                                    }
                                                    LabelWidth={`wMin`}
                                                    LabelName="바로발송"
                                                    HandleOnChange={e => {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    sendTime: {
                                                                        ...prevState
                                                                            .message
                                                                            .sendTime,
                                                                        sendParam:
                                                                            e
                                                                                .target
                                                                                .checked
                                                                                ? 'N'
                                                                                : 'R',
                                                                    },
                                                                },
                                                            })
                                                        )
                                                    }}
                                                />
                                                <VaryLabelCheckBox
                                                    Checked={
                                                        pageState.message
                                                            .sendTime
                                                            .sendParam === 'R'
                                                    }
                                                    LabelWidth={`wMin`}
                                                    LabelName="예약발송"
                                                    HandleOnChange={e => {
                                                        setPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                message: {
                                                                    ...prevState.message,
                                                                    sendTime: {
                                                                        ...prevState
                                                                            .message
                                                                            .sendTime,
                                                                        sendParam:
                                                                            e
                                                                                .target
                                                                                .checked
                                                                                ? 'R'
                                                                                : 'N',
                                                                    },
                                                                },
                                                            })
                                                        )
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
                                    setPageState(prevState => ({
                                        ...prevState,
                                        modal: {
                                            ...prevState.modal,
                                            sendMessage: false,
                                        },
                                    }))
                                }}
                            />
                            <VaryButton
                                ButtonType={'default'}
                                ButtonName={'보내기'}
                                HandleClick={() => {
                                    handleMessageSend().then()
                                }}
                            />
                        </>
                    }></VaryModal>
            )}
            {pageState.modal.pstinstSelector && (
                <PstinstSelector
                    SelectorType={`OnlyModal`}
                    HandleSelectValue={({ instNo, instNm }) => {
                        setPageState(prevState => ({
                            ...prevState,
                            addSelectPstinst: {
                                instNo: instNo,
                                instNm: instNm,
                            },
                            modal: {
                                ...prevState.modal,
                                pstinstSelector: false,
                                pstinstAgree: true,
                            },
                        }))
                    }}
                    HandleCancleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                pstinstSelector: false,
                            },
                        }))
                    }}
                />
            )}
            {pageState.modal.memberSearch && (
                <MemberSearchModal
                    SearchType={`default`}
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
        </Wapper>
    )
}

export default ConsultManageBox
