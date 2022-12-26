import React, { KeyboardEvent } from 'react'
import { ContentType, InputBgColorType, InputWidthType } from '@CommonTypes'
import { VaryInputStyle } from '@Style/Elements/InputStyles'
import { isEmpty } from 'lodash'

const { Wapper, Input } = VaryInputStyle

const VaryInput = ({
    ContentsType = 'default',
    Bg,
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
    Disabled,
    ReadOnly,
}: {
    ContentsType?: ContentType
    Bg?: InputBgColorType
    Ref?: any
    InputType?: string
    Placeholder?: string
    Value: string | number
    id?: string
    Name?: string
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    Width?: InputWidthType | null
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
                Bg={Bg ?? Bg}
                ContentsType={ContentsType ? ContentsType : 'default'}
                Width={Width ? Width : null}
                Disabled={Disabled ? Disabled : false}
                disabled={Disabled ? Disabled : false}
                readOnly={ReadOnly ? ReadOnly : false}
                ref={Ref}
                type={!isEmpty(InputType) ? InputType : 'text'}
                id={id ? id : 'search'}
                name={Name ? Name : 'input'}
                placeholder={Placeholder ? Placeholder : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
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
