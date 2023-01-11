import React from 'react'
import { ConfirmModalStyle, ModalStyle } from '@Style/Elements/ModalStyles'
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
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={
                                        CancleButtonName
                                            ? CancleButtonName
                                            : `취소`
                                    }
                                    HandleClick={() =>
                                        CancleButtonClick()
                                    }></VaryButton>
                                <VaryButton
                                    ButtonType={`default`}
                                    ButtonName={
                                        ApplyButtonName
                                            ? ApplyButtonName
                                            : `확인`
                                    }
                                    HandleClick={() =>
                                        ApplyButtonClick()
                                    }></VaryButton>
                            </ButtonBox>
                        </CenterBox>
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default ConfirmModal
