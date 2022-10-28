import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@Service/AuthService'
import { storageManager } from '@Helper'
import { LoginBackgroundImage, LogoImage } from '@Assets'
import { LoginPageStyle } from '@Style/Pages/LoginPageStyles'

const {
    Container,
    Wapper,
    LogoBox,
    FormBox,
    FormRow,
    InputRow,
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
    const [loginInfo, setLoginInfo] = useState<{
        usid: string
        pass: string
    }>({
        usid: '',
        pass: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClickLoginButton = async () => {
        const response = await login({
            usid: loginInfo.usid,
            pass: loginInfo.pass,
            CLIENT_IP: `211.212.212.49`,
        })
        if (response.status) {
            storageManager.set('TOKEN_INFO', response.payload.TOKEN_INFO)
            storageManager.set('VTOKEN_INFO', response.payload.VTOKEN_INFO)
            navigate({
                pathname: process.env.PUBLIC_URL + `/manage/member/member-list`,
            })
        } else {
            console.debug(response.message, response.payload)
        }
    }

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
                            value={loginInfo.usid}
                            onChange={e => handleInputChange(e)}
                        />
                    </FormRow>
                    <FormRow>
                        <InputRow>
                            <Label htmlFor="password">비밀번호</Label>
                            <InputPassword
                                type="password"
                                name="pass"
                                value={loginInfo.pass}
                                onChange={e => handleInputChange(e)}
                            />
                        </InputRow>
                        <InputRow className="mt-6">
                            <LoginButton
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </LoginButton>
                        </InputRow>
                        <InputRow>
                            <RememberID>
                                <RememberIdInput
                                    checked
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value=""
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
