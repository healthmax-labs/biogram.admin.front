import React from 'react'
import { InputStyle } from '@Style/Elements/InputStyles'

const { CheckBox } = InputStyle

const DefaultCheckBox = () => {
    const handleTempOnChange = () => {
        //
    }
    return (
        <CheckBox
            checked={false}
            id="checked-checkbox"
            type="checkbox"
            value=""
            onChange={() => handleTempOnChange()}
        />
    )
}

export default DefaultCheckBox
