import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hook/index'
import { useResetRecoilState } from 'recoil'
import { QnaDetailState } from '@Recoil/HelperPageState'

const { Wapper, Buttons } = ManageBoxStyle

const QnaManageBox = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()
    const qnaDetailStateReset = useResetRecoilState(QnaDetailState)

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        handleDeleteTabbyMatchRouter(
                            '/manage/helper/qna/:POST_ID/detail'
                        )

                        qnaDetailStateReset()

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
