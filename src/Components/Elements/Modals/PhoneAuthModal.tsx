import React, { useEffect, useRef, useState } from 'react'
import { AuthModalStyle, ModalStyle } from '@Style/Elements/ModalStyles'
import { useCountDown, useMainLayouts } from '@Hooks'
import { getCrtfcKey, postMbtlnumCrtfc } from '@Service/MemberService'
import { getOnlyNumber } from '@Helper'
import { isEmpty } from 'lodash'
import Messages from '@Messages'

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

const initializeState = {
    authNumber: null,
    error: {
        state: false,
        message: ``,
    },
    success: false,
}

const PhoneAuthModal = ({
    PhoneNumber,
    CancleButtonClick,
    HandleSuccess,
}: {
    PhoneNumber: string
    CancleButtonClick: () => void
    HandleSuccess: () => void
}) => {
    const authInputRef = useRef<HTMLInputElement>(null)
    const { seconds, minutes } = useCountDown({ Min: 3, Sec: 0 })
    const { handlMainAlert } = useMainLayouts()
    const [pageState, setPageState] = useState<{
        authNumber: string | null
        error: {
            state: boolean
            message: string
        }
        success: boolean
    }>(initializeState)

    const handleClickApplyButton = async () => {
        if (isEmpty(pageState.authNumber)) {
            setPageState(prevState => ({
                ...prevState,
                error: {
                    state: true,
                    message: Messages.Default.phoneAuth.input,
                },
            }))
            return
        }

        if (pageState.authNumber) {
            const { status, payload } = await getCrtfcKey({
                mbtlnum: getOnlyNumber(PhoneNumber),
                crtfc_key: pageState.authNumber,
            })

            if (status) {
                if (payload.MBTLNUM_CRTFC_AT.CRTFC_RESULT === 'NC') {
                    setPageState(prevState => ({
                        ...prevState,
                        error: {
                            state: true,
                            message: Messages.Default.phoneAuth.crtfc_result,
                        },
                    }))
                    return
                }

                if (payload.MBTLNUM_CRTFC_AT.CRTFC_RESULT === 'OK') {
                    setPageState(prevState => ({
                        ...prevState,
                        success: true,
                    }))
                    handlMainAlert({
                        state: true,
                        message: Messages.Default.phoneAuth.authSuccess,
                    })
                    return
                }
            } else {
                // FIXME: 에러 처리?
            }
        }
    }

    useEffect(() => {
        if (seconds === 0 && minutes === 0) {
            handlMainAlert({
                state: true,
                message: Messages.Default.phoneAuth.inputTime,
            })
        }
    }, [seconds, minutes, handlMainAlert])

    useEffect(() => {
        if (seconds === 0 && minutes === 0) {
            CancleButtonClick()
        }
    }, [seconds, minutes, CancleButtonClick])

    useEffect(() => {
        if (pageState.success) {
            HandleSuccess()
        }
    }, [HandleSuccess, pageState.success])

    // TODO: 인증 번호가 다를 경우 input 창 글자색도 빨간색으로
    useEffect(() => {
        postMbtlnumCrtfc({
            mbtlnum: getOnlyNumber(PhoneNumber),
        }).then(() => {
            authInputRef.current?.focus()
        })
    }, [PhoneNumber])

    return (
        <Container>
            <ModalBackground></ModalBackground>
            <MainWapper>
                <Wapper>
                    <MainBox>
                        <CenterBox>
                            <CenterText>{`"${PhoneNumber}"`}</CenterText>
                            <AuthText>
                                핸드폰으로 발송된 인증번호를 입력해 주세요.
                            </AuthText>
                            <InputBox>
                                <AuthInput
                                    maxLength={4}
                                    ref={authInputRef}
                                    autoFocus={true}
                                    type="text"
                                    placeholder=""
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPageState(prevState => ({
                                            ...prevState,
                                            authNumber: e.target.value,
                                            error: initializeState.error,
                                        }))
                                    }}
                                    value={
                                        pageState.authNumber !== null
                                            ? pageState.authNumber
                                            : ''
                                    }
                                />
                                <AuthSpan>{`${String(minutes).padStart(
                                    2,
                                    '0'
                                )}:${String(seconds).padStart(
                                    2,
                                    '0'
                                )}`}</AuthSpan>
                            </InputBox>

                            {pageState.error.state && (
                                <AuthErrorText>
                                    * {pageState.error.message}
                                </AuthErrorText>
                            )}

                            <ButtonBox>
                                <Button onClick={() => CancleButtonClick()}>
                                    취소
                                </Button>
                                <Button
                                    onClick={() => handleClickApplyButton()}>
                                    인증하기
                                </Button>
                            </ButtonBox>
                        </CenterBox>
                    </MainBox>
                </Wapper>
            </MainWapper>
        </Container>
    )
}

export default PhoneAuthModal
