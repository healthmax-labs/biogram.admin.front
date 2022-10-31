import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { InputStyle } from '@Style/Elements/InputStyles'

const { DatePicker: Input } = InputStyle

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
) => <Input ref={ref} onFocus={onFocus} value={value} onChange={onChange} />

export default function Datepicker() {
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
