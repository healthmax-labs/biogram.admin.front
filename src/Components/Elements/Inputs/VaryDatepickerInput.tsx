import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { InputWidthType } from '@CommonTypes'

const CustomInput = (
    {
        value,
        onFocus,
        onChange,
        Width,
    }: {
        value: string
        Width?: InputWidthType
        onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    },
    ref: any
) => (
    <VaryInput
        Ref={ref}
        Width={Width ? Width : 'w64'}
        InputType={'text'}
        HandleOnChange={onChange}
        id={'id'}
        Placeholder={'생년월일'}
        Value={value}
        HandleOnFocus={onFocus}
    />
)

const VaryDatepickerInput = ({
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
            onChange={(date: Date) => setSelectDate(date)}
            dateFormat={`yyyy년 MM월 dd일`}
            locale={ko}
            customInput={React.createElement(React.forwardRef(CustomInput))}
        />
    )
}

export default VaryDatepickerInput
