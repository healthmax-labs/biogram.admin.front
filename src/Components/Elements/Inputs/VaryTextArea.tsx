import React from 'react'
import { VaryLabelTextAreaStyle } from '@Style/Elements/InputStyles'

const { TextArea } = VaryLabelTextAreaStyle

const VaryTextArea = ({
    Rows,
    Placeholder,
    Value,
    HandleOnChange,
}: {
    Rows?: number
    Placeholder: string
    Value: string
    HandleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
    return (
        <TextArea
            rows={Rows}
            placeholder={Placeholder}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                HandleOnChange(e)
            }
            value={Value}
        />
    )
}

export default VaryTextArea
