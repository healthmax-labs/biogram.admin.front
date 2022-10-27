import React from 'react'
import { Members } from '@Style/Pages/MemberPageStyles'
import { DefaultManageButton } from '@Element/Buttons'

export default function ManageBox() {
    return (
        <Members.ManageBox.Wapper>
            <Members.ManageBox.Buttons>
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인1'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인2'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인3'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인4'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인5'}
                />
                <DefaultManageButton
                    ButtonClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인6'}
                />
            </Members.ManageBox.Buttons>
        </Members.ManageBox.Wapper>
    )
}
