import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import { WidthType } from '@CommonTypes'
import VaryRadioButton from './VaryRadioButton'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabelRadioButton = ({
    LabelName,
    LabelReverse,
    Checked,
    HandleOnChange,
    LabelWidth,
    TextColor,
}: {
    LabelName: string
    Checked: boolean
    LabelReverse?: boolean
    RedioName?: string
    LabelWidth?: WidthType
    InputWidth?: WidthType
    TextColor?: 'gray' | 'white'
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper Reverse={LabelReverse ? LabelReverse : false}>
            <VaryRadioButton
                HandleOnChange={e => HandleOnChange(e)}
                Checked={Checked}
            />
            <InputLabel
                Width={LabelWidth ?? LabelWidth}
                TextColor={TextColor ? TextColor : 'gray'}
                TextAlign={`left`}>
                {LabelName}
            </InputLabel>
        </Wapper>
    )
}

export default VaryLabelRadioButton
