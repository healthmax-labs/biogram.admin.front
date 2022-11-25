import React, { useEffect, useRef } from 'react'
import { AlertModelStyle, ModalStyle } from '@Style/Elements/ModalStyles'

const {
    Container,
    ModalBackground,
    MainWapper,
    Wapper,
    MainBox,
    CenterBox,
    ButtonBox,
    Button,
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
                                <Button onClick={() => okButtonClick()}>
                                    확인
                                </Button>
                            </ButtonBox>
                        </CenterBox>
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default AlertModal
