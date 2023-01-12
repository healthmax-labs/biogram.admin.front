import React, { KeyboardEvent } from 'react'
import { ContentType, WidthType } from '@CommonTypes'
import { VaryInputStyle } from '@Style/Elements/InputStyles'
import { isEmpty } from 'lodash'

const { Wapper, Input } = VaryInputStyle

const VaryInput = ({
    ContentsType = 'default',
    Disabled,
    ReadOnly,
    Ref,
    InputType,
    id,
    Name,
    Placeholder,
    HandleOnChange,
    Value,
    HandleOnKeyDown,
    Width,
    Required,
    Children,
    HandleOnFocus,
}: {
    ContentsType?: ContentType
    Ref?: any
    InputType?: string
    Placeholder?: string
    Value: string | number
    id?: string
    Name?: string
    HandleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    Width?: WidthType | null
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
        <Wapper Width={Width ? Width : null} Flex={!!Children}>
            <Input
                ContentsType={ContentsType ? ContentsType : 'default'}
                Disabled={Disabled ? Disabled : false}
                disabled={Disabled ? Disabled : false}
                readOnly={ReadOnly ? ReadOnly : false}
                ref={Ref}
                type={!isEmpty(InputType) ? InputType : 'text'}
                id={id ? id : 'search'}
                name={Name ? Name : 'input'}
                placeholder={Placeholder ? Placeholder : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange ? HandleOnChange(e) : ''
                }
                value={Value}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e)
                }
                required={Required ? Required : false}
                onFocus={HandleOnFocus}
            />
            {Children ?? <div className="flex flex-1 px-1">{Children}</div>}
        </Wapper>
    )
}

export default VaryInput
