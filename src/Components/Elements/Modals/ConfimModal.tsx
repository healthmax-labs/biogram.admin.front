import React, { useEffect, useState } from 'react'
import { ConfimModalStyle, ModalStyle } from '@Style/Elements/ModalStyles'

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

const ConfimModal = ({
    title,
    showControl,
    cancleButtonClick,
    applyButtonClick,
}: {
    title: string
    showControl: boolean
    cancleButtonClick: () => void
    applyButtonClick: () => void
}) => {
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
                                            취소
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

export default ConfimModal
