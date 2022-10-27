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
        className="form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
        ref={ref}
        onFocus={onFocus}
        value={value}
        onChange={onChange}
    />
)
// const CustomInput = (
//     props: React.HTMLProps<HTMLInputElement>,
//     ref: React.Ref<HTMLInputElement>
// ) => {
//     return (
//         <input
//             className="form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
//             {...props}
//             ref={ref}
//         />
//     )
// }

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
