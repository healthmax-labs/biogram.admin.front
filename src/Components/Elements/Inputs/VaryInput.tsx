import React, { KeyboardEvent, useEffect } from 'react'
import { InputWidthType } from '@CommonTypes'
import { VaryInputStyle } from '@Style/Elements/InputStyles'
import { isEmpty } from 'lodash'

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
    InputType?: string
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

    useEffect(() => {
        console.debug(!isEmpty(Children) ?? Children)
    }, [Children])

    return (
        <Wapper>
            <Input
                readOnly={ReadOnly ? ReadOnly : false}
                ref={Ref}
                Width={Width ? Width : 'w60'}
                type={!isEmpty(InputType) ? InputType : 'text'}
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
            {!isEmpty(Children) ?? (
                <div className="flex flex-1 px-1">{Children}</div>
            )}
        </Wapper>
    )
}

export default VaryInput
