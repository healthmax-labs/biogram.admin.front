import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { ContentType } from '@CommonTypes'
import { InputStyle } from '@Style/Elements/InputStyles'

const { DatePicker: Input } = InputStyle

const DefaultInput = (
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
    const [dateFormat, setDateFormat] = useState(`yyyy/MM/dd`)

    useEffect(() => {
        if (Value && selectDate.getTime() !== Value?.getTime()) {
            setSelectDate(Value)
        }
        // FIXME : 종속성에서 selectDate 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Value])

    useEffect(() => {
        if (CallBackReturn && selectDate.getTime() !== Value?.getTime()) {
            CallBackReturn(selectDate)
        }

        // FIXME : 종속성에서 selectDate 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectDate])

    useEffect(() => {
        if (ContentsType === 'search') {
            return
        }

        if (ContentsType === 'default') {
            if (DateFormat) {
                setDateFormat(DateFormat)
            } else {
                setDateFormat(`yyyy년 MM월 dd일`)
            }
        }

        if (ContentsType === 'time') {
            if (DateFormat) {
                setDateFormat(DateFormat)
            } else {
                setDateFormat(`h:mm`)
            }
        }
    }, [ContentsType, DateFormat])

    return (
        <DatePicker
            selected={selectDate}
            onChange={(date: Date) => setSelectDate(date)}
            dateFormat={dateFormat}
            locale={ko}
            showTimeSelect={ContentsType === 'time'}
            showTimeSelectOnly={ContentsType === 'time'}
            timeIntervals={ContentsType === 'time' ? 1 : 15}
            timeCaption={ContentsType === 'time' ? '시간' : ''}
            customInput={
                ContentsType === 'search'
                    ? React.createElement(React.forwardRef(SearchInput))
                    : React.createElement(React.forwardRef(DefaultInput))
            }
        />
    )
}

export default VaryDatepickerInput
