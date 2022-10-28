import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { DatePickerButton } = ButtonStyle

const InputButton = (
    {
        value,
        onClick,
    }: {
        value: string
        onClick: (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void
    },
    ref: any
) => (
    <DatePickerButton ref={ref} onClick={onClick}>
        {value}
    </DatePickerButton>
)

export default function DatepickerButton() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            dateFormat={`yyyy/MM/dd`}
            locale={ko}
            customInput={React.createElement(React.forwardRef(InputButton))}
        />
    )
}
