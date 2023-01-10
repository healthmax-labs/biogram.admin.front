import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'
import { BgColorType } from '@CommonTypes'

const {
    VaryButtonStyle: { Button },
} = ButtonStyle

const VaryButton = ({
    ButtonName,
    ButtonType,
    HandleClick,
    BgColor,
    Active,
}: {
    ButtonName: string
    Active?: boolean
    ButtonType: `button` | `info` | `manage`
    HandleClick: () => void
    BgColor?: BgColorType
}) => {
    return (
        <Button
            ButtonType={ButtonType}
            Active={Active ? Active : null}
            bgColor={BgColor ? BgColor : null}
            onClick={() => HandleClick()}>
            {ButtonName}
        </Button>
    )
}

export default VaryButton
