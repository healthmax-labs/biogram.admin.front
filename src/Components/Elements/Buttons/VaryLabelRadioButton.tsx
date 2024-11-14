import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import { WidthType } from '@CommonTypes'
import VaryRadioButton from './VaryRadioButton'
import { VaryLabel } from '@Element/index'

const { Wapper } = VaryLabelStyle

const VaryLabelRadioButton = ({
    LabelName,
    LabelReverse,
    Checked,
    HandleOnChange,
    LabelWidth,
    TextColor,
    LabelClick,
}: {
    LabelName: string
    Checked: boolean
    LabelReverse?: boolean
    RedioName?: string
    LabelWidth?: WidthType
    InputWidth?: WidthType
    TextColor?: 'gray' | 'white'
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    LabelClick?: () => void
}) => {
    return (
        <Wapper Reverse={LabelReverse ? LabelReverse : false}>
            <VaryRadioButton
                Flex={true}
                HandleOnChange={e => HandleOnChange(e)}
                Checked={Checked}
            />
            <VaryLabel
                LabelName={LabelName}
                LabelWidth={LabelWidth}
                TextColor={TextColor ? TextColor : 'gray'}
                TextAlign={`left`}
                LabelClick={LabelClick}
            />
        </Wapper>
    )
}

export default VaryLabelRadioButton
