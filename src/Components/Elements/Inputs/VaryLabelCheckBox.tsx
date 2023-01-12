import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import VaryCheckBox from './VaryCheckBox'
import { TextColorType, WidthType } from '@CommonTypes'
import { VaryLabel } from '@Elements'

const { Wapper } = VaryLabelStyle

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
    LabelWidth?: WidthType
    TextColor?: TextColorType
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <>
            <Wapper Reverse={LabelReverse ? LabelReverse : false}>
                <VaryCheckBox
                    Checked={Checked}
                    HandleOnChange={e => HandleOnChange(e)}
                />
                <VaryLabel
                    LabelName={LabelName}
                    LabelWidth={LabelWidth}
                    TextColor={TextColor ? TextColor : 'gray'}
                    TextAlign={`left`}
                />
            </Wapper>
        </>
    )
}

export default VaryLabelCheckBox
