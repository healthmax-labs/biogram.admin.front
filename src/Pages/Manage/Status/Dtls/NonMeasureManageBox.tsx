import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { AutoAlertModal, VaryButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const initializeState = {
    modal: {
        autoAlert: false,
    },
}

const NonMeasureManageBox = () => {
    const [pageState, setPageState] = useState<{
        modal: {
            autoAlert: boolean
        }
    }>(initializeState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={`manage`}
                    ButtonName="자동알림"
                    HandleClick={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                autoAlert: true,
                            },
                        }))
                    }
                />
            </Buttons>
            {pageState.modal.autoAlert && (
                <AutoAlertModal
                    CancleButtonClick={() => {
                        setPageState(prevState => ({
                            ...prevState,
                            modal: {
                                ...prevState.modal,
                                autoAlert: false,
                            },
                        }))
                    }}
                />
            )}
        </Wapper>
    )
}

export default NonMeasureManageBox
