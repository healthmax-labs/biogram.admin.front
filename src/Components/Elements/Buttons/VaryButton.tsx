import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'
import { BgColorType } from '@CommonTypes'

const { VaryButtonStyle } = ButtonStyle

const VaryButton = ({
    Name,
    HandleClick,
    BgColor,
}: {
    Name: string
    HandleClick: () => void
    BgColor?: BgColorType
}) => {
    return (
        <VaryButtonStyle
            bgColor={BgColor ? BgColor : `mDipBlue`}
            onClick={() => HandleClick()}>
            {Name}
        </VaryButtonStyle>
    )
}

export default VaryButton
