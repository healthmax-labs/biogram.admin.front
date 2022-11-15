import React, { KeyboardEvent } from 'react'
import { InputWidthType } from '@CommonTypes'
import { VaryInput } from '@Elements'
import { VaryLabelInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, InputLabel } = VaryLabelInputStyle

const VaryLabelInput = ({
    InputType,
    LabelName,
    Placeholder,
    InputValue,
    HandleOnChange,
    HandleOnKeyDown,
    InputWidth,
    Required,
}: {
    InputType?: string
    LabelName: string
    Placeholder?: string
    InputValue: string
    InputWidth?: InputWidthType
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    Required?: boolean
}) => {
    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (HandleOnKeyDown) {
            HandleOnKeyDown(event)
        }
    }

    return (
        <Wapper>
            <InputLabel>{LabelName}</InputLabel>
            <VaryInput
                Width={InputWidth ? InputWidth : 'w64'}
                InputType={InputType ? InputType : `text`}
                Placeholder={Placeholder ? Placeholder : LabelName}
                HandleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
                }
                Value={InputValue}
                HandleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e)
                }
                Required={Required ? Required : false}
            />
        </Wapper>
    )
}

export default VaryLabelInput
