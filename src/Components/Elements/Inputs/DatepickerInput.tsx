import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { DatePickerInInput } from '@Style/Elements/Inputs'

const CustomInput = (
    {
        value,
        onFocus,
        onChange,
    }: {
        value: string
        onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    },
    ref: any
) => (
    <DatePickerInInput
        ref={ref}
        onFocus={onFocus}
        value={value}
        onChange={onChange}
    />
)

export default function DatepickerInput() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            dateFormat={`yyyy/MM/dd`}
            locale={ko}
            customInput={React.createElement(React.forwardRef(CustomInput))}
        />
    )
}
