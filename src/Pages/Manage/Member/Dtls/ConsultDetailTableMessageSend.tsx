import {
    ConfirmModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryLabelTextArea,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { ConsultDetailSmsSendState } from '@Recoil/MemberPagesState'
import { useRecoilState, useResetRecoilState } from 'recoil'
import React, { useEffect, useState } from 'react'
import Messages from '@Messages'
import _ from 'lodash'
import { useMainLayouts } from '@Hook/index'
import { mberSendSms } from '@Service/MemberService'

const initializeState = {
    modal: {
        confirm: false,
    },
}

const ConsultDetailTableMessageSend = () => {
    const { handlMainAlert } = useMainLayouts()
    const [smsSendState, setSmsSendState] = useRecoilState(
        ConsultDetailSmsSendState
    )
    const resetSmsSendState = useResetRecoilState(ConsultDetailSmsSendState)

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const handleSmsSend = async () => {
        if (_.isEmpty(smsSendState.send.SMS_CN)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.sms.sendContentEmpty,
            })
            return
        }

        if (_.isEmpty(smsSendState.send.SNDNG_NO)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.sms.sendSndngNoEmpty,
            })
            return
        }

        if (
            smsSendState.send.SMS_CN &&
            smsSendState.send.SMS_SJ &&
            smsSendState.send.SNDNG_DT &&
            smsSendState.send.SNDNG_NO &&
            smsSendState.send.SEND_ALL_MBER &&
            smsSendState.send.SEND_MBER_INFO_LIST.length > 0
        ) {
            const { status } = await mberSendSms({
                SMS_CN: smsSendState.send.SMS_CN,
                SMS_SJ: smsSendState.send.SMS_SJ,
                SNDNG_DT: smsSendState.send.SNDNG_DT,
                SNDNG_NO: smsSendState.send.SNDNG_NO,
                SEND_ALL_MBER: smsSendState.send.SEND_ALL_MBER,
                SEND_MBER_INFO_LIST: smsSendState.send.SEND_MBER_INFO_LIST,
            })

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                resetSmsSendState()
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        }
    }

    useEffect(() => {
        const funcSetSendDt = () => {
            const { year, monthPad, dayPad, hourPad, minutePad, secondPad } =
                gmtTimeToTimeObject(new Date())

            setSmsSendState(prevState => ({
                ...prevState,
                send: {
                    ...prevState.send,
                    SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                },
            }))
        }

        if (_.isEmpty(smsSendState.send.SNDNG_DT)) {
            funcSetSendDt()
        }
    }, [setSmsSendState, smsSendState])

    return (
        <>
            <div className="flex flex-col break-words bg-white pt-3">
                <div className="flex flex-nowrap whitespace-nowrap w-full">
                    <div className="flex w-full text-sm text-gray-500 ">
                        <VaryLabelTextArea
                            HandleOnChange={e =>
                                setSmsSendState(prevState => ({
                                    ...prevState,
                                    send: {
                                        ...prevState.send,
                                        SMS_CN: e.target.value,
                                    },
                                }))
                            }
                            Placeholder={`내용`}
                            Value={
                                smsSendState.send.SMS_CN
                                    ? smsSendState.send.SMS_CN
                                    : ''
                            }
                            Rows={20}
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full pt-2">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`발신번호:`} />
                    </div>
                    <div className="flex w-full">
                        <VaryInput
                            HandleOnChange={e =>
                                setSmsSendState(prevState => ({
                                    ...prevState,
                                    send: {
                                        ...prevState.send,
                                        SNDNG_NO: e.target.value,
                                    },
                                }))
                            }
                            id={'id'}
                            Placeholder={'발신 번호'}
                            Value={
                                smsSendState.send.SNDNG_NO
                                    ? smsSendState.send.SNDNG_NO
                                    : ''
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-nowrap whitespace-nowrap w-full pt-2">
                    <div className="flex px-2 w-1/4 text-sm text-gray-500 h-8">
                        <VaryLabel LabelName={`발신시간:`} />
                    </div>
                    <div className="w-full">
                        <div className="grid grid-rows-2 grid-flow-col gap-1">
                            <div className="flex flex-nowrap items-center">
                                <div className="px-0">
                                    <VaryLabelCheckBox
                                        LabelName={`바로발송`}
                                        Checked={
                                            smsSendState.send.SNDNG_GBN === 'N'
                                        }
                                        HandleOnChange={e => {
                                            setSmsSendState(prevState => ({
                                                ...prevState,
                                                send: {
                                                    ...prevState.send,
                                                    SNDNG_GBN: e.target.checked
                                                        ? 'N'
                                                        : 'Y',
                                                },
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="px-2">
                                    <VaryLabelCheckBox
                                        LabelName={`예약발송`}
                                        Checked={
                                            smsSendState.send.SNDNG_GBN === 'Y'
                                        }
                                        HandleOnChange={e => {
                                            setSmsSendState(prevState => ({
                                                ...prevState,
                                                send: {
                                                    ...prevState.send,
                                                    SNDNG_GBN: e.target.checked
                                                        ? 'Y'
                                                        : 'N',
                                                },
                                            }))
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-nowrap">
                                    <div className="w-2/8">
                                        <VaryDatepickerInput
                                            Value={
                                                smsSendState.send.SNDNG_DT
                                                    ? changeDatePickerDate(
                                                          smsSendState.send
                                                              .SNDNG_DT
                                                      )
                                                    : new Date()
                                            }
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                    hourPad,
                                                    minutePad,
                                                    secondPad,
                                                } = gmtTimeToTimeObject(e)
                                                setSmsSendState(prevState => ({
                                                    ...prevState,
                                                    send: {
                                                        ...prevState.send,
                                                        SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                                                    },
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div className="w-2/5">
                                        <VaryDatepickerInput
                                            ContentsType={`time`}
                                            DateFormat={'h:mm'}
                                            Value={
                                                smsSendState.send.SNDNG_DT
                                                    ? changeDatePickerDate(
                                                          smsSendState.send
                                                              .SNDNG_DT
                                                      )
                                                    : new Date()
                                            }
                                            CallBackReturn={e => {
                                                const {
                                                    year,
                                                    monthPad,
                                                    dayPad,
                                                    hourPad,
                                                    minutePad,
                                                    secondPad,
                                                } = gmtTimeToTimeObject(e)
                                                setSmsSendState(prevState => ({
                                                    ...prevState,
                                                    send: {
                                                        ...prevState.send,
                                                        SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                                                    },
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex pt-3">
                    <div className="px-2">
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`취소`}
                            HandleClick={() => {
                                resetSmsSendState()
                            }}
                        />
                    </div>
                    <div className="px-2">
                        <VaryButton
                            BgColor={`mBBlue`}
                            Name={`보내기`}
                            HandleClick={() => {
                                setPageState(prevState => ({
                                    ...prevState,
                                    modal: {
                                        ...prevState.modal,
                                        confirm: true,
                                    },
                                }))
                            }}
                        />
                    </div>
                </div>
            </div>
            {pageState.modal.confirm && (
                <ConfirmModal
                    Title={Messages.Default.sms.sendConfirm}
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
                        handleSmsSend().then()
                    }}
                />
            )}
        </>
    )
}

export default ConsultDetailTableMessageSend
