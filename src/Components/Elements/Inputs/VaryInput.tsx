import React, { KeyboardEvent } from 'react'
import { InputWidthType } from '@CommonTypes'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, Input } = VaryInputStyle

const VaryInput = ({
    InputType,
    id,
    Placeholder,
    HandleOnChange,
    Value,
    HandleOnKeyDown,
    Width,
}: {
    InputType: string
    id?: string
    Placeholder: string
    Value: string
    Width?: InputWidthType
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
            <Input
                Width={Width ? Width : 'w60'}
                type={InputType}
                id={id ? id : 'search'}
                placeholder={Placeholder}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    HandleOnChange(e)
                }
                value={Value}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleOnKeyDown(e)
                }
            />
        </Wapper>
    )
}

export default VaryInput
