import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@Service/AuthService'
import { storageManager } from '@Helper'
import { LoginBackgroundImage, LogoImage } from '@Assets'

import { LoginPage } from '@Style/Pages/LoginPageStyles'

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
        <LoginPage.Container bgImage={`${LoginBackgroundImage}`}>
            <LoginPage.Wapper>
                <LoginPage.LogoBox>
                    <LoginPage.LoginLogoImage src={LogoImage} alt="BioGram" />
                </LoginPage.LogoBox>
                <LoginPage.FormBox>
                    <LoginPage.FormRow>
                        <LoginPage.Label htmlFor="email">
                            아이디
                        </LoginPage.Label>
                        <LoginPage.InputId
                            type="email"
                            name="usid"
                            value={loginInfo.usid}
                            onChange={e => handleInputChange(e)}
                        />
                    </LoginPage.FormRow>
                    <LoginPage.FormRow>
                        <LoginPage.InputRow>
                            <LoginPage.Label htmlFor="password">
                                비밀번호
                            </LoginPage.Label>
                            <LoginPage.InputPassword
                                type="password"
                                name="pass"
                                value={loginInfo.pass}
                                onChange={e => handleInputChange(e)}
                            />
                        </LoginPage.InputRow>
                        <LoginPage.InputRow className="mt-6">
                            <LoginPage.LoginButton
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </LoginPage.LoginButton>
                        </LoginPage.InputRow>
                        <LoginPage.InputRow>
                            <LoginPage.RememberID>
                                <LoginPage.RememberIdInput
                                    checked
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value=""
                                />
                                <LoginPage.RememberIdLabel htmlFor="checked-checkbox">
                                    아이디 기억
                                </LoginPage.RememberIdLabel>
                            </LoginPage.RememberID>
                        </LoginPage.InputRow>
                    </LoginPage.FormRow>
                </LoginPage.FormBox>
            </LoginPage.Wapper>
        </LoginPage.Container>
    )
}
