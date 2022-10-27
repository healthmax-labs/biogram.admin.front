import React from 'react'
import { Buttons } from '@Style/Elements/ButtonStyle'

export default function DefaultManageButton({
    ButtonClick,
    ButtonName,
}: {
    ButtonClick: () => void
    ButtonName: string
}) {
    return (
        <Buttons.Manage onClick={() => ButtonClick()}>
            {ButtonName}
        </Buttons.Manage>
    )
}
