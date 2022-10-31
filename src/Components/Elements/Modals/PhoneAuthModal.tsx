import React, { useEffect, useRef, useState } from 'react'
import { ModalStyle, AuthModalStyle } from '@Style/Elements/ModalStyles'

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

const { CenterText, AuthText, AuthInput, InputBox, AuthSpan, AuthErrorText } =
    AuthModalStyle

export default function PhoneAuthModal({
    phoneNumber,
    showControl,
    cancleButtonClick,
    applyButtonClick,
}: {
    phoneNumber: string
    showControl: boolean
    cancleButtonClick: () => void
    applyButtonClick: () => void
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

    // 인증 번호가 다를 경우 input 창 글자색도 빨간색으로

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
                                    <CenterText>{`"${phoneNumber}"`}</CenterText>
                                    <AuthText>
                                        핸드폰으로 발송된 인증번호를 입력해
                                        주세요.
                                    </AuthText>
                                    <InputBox>
                                        <AuthInput
                                            maxLength={4}
                                            ref={authInputRef}
                                            autoFocus={true}
                                            type="text"
                                            placeholder=""
                                        />
                                        <AuthSpan>3:45</AuthSpan>
                                    </InputBox>
                                    <AuthErrorText>
                                        * 인증 번호가 일치 하지 않습니다.
                                    </AuthErrorText>
                                    <ButtonBox>
                                        <Button
                                            onClick={() => cancleButtonClick()}>
                                            최소
                                        </Button>
                                        <Button
                                            onClick={() => applyButtonClick()}>
                                            인증하기
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
