import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import VaryCheckBox from './VaryCheckBox'
import { InputWidthType } from '@CommonTypes'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabelCheckBox = ({
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
    LabelWidth?: InputWidthType
    TextColor?: 'gray' | 'white'
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper Reverse={LabelReverse ? LabelReverse : false}>
            <VaryCheckBox
                Checked={Checked}
                HandleOnChange={e => HandleOnChange(e)}
            />
            <InputLabel
                Width={LabelWidth ?? LabelWidth}
                TextColor={TextColor ? TextColor : 'gray'}>
                {LabelName}
            </InputLabel>
        </Wapper>
    )
}

export default VaryLabelCheckBox
