import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const MemberListManageBox = () => {
    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'신규회원등록'}
                />
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'회원 탈퇴'}
                />
                <VaryButton
                    ButtonType={`manage`}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'엑셀내려받기'}
                />
            </Buttons>
        </Wapper>
    )
}

export default MemberListManageBox
