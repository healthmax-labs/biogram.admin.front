import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton, MessageSendModal } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        smsSend: false,
        appPushSend: false,
    },
}

const ConsultManageBox = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            smsSend: boolean
            appPushSend: boolean
        }
    }>(initializeState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'메세지 보내기'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: true,
                            },
                        }))
                    }}
                />
                <VaryButton
                    ButtonType={'manage'}
                    ButtonName={'앱 푸시 보내기'}
                    HandleClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                appPushSend: true,
                            },
                        }))
                    }}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'엑셀 내려받기'}
                />
            </Buttons>

            {pageState.modal.smsSend && (
                <MessageSendModal
                    MessageType={`sms`}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                smsSend: false,
                            },
                        }))
                    }
                />
            )}

            {pageState.modal.appPushSend && (
                <MessageSendModal
                    MessageType={`push`}
                    SendFinished={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                appPushSend: false,
                            },
                        }))
                    }
                />
            )}
        </Wapper>
    )
}

export default ConsultManageBox
