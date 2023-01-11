import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const ManageBox = () => {
    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'엑셀 다운로드'}
                />
            </Buttons>
        </Wapper>
    )
}

export default ManageBox
