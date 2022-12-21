import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultManageButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const UhealthzoneListManageBox = () => {
    const navigate = useNavigate()
    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => {
                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/contents/uhealthzone/new`,
                        })
                    }}
                    ButtonName={'바이오그램 존 신규 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default UhealthzoneListManageBox
