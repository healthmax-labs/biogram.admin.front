import React from 'react'
import { ConfirmModalStyle, ModalStyle } from '@Style/Elements/ModalStyles'

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

const { CenterText } = ConfirmModalStyle

const ConfirmModal = ({
    Title,
    CancleButtonClick,
    ApplyButtonClick,
    CancleButtonName,
    ApplyButtonName,
}: {
    Title: string
    CancleButtonClick: () => void
    ApplyButtonClick: () => void
    CancleButtonName?: string
    ApplyButtonName?: string
}) => {
    return (
        <Container>
            <ModalBackground></ModalBackground>
            <MainWapper>
                <Wapper>
                    <MainBox>
                        <CenterBox>
                            <CenterText>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: Title,
                                    }}></div>
                            </CenterText>
                            <ButtonBox>
                                <Button onClick={() => CancleButtonClick()}>
                                    {CancleButtonName
                                        ? CancleButtonName
                                        : `취소`}
                                </Button>
                                <Button onClick={() => ApplyButtonClick()}>
                                    {ApplyButtonName ? ApplyButtonName : `확인`}
                                </Button>
                            </ButtonBox>
                        </CenterBox>
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default ConfirmModal
