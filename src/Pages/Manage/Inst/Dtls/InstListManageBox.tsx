import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'

const { Wapper, Buttons } = ManageBoxStyle

const InstListManageBox = () => {
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
