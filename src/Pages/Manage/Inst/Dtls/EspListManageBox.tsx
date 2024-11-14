import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Element/index'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hook/index'
import { useResetRecoilState } from 'recoil'
import { EapDetailState } from '@Recoil/InstPagesState'

const { Wapper, Buttons } = ManageBoxStyle

const EspListManageBox = () => {
    const navigate = useNavigate()
    const eapDetailStateReset = useResetRecoilState(EapDetailState)
    const { handleDeleteTabbyMatchRouter } = useTab()

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        // 상세 tab 리셋처리
                        eapDetailStateReset()
                        handleDeleteTabbyMatchRouter(
                            '/manage/inst/eap-list/:eapNo/detail'
                        )

                        handleDeleteTabbyMatchRouter(
                            '/manage/inst/eap-list/new'
                        )

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/inst/eap-list/new`,
                        })
                    }}
                    ButtonName={'등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default EspListManageBox
