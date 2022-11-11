import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { VaryButtonStyle } = ButtonStyle

const VaryButton = ({
    Name,
    HandleClick,
}: {
    Name: string
    HandleClick: () => void
}) => {
    return (
        <VaryButtonStyle onClick={() => HandleClick()}>{Name}</VaryButtonStyle>
    )
}

export default VaryButton
