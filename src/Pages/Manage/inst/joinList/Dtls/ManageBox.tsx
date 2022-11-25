import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/MemberPageStyles'
import { DefaultManageButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const ManageBox = () => {
    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'승인'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'거절'}
                />
            </Buttons>
        </Wapper>
    )
}

export default ManageBox
