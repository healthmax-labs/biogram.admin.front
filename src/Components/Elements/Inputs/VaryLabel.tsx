import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import { InputWidthType } from '@CommonTypes'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabel = ({
    LabelWidth,
    LabelName,
    Children,
}: {
    LabelWidth?: InputWidthType
    LabelName: string
    Children?: React.ReactNode
}) => {
    return (
        <Wapper>
            <InputLabel Width={LabelWidth ? LabelWidth : 'w212'}>
                {LabelName}
            </InputLabel>
            {Children ?? Children}
        </Wapper>
    )
}

export default VaryLabel
