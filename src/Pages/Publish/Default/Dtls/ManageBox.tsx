import React, { useState } from 'react'
import { ManageBoxStyle } from '@Style/Pages/PublishPageStyle'
import { DefaultManageButton } from '@Element/Buttons'
import { AlertModal, ConfimModal, PhoneAuthModal } from '@Element/Modals'

const { Wapper, Buttons } = ManageBoxStyle

export default function ManageBox() {
    const [showStep1Modal, setShowStep1Modal] = useState<boolean>(false)
    const [showStep2Modal, setShowStep2Modal] = useState<boolean>(false)
    const [showStep3Modal, setShowStep3Modal] = useState<boolean>(false)

    const handleStep1ModalCancle = () => {
        setShowStep1Modal(false)
    }

    const handleStep1ModalApply = () => {
        setShowStep1Modal(false)
    }

    const handleStep2ModalCancle = () => {
        setShowStep2Modal(false)
    }

    const handleStep2ModalApply = () => {
        setShowStep2Modal(false)
    }

    const handleStep3ModalApply = () => {
        setShowStep3Modal(false)
    }

    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => setShowStep1Modal(true)}
                    ButtonName={'모달 - 일반 확인 1'}
                />
                <DefaultManageButton
                    ButtonClick={() => setShowStep2Modal(true)}
                    ButtonName={'모달 - 휴대폰 번호 인증'}
                />
                <DefaultManageButton
                    ButtonClick={() => setShowStep3Modal(true)}
                    ButtonName={'모달 - 일반 확인'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'모달4'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'모달5'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'모달6'}
                />
            </Buttons>
            <ConfimModal
                title={`취소하시면 지금까지 입력한 정보는 저장되지 않습니다.`}
                showControl={showStep1Modal}
                cancleButtonClick={() => handleStep1ModalCancle()}
                applyButtonClick={() => handleStep1ModalApply()}
            />
            <PhoneAuthModal
                phoneNumber={`010-1234-1234`}
                showControl={showStep2Modal}
                cancleButtonClick={() => handleStep2ModalCancle()}
                applyButtonClick={() => handleStep2ModalApply()}
            />
            <AlertModal
                modalTitle={`이미 가입된 휴대폰 번호입니다`}
                showControl={showStep3Modal}
                okButtonClick={() => handleStep3ModalApply()}
            />
        </Wapper>
    )
}
