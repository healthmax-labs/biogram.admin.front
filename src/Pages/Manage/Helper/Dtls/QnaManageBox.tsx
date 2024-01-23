import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'

const { Wapper, Buttons } = ManageBoxStyle

const QnaManageBox = () => {
    const navigate = useNavigate()
    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/helper/qna/new`,
                        })
                    }}
                    ButtonName={'등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default QnaManageBox
