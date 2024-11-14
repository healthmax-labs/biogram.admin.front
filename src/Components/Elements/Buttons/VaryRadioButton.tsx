import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, RadioButton } = VaryInputStyle

const VaryRadioButton = ({
    Checked,
    HandleOnChange,
    Flex,
}: {
    Flex: boolean
    Checked: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper Flex={Flex}>
            <RadioButton
                type="radio"
                checked={Checked}
                onChange={e => HandleOnChange(e)}
            />
        </Wapper>
    )
}

export default VaryRadioButton
