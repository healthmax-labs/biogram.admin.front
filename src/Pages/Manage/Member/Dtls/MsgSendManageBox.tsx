import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { MessageSendModal, VaryButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        smsSend: false,
    },
}

const ManageBox = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            smsSend: boolean
        }
    }>(initializeState)

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
                                smsSend: true,
                            },
                        }))
                    }}
                    ButtonName={'메시지 발송'}
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
                    SelectInst={{ instNm: null, instNo: null }}
                />
            )}
        </Wapper>
    )
}

export default ManageBox
