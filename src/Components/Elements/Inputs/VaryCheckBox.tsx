import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, CheckBox } = VaryInputStyle

const VaryCheckBox = ({
    Checked,
    HandleOnChange,
    Id,
    Name,
    Flex,
}: {
    Id?: string
    Name?: string
    Checked: boolean
    Flex: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper Flex={Flex}>
            <CheckBox
                checked={Checked}
                id={Id ? Id : `checked-checkbox`}
                name={Name ? Name : `checked-checkbox`}
                type="checkbox"
                onChange={e => HandleOnChange(e)}
            />
        </Wapper>
    )
}

export default VaryCheckBox
