import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

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
    <button
        className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-md mx-2"
        ref={ref}
        onClick={onClick}>
        {value}
    </button>
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
