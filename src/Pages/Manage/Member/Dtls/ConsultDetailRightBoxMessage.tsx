import React, { useEffect, useState } from 'react'
import {
    ConfirmModal,
    VaryButton,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryTextArea,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import {
    ConsultDetailSmsSendState,
    ConsultDetailState,
    ConsultMsgBoxListState,
} from '@Recoil/MemberPagesState'
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil'
import Messages from '@Messages'
import _ from 'lodash'
import { useMainLayouts } from '@Hook/index'
import { mberSendSms } from '@Service/MemberService'
import { ConsultDetailStyle } from '@Style/Pages/MemberPageStyles'

const {
    Message: {
        Memo: {
            Container,
            Row,
            ButtonCenterBox,
            LabelCell,
            ItemCell,
            SendBoxGrid,
            SendBoxRow,
            SendBoxDatePickerWapper,
            SendBoxDatePickerDate,
            SendBoxDatePickerTime,
        },
    },
} = ConsultDetailStyle

const initializeState = {
    modal: {
        confirm: false,
    },
}

const ConsultDetailRightBoxMessage = () => {
    const gmtTimeToTime = gmtTimeToTimeObject(new Date())
    const { handlMainAlert } = useMainLayouts()
    const [smsSendState, setSmsSendState] = useRecoilState(
        ConsultDetailSmsSendState
    )
    const detailState = useRecoilValue(ConsultDetailState)
    const resetSmsSendState = useResetRecoilState(ConsultDetailSmsSendState)
    const setMessageBoxListState = useSetRecoilState(ConsultMsgBoxListState)

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
            const payload = {
                SMS_CN: smsSendState.send.SMS_CN,
                SMS_SJ: smsSendState.send.SMS_SJ,
                SNDNG_DT: smsSendState.send.SNDNG_DT,
                SNDNG_NO: smsSendState.send.SNDNG_NO,
                SEND_ALL_MBER: smsSendState.send.SEND_ALL_MBER,
                SEND_MBER_INFO_LIST: smsSendState.send.SEND_MBER_INFO_LIST,
            }

            const { status } = await mberSendSms(payload)

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                setSmsSendState(prevState => ({
                    ...prevState,
                    send: {
                        ...prevState.send,
                        SMS_CN: null,
                        SNDNG_DT: `${gmtTimeToTime.year}${gmtTimeToTime.monthPad}${gmtTimeToTime.dayPad}${gmtTimeToTime.hourPad}${gmtTimeToTime.minutePad}${gmtTimeToTime.secondPad}`,
                        SEND_ALL_MBER: 'N',
                        SNDNG_GBN: 'N',
                    },
                }))
                setMessageBoxListState(prevState => ({
                    ...prevState,
                    reload: true,
                }))
            } else {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processFail,
                })
            }
        } else {
            handlMainAlert({
                state: true,
                message: Messages.Default.processFail,
            })
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

    useEffect(() => {
        const { year, monthPad, dayPad, hourPad, minutePad, secondPad } =
            gmtTimeToTimeObject(new Date())

        setSmsSendState(prevState => ({
            ...prevState,
            send: {
                ...prevState.send,
                SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
            },
        }))
        // FIXME : 종속성에서 setSmsSendState disable 처리
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <VaryTextArea
                        HandleOnChange={e => {
                            if (
                                detailState.detail &&
                                detailState.detail.MBER_INFO
                                    .MBTLNUM_CRTFC_AT === 'N'
                            ) {
                                handlMainAlert({
                                    state: true,
                                    message:
                                        Messages.Default.memberMbtlnumCrtfcAt,
                                })

                                return
                            }

                            setSmsSendState(prevState => ({
                                ...prevState,
                                send: {
                                    ...prevState.send,
                                    SMS_CN: e.target.value,
                                },
                            }))
                        }}
                        Placeholder={`메시지 내용`}
                        Value={
                            smsSendState.send.SMS_CN
                                ? smsSendState.send.SMS_CN
                                : ''
                        }
                        Rows={20}
                    />
                </Row>
                <Row>
                    <LabelCell>
                        <VaryLabel LabelName={`발신번호`} TextAlign={`left`} />
                    </LabelCell>
                    <ItemCell>
                        <VaryInput
                            HandleOnChange={e => {
                                setSmsSendState(prevState => ({
                                    ...prevState,
                                    send: {
                                        ...prevState.send,
                                        SNDNG_NO: e.target.value,
                                    },
                                }))
                            }}
                            id={'id'}
                            Placeholder={'발신 번호'}
                            Value={
                                smsSendState.send.SNDNG_NO
                                    ? smsSendState.send.SNDNG_NO
                                    : ''
                            }
                        />
                    </ItemCell>
                </Row>
                <Row>
                    <LabelCell>
                        <VaryLabel LabelName={`발신시간`} TextAlign={`left`} />
                    </LabelCell>
                    <ItemCell>
                        <SendBoxGrid>
                            <SendBoxRow>
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
                            </SendBoxRow>
                            <SendBoxRow>
                                <SendBoxDatePickerWapper>
                                    <SendBoxDatePickerDate>
                                        <VaryDatepickerInput
                                            InputeType={`default`}
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
                                    </SendBoxDatePickerDate>
                                    <SendBoxDatePickerTime>
                                        <VaryDatepickerInput
                                            ShowType={`time`}
                                            InputeType={`default`}
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
                                    </SendBoxDatePickerTime>
                                </SendBoxDatePickerWapper>
                            </SendBoxRow>
                        </SendBoxGrid>
                    </ItemCell>
                </Row>
                <Row>
                    <ButtonCenterBox>
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`취소`}
                            HandleClick={() => {
                                resetSmsSendState()
                            }}
                        />
                        <VaryButton
                            ButtonType={`default`}
                            ButtonName={`보내기`}
                            HandleClick={() => {
                                if (
                                    detailState.detail &&
                                    detailState.detail.MBER_INFO
                                        .MBTLNUM_CRTFC_AT === 'N'
                                ) {
                                    handlMainAlert({
                                        state: true,
                                        message:
                                            Messages.Default
                                                .memberMbtlnumCrtfcAt,
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
                            }}
                        />
                    </ButtonCenterBox>
                </Row>
            </Container>
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

export default ConsultDetailRightBoxMessage
