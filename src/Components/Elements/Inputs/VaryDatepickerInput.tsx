import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { ContentType, DatePickerShowType, WidthType } from '@CommonTypes'
import { InputStyle } from '@Style/Elements/InputStyles'

const { DatePickerWapper } = InputStyle

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
) => (
    <VaryInput
        ContentsType={`search`}
        Ref={ref}
        HandleOnFocus={onFocus}
        Value={value}
        HandleOnChange={onChange}
    />
)

const VaryDatepickerInput = ({
    ShowType,
    InputeType = 'default',
    DateFormat,
    Value,
    CallBackReturn,
    Width,
}: {
    ShowType?: DatePickerShowType
    InputeType: ContentType
    Width?: WidthType
    DateFormat?: string
    Value?: Date | null
    CallBackReturn?: (e: Date) => void
}) => {
    const [selectDate, setSelectDate] = useState(Value ? Value : new Date())
    const [dateFormat, setDateFormat] = useState(`yyyy년 MM월 dd일`)

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
        if (DateFormat) {
            setDateFormat(DateFormat)
        }
    }, [DateFormat])

    return (
        <DatePickerWapper Width={Width ? Width : `full`}>
            <DatePicker
                selected={selectDate}
                onChange={(date: Date) => setSelectDate(date)}
                dateFormat={dateFormat}
                locale={ko}
                todayButton={true}
                showMonthYearPicker={ShowType === 'year, month'}
                showTimeSelect={ShowType === 'time'}
                showTimeSelectOnly={ShowType === 'time'}
                timeIntervals={ShowType === 'time' ? 1 : 15}
                timeCaption={ShowType === 'time' ? '시간' : ''}
                customInput={
                    InputeType === 'search'
                        ? React.createElement(React.forwardRef(SearchInput))
                        : React.createElement(React.forwardRef(DefaultInput))
                }
            />
        </DatePickerWapper>
    )
}

export default VaryDatepickerInput
