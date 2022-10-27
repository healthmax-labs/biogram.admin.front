import React from 'react'
import { ManageBoxButtons, ManageBoxWapper } from '@Style/Pages/PublishPage'
import { DefaultManageButton } from '@Element/Buttons'

export default function ManageBox() {
    return (
        <ManageBoxWapper>
            <ManageBoxButtons>
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
            </ManageBoxButtons>
        </ManageBoxWapper>
    )
}
