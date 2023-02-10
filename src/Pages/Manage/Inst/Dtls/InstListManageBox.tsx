import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'
import { useTab } from '@Hooks'

const { Wapper, Buttons } = ManageBoxStyle

const InstListManageBox = () => {
    const navigate = useNavigate()
    const { handleDeleteTabbyMatchRouter } = useTab()

    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        // 상세 tab 리셋처리
                        handleDeleteTabbyMatchRouter(
                            '/manage/inst/inst-list/:instNo/detail'
                        )

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/inst/inst-list/new`,
                        })
                    }}
                    ButtonName={'소속 신규 등록'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => {
                        //
                    }}
                    ButtonName={'엑셀내려받기'}
                />
            </Buttons>
        </Wapper>
    )
}

export default InstListManageBox
