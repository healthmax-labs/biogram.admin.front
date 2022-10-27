import React from 'react'
import { Inputs } from '@Style/Elements/InputStyles'

export default function DefaultCheckBox() {
    return (
        <Inputs.CheckBox
            checked={false}
            id="checked-checkbox"
            type="checkbox"
            value=""
        />
    )
}
