import React, { useEffect, useRef, useState } from 'react'
import { ModalStyle, AlertModelStyle } from '@Style/Elements/ModalStyles'

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

export default function PhoneAuthModal({
    modalTitle,
    showControl,
    okButtonClick,
}: {
    modalTitle: string
    showControl: boolean
    okButtonClick: () => void
}) {
    const authInputRef = useRef<HTMLInputElement>(null)
    const [showModal, setShowModal] = useState<boolean>(true)

    useEffect(() => {
        if (showControl) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [showControl])

    useEffect(() => {
        authInputRef.current?.focus()
    }, [])
    return (
        <>
            {showModal && (
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
            )}
        </>
    )
}
