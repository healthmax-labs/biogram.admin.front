import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'
import { useNavigate } from 'react-router-dom'

const { Wapper, Buttons } = ManageBoxStyle

const MagazineListManageBox = () => {
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
                                `/manage/contents/magazine-list/new`,
                        })
                    }}
                    ButtonName={'매거진 신규 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default MagazineListManageBox
