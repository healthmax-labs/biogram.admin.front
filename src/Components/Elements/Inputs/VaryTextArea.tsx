import React from 'react'
import { VaryLabelTextAreaStyle } from '@Style/Elements/InputStyles'

const { TextArea } = VaryLabelTextAreaStyle

const VaryTextArea = ({
    Rows,
    Placeholder,
    Value,
    HandleOnChange,
    ReadOnly,
}: {
    Rows?: number
    Placeholder: string
    Value: string
    ReadOnly?: boolean
    HandleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
    return (
        <TextArea
            rows={Rows}
            placeholder={Placeholder}
            readOnly={ReadOnly}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                HandleOnChange(e)
            }
            value={Value}
        />
    )
}

export default VaryTextArea
