import React, { useEffect, useState } from 'react'
import { ModalStyle, ConfimModalStyle } from '@Style/Elements/ModalStyles'

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

const { CenterText } = ConfimModalStyle

export default function ConfimModal({
    title,
    showControl,
    cancleButtonClick,
    applyButtonClick,
}: {
    title: string
    showControl: boolean
    cancleButtonClick: () => void
    applyButtonClick: () => void
}) {
    const [showModal, setShowModal] = useState<boolean>(true)

    useEffect(() => {
        if (showControl) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [showControl])
    return (
        <>
            {showModal && (
                <Container>
                    <ModalBackground></ModalBackground>
                    <MainWapper>
                        <Wapper>
                            <MainBox>
                                <CenterBox>
                                    <CenterText>{title}</CenterText>
                                    <ButtonBox>
                                        <Button
                                            onClick={() => cancleButtonClick()}>
                                            최소
                                        </Button>
                                        <Button
                                            onClick={() => applyButtonClick()}>
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
