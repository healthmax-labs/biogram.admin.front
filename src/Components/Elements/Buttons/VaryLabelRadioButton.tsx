import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import { InputWidthType } from '@CommonTypes'
import VaryRadioButton from './VaryRadioButton'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabelRadioButton = ({
    LabelName,
    LabelReverse,
    Checked,
    HandleOnChange,
    LabelWidth,
    TextColor,
    Id,
    Name,
}: {
    LabelName: string
    Id?: string
    Name?: string
    Checked: boolean
    LabelReverse?: boolean
    RedioName?: string
    LabelWidth?: InputWidthType
    InputWidth?: InputWidthType
    TextColor?: 'gray' | 'white'
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper Reverse={LabelReverse ? LabelReverse : false}>
            <VaryRadioButton
                HandleOnChange={e => HandleOnChange(e)}
                Id={Id ? Id : 'vary-radio-button'}
                Name={Name ? Name : 'vary-radio-button'}
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
