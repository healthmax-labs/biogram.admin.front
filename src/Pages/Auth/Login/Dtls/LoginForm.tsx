import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storageManager, storageMaster } from '@Helper'
import { LoginBackgroundImage, LogoImage, SamsungLogoImage } from '@Assets'
import { LoginPageStyle } from '@Style/Pages/LoginPageStyles'
import { isEmpty } from 'lodash'
import { useAuth, useMainLayouts } from '@Hooks'
import { VarySelectBox } from '@Elements'
import { MainLayoutThemeType } from '@CommonTypes'
import { useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import Const from '@Const'

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
    GeonDaon,
} = LoginPageStyle

const LoginForm = () => {
    const navigate = useNavigate()
    const { handleTheme } = useMainLayouts()
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
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)

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
        console.debug('handleLogin')
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
        console.debug('handleClickLoginButton')
        // handleLogin().then()
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
        <div className={`App ${mainLayoutState.Theme} font-sans`}>
            <Container
                bgImage={
                    mainLayoutState.Theme === 'GeonDaon'
                        ? ''
                        : `${LoginBackgroundImage}`
                }>
                {process.env.REACT_APP_ENV === 'development' && (
                    <div className={`flex px-3 pt-2`}>
                        <VarySelectBox
                            Placeholder="테마를 선택해 주세요"
                            HandleOnChange={e =>
                                handleTheme(e.value as MainLayoutThemeType)
                            }
                            Value={mainLayoutState.Theme}
                            Elements={Const.mainLayoutTheme.map(e => {
                                return {
                                    text: e.name,
                                    value: e.code,
                                }
                            })}
                        />
                    </div>
                )}
                <Wapper>
                    <LogoBox>
                        {(() => {
                            if (mainLayoutState.Theme === 'GeonDaon') {
                                return (
                                    <GeonDaon.Logo.Wapper>
                                        <GeonDaon.Logo.Row>
                                            <GeonDaon.Logo.TitleBold>
                                                건
                                            </GeonDaon.Logo.TitleBold>
                                            <GeonDaon.Logo.TitleNormal>
                                                다온
                                            </GeonDaon.Logo.TitleNormal>
                                        </GeonDaon.Logo.Row>
                                        <GeonDaon.Logo.Row>
                                            <GeonDaon.Logo.TitleLine></GeonDaon.Logo.TitleLine>
                                        </GeonDaon.Logo.Row>
                                        <GeonDaon.Logo.Row>
                                            <GeonDaon.Logo.TitleBold>
                                                건강
                                            </GeonDaon.Logo.TitleBold>
                                            <GeonDaon.Logo.TitleNormal>
                                                이 내게 다 오는
                                            </GeonDaon.Logo.TitleNormal>
                                        </GeonDaon.Logo.Row>
                                        <GeonDaon.Logo.Row>
                                            <GeonDaon.Logo.TitleBold>
                                                헬스케어 서비스
                                            </GeonDaon.Logo.TitleBold>
                                        </GeonDaon.Logo.Row>
                                    </GeonDaon.Logo.Wapper>
                                )
                            } else {
                                return <LoginLogoImage src={LogoImage} alt="" />
                            }
                        })()}
                    </LogoBox>
                    <FormBox onSubmit={e => e.preventDefault()}>
                        <FormRow>
                            <Label htmlFor="email">아이디</Label>
                            <InputId
                                type="text"
                                name="usid"
                                value={pageState.loginInfo.usid}
                                onChange={e => handleInputChange(e)}
                                onKeyUp={e => onEnter(e)}
                            />
                        </FormRow>
                        <FormRow>
                            <InputRow>
                                <Label htmlFor="pass">비밀번호</Label>
                                <InputPassword
                                    ref={inputPasswordRef}
                                    type="password"
                                    name="pass"
                                    autoComplete="off"
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
                            <InputRow>
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
                                        onChange={e =>
                                            handleRememberMeOnchange(e)
                                        }
                                    />
                                    <RememberIdLabel htmlFor="checked-checkbox">
                                        아이디 기억
                                    </RememberIdLabel>
                                </RememberID>
                            </InputRow>
                        </FormRow>
                    </FormBox>
                </Wapper>
                {mainLayoutState.Theme === 'GeonDaon' && (
                    <GeonDaon.BottomBox.Wapper>
                        <GeonDaon.BottomBox.LogoBox>
                            <img src={SamsungLogoImage} alt="logo" />
                        </GeonDaon.BottomBox.LogoBox>
                        <GeonDaon.BottomBox.TelBox>{`문의 : 1644-2810`}</GeonDaon.BottomBox.TelBox>
                    </GeonDaon.BottomBox.Wapper>
                )}
            </Container>
        </div>
    )
}

export default LoginForm
