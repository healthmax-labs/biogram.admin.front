import React from 'react'
import { InputStyle } from '@Style/Elements/InputStyles'

const { CheckBox } = InputStyle

export default function DefaultCheckBox() {
    return (
        <CheckBox
            checked={false}
            id="checked-checkbox"
            type="checkbox"
            value=""
        />
    )
}
