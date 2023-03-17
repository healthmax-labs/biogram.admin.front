import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import { TextAlignType, TextColorType, WidthType } from '@CommonTypes'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabel = ({
    LabelWidth,
    LabelName,
    Children,
    TextColor,
    TextAlign,
    LabelClick,
}: {
    LabelWidth?: WidthType
    LabelName: string
    Children?: React.ReactNode
    TextColor?: TextColorType
    TextAlign?: TextAlignType
    LabelClick?: () => void
}) => {
    return (
        <Wapper Reverse={false} onClick={LabelClick}>
            <InputLabel
                Width={LabelWidth ? LabelWidth : 'w16'}
                TextColor={TextColor ? TextColor : 'gray'}
                TextAlign={TextAlign ? TextAlign : 'right'}
                CursorPointer={!!LabelClick}>
                {LabelName}
            </InputLabel>
            {Children ?? Children}
        </Wapper>
    )
}

export default VaryLabel
