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
    ConsultDetailState,
    ConsultMsgBoxListState,
    ConsultDetailChartSmsState,
} from '@Recoil/MemberPagesState'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
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
    const [detailChartSmsState, setDetailChartSmsState] = useRecoilState(
        ConsultDetailChartSmsState
    )
    const detailState = useRecoilValue(ConsultDetailState)
    const setMessageBoxListState = useSetRecoilState(ConsultMsgBoxListState)

    const [pageState, setPageState] = useState<{
        modal: {
            confirm: boolean
        }
    }>(initializeState)

    const handleSmsSend = async () => {
        if (_.isEmpty(detailChartSmsState.sms.SMS_CN)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.sms.sendContentEmpty,
            })
            return
        }

        if (_.isEmpty(detailChartSmsState.sms.SNDNG_NO)) {
            handlMainAlert({
                state: true,
                message: Messages.Default.sms.sendSndngNoEmpty,
            })
            return
        }

        if (
            detailChartSmsState.sms.SMS_CN &&
            detailChartSmsState.sms.SMS_SJ &&
            detailChartSmsState.sms.SNDNG_DT &&
            detailChartSmsState.sms.SNDNG_NO &&
            detailChartSmsState.sms.SEND_ALL_MBER &&
            detailChartSmsState.sms.SEND_MBER_INFO_LIST.length > 0
        ) {
            const payload = {
                SMS_CN: detailChartSmsState.sms.SMS_CN,
                SMS_SJ: detailChartSmsState.sms.SMS_SJ,
                SNDNG_DT: detailChartSmsState.sms.SNDNG_DT,
                SNDNG_NO: detailChartSmsState.sms.SNDNG_NO,
                SEND_ALL_MBER: detailChartSmsState.sms.SEND_ALL_MBER,
                SEND_MBER_INFO_LIST:
                    detailChartSmsState.sms.SEND_MBER_INFO_LIST,
            }

            const { status } = await mberSendSms(payload)

            if (status) {
                handlMainAlert({
                    state: true,
                    message: Messages.Default.processSuccess,
                })
                setDetailChartSmsState(prevState => ({
                    ...prevState,
                    sms: {
                        ...prevState.sms,
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

            setDetailChartSmsState(prevState => ({
                ...prevState,
                sms: {
                    ...prevState.sms,
                    SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                },
            }))
        }

        if (_.isEmpty(detailChartSmsState.sms.SNDNG_DT)) {
            funcSetSendDt()
        }
    }, [detailChartSmsState.sms.SNDNG_DT, setDetailChartSmsState])

    useEffect(() => {
        const { year, monthPad, dayPad, hourPad, minutePad, secondPad } =
            gmtTimeToTimeObject(new Date())

        setDetailChartSmsState(prevState => ({
            ...prevState,
            sms: {
                ...prevState.sms,
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

                            setDetailChartSmsState(prevState => ({
                                ...prevState,
                                sms: {
                                    ...prevState.sms,
                                    SMS_CN: e.target.value,
                                },
                            }))
                        }}
                        Placeholder={`메시지 내용`}
                        Value={
                            detailChartSmsState.sms.SMS_CN
                                ? detailChartSmsState.sms.SMS_CN
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
                                setDetailChartSmsState(prevState => ({
                                    ...prevState,
                                    sms: {
                                        ...prevState.sms,
                                        SNDNG_NO: e.target.value,
                                    },
                                }))
                            }}
                            id={'id'}
                            Placeholder={'발신 번호'}
                            Value={
                                detailChartSmsState.sms.SNDNG_NO
                                    ? detailChartSmsState.sms.SNDNG_NO
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
                                        detailChartSmsState.sms.SNDNG_GBN ===
                                        'N'
                                    }
                                    HandleOnChange={e => {
                                        setDetailChartSmsState(prevState => ({
                                            ...prevState,
                                            sms: {
                                                ...prevState.sms,
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
                                        detailChartSmsState.sms.SNDNG_GBN ===
                                        'Y'
                                    }
                                    HandleOnChange={e => {
                                        setDetailChartSmsState(prevState => ({
                                            ...prevState,
                                            sms: {
                                                ...prevState.sms,
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
                                                detailChartSmsState.sms.SNDNG_DT
                                                    ? changeDatePickerDate(
                                                          detailChartSmsState
                                                              .sms.SNDNG_DT
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
                                                setDetailChartSmsState(
                                                    prevState => ({
                                                        ...prevState,
                                                        sms: {
                                                            ...prevState.sms,
                                                            SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                                                        },
                                                    })
                                                )
                                            }}
                                        />
                                    </SendBoxDatePickerDate>
                                    <SendBoxDatePickerTime>
                                        <VaryDatepickerInput
                                            ShowType={`time`}
                                            InputeType={`default`}
                                            DateFormat={'h:mm'}
                                            Value={
                                                detailChartSmsState.sms.SNDNG_DT
                                                    ? changeDatePickerDate(
                                                          detailChartSmsState
                                                              .sms.SNDNG_DT
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
                                                setDetailChartSmsState(
                                                    prevState => ({
                                                        ...prevState,
                                                        sms: {
                                                            ...prevState.sms,
                                                            SNDNG_DT: `${year}${monthPad}${dayPad}${hourPad}${minutePad}${secondPad}`,
                                                        },
                                                    })
                                                )
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
                                setDetailChartSmsState(prevState => ({
                                    ...prevState,
                                    sms: {
                                        ...prevState.sms,
                                        SMS_CN: null,
                                        SNDNG_DT: `${gmtTimeToTime.year}${gmtTimeToTime.monthPad}${gmtTimeToTime.dayPad}${gmtTimeToTime.hourPad}${gmtTimeToTime.minutePad}${gmtTimeToTime.secondPad}`,
                                        SEND_ALL_MBER: 'N',
                                        SNDNG_GBN: 'N',
                                    },
                                }))
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
