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
}: {
    LabelWidth?: WidthType
    LabelName: string
    Children?: React.ReactNode
    TextColor?: TextColorType
    TextAlign?: TextAlignType
}) => {
    return (
        <Wapper Reverse={false}>
            <InputLabel
                Width={LabelWidth ? LabelWidth : 'w16'}
                TextColor={TextColor ? TextColor : 'gray'}
                TextAlign={TextAlign ? TextAlign : 'right'}>
                {LabelName}
            </InputLabel>
            {Children ?? Children}
        </Wapper>
    )
}

export default VaryLabel
