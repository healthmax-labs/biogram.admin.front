import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultManageButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const UhealthzoneListManageBox = () => {
    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'바이오그램 존 신규 등록'}
                />
            </Buttons>
        </Wapper>
    )
}

export default UhealthzoneListManageBox
