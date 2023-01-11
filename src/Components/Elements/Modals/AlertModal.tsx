import React, { useEffect, useRef } from 'react'
import { AlertModelStyle, ModalStyle } from '@Style/Elements/ModalStyles'
import { VaryButton } from '@Elements'

const {
    Container,
    ModalBackground,
    MainWapper,
    Wapper,
    MainBox,
    CenterBox,
    ButtonBox,
} = ModalStyle

const { TitleText } = AlertModelStyle

const AlertModal = ({
    modalTitle,
    okButtonClick,
}: {
    modalTitle: string
    okButtonClick: () => void
}) => {
    const authInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        authInputRef.current?.focus()
    }, [])
    return (
        <Container>
            <ModalBackground></ModalBackground>
            <MainWapper>
                <Wapper>
                    <MainBox>
                        <CenterBox>
                            <TitleText>{`${modalTitle}`}</TitleText>
                            <ButtonBox>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={`확인`}
                                    HandleClick={() => okButtonClick()}
                                />
                            </ButtonBox>
                        </CenterBox>
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default AlertModal
