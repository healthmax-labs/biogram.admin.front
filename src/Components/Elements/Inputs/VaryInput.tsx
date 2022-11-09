import React, { KeyboardEvent } from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper, Container, Input } = VaryInputStyle

const VaryInput = ({
    InputType,
    id,
    Placeholder,
    HandleOnChange,
    Value,
    HandleOnKeyDown,
}: {
    InputType: string
    id?: string
    Placeholder: string
    Value: string
    HandleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}) => {
    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (HandleOnKeyDown) {
            HandleOnKeyDown(event)
        }
    }

    return (
        <Container>
            <Wapper>
                <Input
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
        </Container>
    )
}

export default VaryInput
