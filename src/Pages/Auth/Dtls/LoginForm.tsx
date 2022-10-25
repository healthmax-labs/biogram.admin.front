import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@Service/AuthService'
import { storageManager } from '@Helper'
import { LogoImage, LoginBackgroundImage } from '@Assets'

import {
    Container,
    Wapper,
    LogoBox,
    FormBox,
    FormRow,
    FormInputRow,
    InputLavel,
    InputId,
    InputPassword,
    LoginButton,
    LoginLogoImage,
} from '@Style/Pages/LoginPage'

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
            alert('로그인이 완료 되었습니다.')
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
                        <InputLavel htmlFor="email">아이디</InputLavel>
                        <InputId
                            type="email"
                            name="usid"
                            value={loginInfo.usid}
                            onChange={e => handleInputChange(e)}
                        />
                    </FormRow>
                    <FormRow>
                        <FormInputRow>
                            <InputLavel htmlFor="password">비밀번호</InputLavel>
                            <InputPassword
                                type="password"
                                name="pass"
                                value={loginInfo.pass}
                                onChange={e => handleInputChange(e)}
                            />
                        </FormInputRow>
                        <FormInputRow className="mt-6">
                            <LoginButton
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </LoginButton>
                        </FormInputRow>
                    </FormRow>
                </FormBox>
            </Wapper>
        </Container>
    )
}
