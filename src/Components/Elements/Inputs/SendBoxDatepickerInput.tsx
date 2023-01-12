import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { WidthType } from '@CommonTypes'

const DefaultInput = (
    {
        value,
        onFocus,
        onChange,
    }: {
        value: string
        Width?: WidthType
        onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    },
    ref: any
) => (
    <VaryInput
        Ref={ref}
        InputType={'text'}
        HandleOnChange={onChange}
        id={'id'}
        Placeholder={'생년월일'}
        Value={value}
        HandleOnFocus={onFocus}
    />
)

const SendBoxDatepickerInput = ({
    Value,
    DateFormat,
    CallBackReturn,
}: {
    Value?: Date | null
    DateFormat?: string
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
            dateFormat={DateFormat ? DateFormat : `yyyy/MM/dd`}
            locale={ko}
            customInput={React.createElement(React.forwardRef(DefaultInput))}
        />
    )
}

export default SendBoxDatepickerInput
