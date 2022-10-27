import React from 'react'
import { CheckBoxInput } from '@Style/Elements/Inputs'

export default function DefaultCheckBox() {
    return (
        <CheckBoxInput
            checked={false}
            id="checked-checkbox"
            type="checkbox"
            value=""
        />
    )
}
