import React, { useState, useEffect } from 'react'
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

const Datepicker = ({
    Value,
    CallBackReturn,
}: {
    Value?: Date | null
    CallBackReturn?: (e: Date) => void
}) => {
    const [selectDate, setSelectDate] = useState(new Date())

    useEffect(() => {
        if (Value) {
            setSelectDate(Value)
        }
    }, [Value])

    useEffect(() => {
        if (CallBackReturn && selectDate.getTime() !== Value?.getTime()) {
            CallBackReturn(selectDate)
        }

        // FIXME : 종속성에서 selectDate 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectDate])

    return (
        <DatePicker
            selected={selectDate}
            onChange={(date: any) => setSelectDate(date)}
            dateFormat={`yyyy/MM/dd`}
            locale={ko}
            customInput={React.createElement(React.forwardRef(CustomInput))}
        />
    )
}

export default Datepicker
