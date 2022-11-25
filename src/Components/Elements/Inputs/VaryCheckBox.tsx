import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, CheckBox } = VaryInputStyle

const VaryCheckBox = ({
    Checked,
    HandleOnChange,
}: {
    Checked: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Wapper>
            <CheckBox
                checked={Checked}
                id="checked-checkbox"
                type="checkbox"
                onChange={e => HandleOnChange(e)}
            />
        </Wapper>
    )
}

export default VaryCheckBox
