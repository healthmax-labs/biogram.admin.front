import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { ContentType, InputWidthType } from '@CommonTypes'
import { InputStyle } from '@Style/Elements/InputStyles'

const { DatePicker: Input } = InputStyle

const DefaultInput = (
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

const SearchInput = (
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

const VaryDatepickerInput = ({
    ContentsType = 'default',
    DateFormat,
    Value,
    CallBackReturn,
}: {
    ContentsType?: ContentType
    DateFormat?: string
    Value?: Date | null
    CallBackReturn?: (e: Date) => void
}) => {
    const [selectDate, setSelectDate] = useState(Value ? Value : new Date())

    useEffect(() => {
        if (Value && selectDate.getTime() !== Value?.getTime()) {
            setSelectDate(Value)
        }
    }, [Value, selectDate])

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
            dateFormat={
                ContentsType === 'search'
                    ? `yyyy/MM/dd`
                    : DateFormat
                    ? DateFormat
                    : `yyyy년 MM월 dd일`
            }
            locale={ko}
            customInput={
                ContentsType === 'search'
                    ? React.createElement(React.forwardRef(SearchInput))
                    : React.createElement(React.forwardRef(DefaultInput))
            }
        />
    )
}

export default VaryDatepickerInput
