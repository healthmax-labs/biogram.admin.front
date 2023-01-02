import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultManageButton } from '@Elements'
import { useNavigate } from 'react-router-dom'

const { Wapper, Buttons } = ManageBoxStyle

const ManageBox = () => {
    const navigate = useNavigate()
    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => {
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/manager/notice/new`,
                        })
                    }}
                    ButtonName={'게시물 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default ManageBox
