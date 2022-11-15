import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { Wapper } = VaryInputStyle
const {
    VaryRadioButtonStyle: { Label, Input },
} = ButtonStyle

const VaryRadioButton = ({
    LabelName,
    Checked,
    HandleOnChange,
}: {
    LabelName: string
    Checked: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper>
            <Input
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
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

export default VaryRadioButton
