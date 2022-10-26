import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { DatePickerInbutton } from '@Style/Elements/Buttons'
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
    <DatePickerInbutton ref={ref} onClick={onClick}>
        {value}
    </DatePickerInbutton>
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
