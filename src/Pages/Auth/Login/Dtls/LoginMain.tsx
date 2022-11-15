import React, { useEffect } from 'react'
import LoginForm from './LoginForm'
import { useAuth } from '@Hook/index'
import { useNavigate } from 'react-router-dom'

const LoginMain = () => {
    const navigate = useNavigate()
    const { handleLoginCheck } = useAuth()

    useEffect(() => {
        const funcCheckLogin = async () => {
            const task = handleLoginCheck()
            if (task) {
                navigate({
                    pathname:
                        process.env.PUBLIC_URL + `/manage/member/member-list`,
                })
            }
        }

        funcCheckLogin().then()
    }, [handleLoginCheck, navigate])
    return <LoginForm />
}

export default LoginMain
