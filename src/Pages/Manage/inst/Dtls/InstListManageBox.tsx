import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultManageButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const InstListManageBox = () => {
    return (
        <Wapper>
            <Buttons>
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소속 신규 등록'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'엑셀내려받기'}
                />
            </Buttons>
        </Wapper>
    )
}

export default InstListManageBox
