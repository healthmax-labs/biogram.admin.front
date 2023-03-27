import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { ContentType, DatePickerShowType, WidthType } from '@CommonTypes'
import { InputStyle } from '@Style/Elements/InputStyles'
import { changeDatePickerDate, getOnlyNumber } from '@Helper'

const { DatePickerWapper } = InputStyle

const DefaultInput = (
    {
        value,
        onFocus,
        onChange,
        readOnly,
    }: {
        value: string
        onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        readOnly: boolean
    },
    ref: any
) => {
    return (
        <VaryInput
            ReadOnly={readOnly}
            Disabled={readOnly}
            Ref={ref}
            InputType={'text'}
            HandleOnChange={onChange}
            id={'id'}
            Placeholder={'날짜선택'}
            Value={value}
            HandleOnFocus={onFocus}
        />
    )
}

const SearchInput = (
    {
        value,
        onFocus,
        onChange,
        onKeyDown,
        onBlur,
        readOnly,
    }: {
        value: string
        onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
        onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void
        readOnly: boolean
    },
    ref: any
) => {
    return (
        <VaryInput
            ReadOnly={readOnly}
            ContentsType={`search`}
            Ref={ref}
            HandleOnFocus={onFocus}
            Value={value}
            Placeholder={'날짜선택'}
            HandleOnChange={onChange}
            HandleOnKeyDown={onKeyDown}
            HandleOnBlur={onBlur}
        />
    )
}

const VaryDatepickerInput = ({
    ShowType,
    InputeType = 'default',
    DateFormat,
    Value,
    CallBackReturn,
    Width,
    ReadOnly,
}: {
    ShowType?: DatePickerShowType
    InputeType: ContentType
    Width?: WidthType
    DateFormat?: string
    Value?: Date | null
    CallBackReturn?: (e: Date) => void
    ReadOnly?: boolean
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
                readOnly={ReadOnly ? ReadOnly : false}
                disabled={ReadOnly ? ReadOnly : false}
                selected={selectDate}
                onSelect={(date: Date) => {
                    setSelectDate(date)
                }}
                onChange={e => {
                    if (ShowType === 'time') {
                        setSelectDate(e as Date)
                    }
                }}
                onBlur={e => {
                    setSelectDate(
                        changeDatePickerDate(
                            getOnlyNumber(e.target.value)
                        ) as Date
                    )
                }}
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
