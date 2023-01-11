import React from 'react'
import { ManageBoxStyle } from '@Style/Pages/CommonStyle'
import { VaryButton } from '@Elements'

const { Wapper, Buttons } = ManageBoxStyle

const ConsultListMain = () => {
    return (
        <Wapper>
            <Buttons>
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인1'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인2'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인3'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인4'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인5'}
                />
                <VaryButton
                    ButtonType={'manage'}
                    HandleClick={() => console.debug('DefaultManageButton')}
                    ButtonName={'소승승인6'}
                />
            </Buttons>
        </Wapper>
    )
}

export default ConsultListMain
