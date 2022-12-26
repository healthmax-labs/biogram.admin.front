import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { Wapper } = VaryInputStyle
const {
    VaryRadioButtonStyle: { Label, Input },
} = ButtonStyle

const VaryLabelRadioButton = ({
    LabelName,
    RadioId,
    RedioName,
    Checked,
    HandleOnChange,
}: {
    LabelName: string
    RadioId?: string
    RedioName?: string
    Checked: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper>
            <Input
                type="radio"
                name={RedioName ? RedioName : 'defaultRadio'}
                id={RadioId ? RadioId : 'defaultRadio'}
                checked={Checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
                }
            />
            <Label
                className="form-check-label inline-block text-gray-800 text-xs"
                htmlFor="flexRadioDefault2">
                {LabelName}
            </Label>
        </Wapper>
    )
}

export default VaryLabelRadioButton
