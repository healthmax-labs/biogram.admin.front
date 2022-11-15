import React, { KeyboardEvent } from 'react'
import { InputWidthType } from '@CommonTypes'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, Input } = VaryInputStyle

const VaryInput = ({
    Ref,
    InputType,
    id,
    Placeholder,
    HandleOnChange,
    Value,
    HandleOnKeyDown,
    Width,
    Required,
    Children,
    HandleOnFocus,
    Disabled,
    ReadOnly,
}: {
    Ref?: any
    InputType: string
    Placeholder: string
    Value: string
    id?: string
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    Width?: InputWidthType
    Required?: boolean
    Children?: React.ReactNode
    HandleOnFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void
    Disabled?: boolean
    ReadOnly?: boolean
}) => {
    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (HandleOnKeyDown) {
            HandleOnKeyDown(event)
        }
    }

    return (
        <Wapper>
            <Input
                readOnly={ReadOnly ? ReadOnly : false}
                ref={Ref}
                Width={Width ? Width : 'w60'}
                type={InputType}
                id={id ? id : 'search'}
                placeholder={Placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
                }
                value={Value}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e)
                }
                required={Required ? Required : false}
                onFocus={HandleOnFocus}
                disabled={Disabled ? Disabled : false}
                Disabled={Disabled ? Disabled : false}
            />
            {Children ?? <div className="flex flex-1 px-10">{Children}</div>}
        </Wapper>
    )
}

export default VaryInput
