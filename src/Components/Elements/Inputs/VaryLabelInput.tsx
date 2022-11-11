import React, { KeyboardEvent } from 'react'
import { InputWidthType } from '@CommonTypes'
import { VaryLabelInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, InputLabel, Input } = VaryLabelInputStyle

const VaryLabelInput = ({
    InputType,
    LabelName,
    Placeholder,
    InputValue,
    HandleOnChange,
    HandleOnKeyDown,
    InputWidth,
}: {
    InputType?: string
    LabelName: string
    Placeholder?: string
    InputValue: string
    InputWidth?: InputWidthType
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}) => {
    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (HandleOnKeyDown) {
            HandleOnKeyDown(event)
        }
    }

    return (
        <Wapper>
            <InputLabel>{LabelName}</InputLabel>
            <Input
                Width={InputWidth ? InputWidth : 'w64'}
                type={InputType ? InputType : `text`}
                placeholder={Placeholder ? Placeholder : LabelName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
                }
                value={InputValue}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e)
                }
                required
            />
        </Wapper>
    )
}

export default VaryLabelInput
