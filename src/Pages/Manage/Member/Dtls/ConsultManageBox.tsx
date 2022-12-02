import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultManageButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const ConsultListMain = () => {
    return (
        <Wapper>
            <Buttons>
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
            </Buttons>
        </Wapper>
    )
}

export default ConsultListMain
