import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, RadioButton } = VaryInputStyle

const VaryRadioButton = ({
    Checked,
    HandleOnChange,
    Id,
    Name,
}: {
    Checked: boolean
    Id: string
    Name: string
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper>
            <RadioButton
                type="radio"
                checked={Checked}
                id={Id}
                name={Name}
                onChange={e => HandleOnChange(e)}
            />
        </Wapper>
    )
}

export default VaryRadioButton
