import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storageManager, storageMaster } from '@Helper'
import { LoginBackgroundImage, LogoImage } from '@Assets'
import { LoginPageStyle } from '@Style/Pages/LoginPageStyles'
import { isEmpty } from 'lodash'
import { useAuth } from '@Hooks'

const {
    Container,
    Wapper,
    LogoBox,
    FormBox,
    FormRow,
    InputRow,
    ErrorRow,
    ErrorMessage,
    Label,
    InputId,
    InputPassword,
    LoginButton,
    LoginLogoImage,
    RememberID,
    RememberIdInput,
    RememberIdLabel,
} = LoginPageStyle

export default function LoginForm() {
    const navigate = useNavigate()
    const inputPasswordRef = useRef<HTMLInputElement | null>(null)
    const { handleAttemptLogin } = useAuth()
    const [pageState, setPageState] = useState<{
        loginInfo: {
            usid: string
            pass: string
        }
        loginerror: boolean
        loginerrorMessage: string
        rememberme: boolean
    }>({
        loginInfo: {
            usid: '',
            pass: '',
        },
        loginerror: false,
        loginerrorMessage: ``,
        rememberme: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (pageState.loginerror) {
            setPageState(prevState => ({
                ...prevState,
                loginerror: false,
                loginerrorMessage: ``,
            }))
        }
        const { name, value } = e.target
        setPageState(prev => ({
            ...prev,
            loginInfo: {
                ...prev.loginInfo,
                [name]: value,
            },
        }))
    }

    const handleLogin = async () => {
        if (isEmpty(pageState.loginInfo.usid)) {
            setPageState(prevState => ({
                ...prevState,
                loginerror: true,
                loginerrorMessage: '아이디를 입력해 주세요',
            }))
            return
        }

        if (isEmpty(pageState.loginInfo.pass)) {
            setPageState(prevState => ({
                ...prevState,
                loginerror: true,
                loginerrorMessage: '비밀번호를 입력해 주세요',
            }))
            return
        }

        const { status, error, errorMessage } = await handleAttemptLogin({
            usid: pageState.loginInfo.usid,
            pass: pageState.loginInfo.pass,
            rememberme: pageState.rememberme,
        })

        if (status) {
            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/member/member-list`,
            })
            return
        }

        if (!status && error) {
            // 로그인 싪패
            setPageState(prevState => ({
                ...prevState,
                loginerror: true,
                loginerrorMessage: errorMessage,
            }))

            return
        }
    }

    // 로그인 버튼 클릭.
    const handleClickLoginButton = () => {
        handleLogin().then()
    }

    // 엔터 이벤트 처리.
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return

        const targetName: string = (e.target as HTMLInputElement).name

        if (targetName === 'usid') {
            inputPasswordRef.current?.focus()
            return
        }

        if (targetName === 'pass') {
            handleLogin().then()
            return
        }
    }

    const handleRememberMeOnchange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageState(prevState => ({
            ...prevState,
            rememberme: e.target.checked,
        }))
        if (!e.target.checked) {
            storageMaster.remove('USID')
        }
    }

    useEffect(() => {
        // 아이디 기억체크.
        const funcCheckRememberMe = () => {
            const usid = storageManager.get('USID')
            if (!isEmpty(usid)) {
                setPageState(prevState => ({
                    ...prevState,
                    loginInfo: {
                        ...prevState.loginInfo,
                        usid: usid,
                    },
                    rememberme: true,
                }))
            }
        }

        funcCheckRememberMe()
    }, [])

    return (
        <Container bgImage={`${LoginBackgroundImage}`}>
            <Wapper>
                <LogoBox>
                    <LoginLogoImage src={LogoImage} alt="BioGram" />
                </LogoBox>
                <FormBox>
                    <FormRow>
                        <Label htmlFor="email">아이디</Label>
                        <InputId
                            type="email"
                            name="usid"
                            value={pageState.loginInfo.usid}
                            onChange={e => handleInputChange(e)}
                            onKeyUp={e => onEnter(e)}
                        />
                    </FormRow>
                    <FormRow>
                        <InputRow>
                            <Label htmlFor="password">비밀번호</Label>
                            <InputPassword
                                ref={inputPasswordRef}
                                type="password"
                                name="pass"
                                value={pageState.loginInfo.pass}
                                onChange={e => handleInputChange(e)}
                                onKeyUp={e => onEnter(e)}
                            />
                        </InputRow>
                        {pageState.loginerror && (
                            <ErrorRow>
                                <ErrorMessage>
                                    {pageState.loginerrorMessage}
                                </ErrorMessage>
                            </ErrorRow>
                        )}
                        <InputRow className="mt-6">
                            <LoginButton
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </LoginButton>
                        </InputRow>
                        <InputRow>
                            <RememberID>
                                <RememberIdInput
                                    checked={pageState.rememberme}
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value=""
                                    onChange={e => handleRememberMeOnchange(e)}
                                />
                                <RememberIdLabel htmlFor="checked-checkbox">
                                    아이디 기억
                                </RememberIdLabel>
                            </RememberID>
                        </InputRow>
                    </FormRow>
                </FormBox>
            </Wapper>
        </Container>
    )
}
