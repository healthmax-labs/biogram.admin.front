import React from 'react'
import { VaryLabelStyle } from '@Style/Elements/InputStyles'
import VaryCheckBox from './VaryCheckBox'
import { InputWidthType } from '@CommonTypes'

const { Wapper, InputLabel } = VaryLabelStyle

const VaryLabelCheckBox = ({
    LabelName,
    Checked,
    HandleOnChange,
    LabelWidth,
}: {
    LabelName: string
    Checked: boolean
    LabelWidth?: InputWidthType
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper>
            <VaryCheckBox
                Checked={Checked}
                HandleOnChange={e => HandleOnChange(e)}
            />
            <InputLabel Width={LabelWidth ?? LabelWidth}>
                {LabelName}
            </InputLabel>
        </Wapper>
    )
}

export default VaryLabelCheckBox
