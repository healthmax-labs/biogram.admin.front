import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@Service/AuthService'
import { storageManager } from '@Helper'

import logo from '@Assets/Images/logo.svg'

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
                pathname:
                    process.env.PUBLIC_URL + `/manage/belong/belong-manage`,
            })
        } else {
            console.debug(response.message, response.payload)
        }
    }

    return (
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
            <section className="m-auto w-full rounded border-t border-purple-600 bg-white p-6 shadow-lg shadow-purple-800/50 lg:max-w-md">
                <div className="grid place-items-center">
                    <img src={logo} alt="BioGram" />
                </div>

                <div className="mt-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-800">
                            아이디
                        </label>
                        <input
                            type="email"
                            className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                            name="usid"
                            value={loginInfo.usid}
                            onChange={e => handleInputChange(e)}
                        />
                    </div>
                    <div className="mt-4">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm text-gray-800">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                                name="pass"
                                value={loginInfo.pass}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-gray-600 hover:underline">
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button
                                className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-center text-xs font-light text-gray-700">
                    Don't have an account?
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </section>
        </section>
    )
}
