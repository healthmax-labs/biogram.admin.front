import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { Manage } = ButtonStyle

export default function DefaultManageButton({
    ButtonClick,
    ButtonName,
}: {
    ButtonClick: () => void
    ButtonName: string
}) {
    return <Manage onClick={() => ButtonClick()}>{ButtonName}</Manage>
}
