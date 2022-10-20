import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@Service/AuthService'
import { storageManager } from '@Helper'

import logo from 'Assets/Images/logo.svg'

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
        <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <section className="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
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
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                onClick={() => handleClickLoginButton()}>
                                로그인
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
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
