import React from 'react'
import { DefaultButton } from '@Style/Elements/Buttons'

export default function DefaultManageButton({
    ButtonClick,
    ButtonName,
}: {
    ButtonClick: () => void
    ButtonName: string
}) {
    return (
        <DefaultButton onClick={() => ButtonClick()}>
            {ButtonName}
        </DefaultButton>
    )
}
