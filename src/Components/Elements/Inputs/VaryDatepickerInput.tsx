import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import { VaryInput } from '@Elements'
import { ContentType, DatePickerShowType, WidthType } from '@CommonTypes'
import { InputStyle } from '@Style/Elements/InputStyles'
import {
    changeDatePickerDate,
    getOnlyNumber,
    gmtTimeToTimeObject,
} from '@Helper'

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
    PrevNextButton,
    MinDate,
    MaxDate,
    OnBlurPass,
}: {
    ShowType?: DatePickerShowType
    InputeType: ContentType
    Width?: WidthType
    DateFormat?: string
    Value?: Date | null
    CallBackReturn?: (e: Date) => void
    ReadOnly?: boolean
    PrevNextButton?: boolean
    MinDate?: Date | null
    MaxDate?: Date
    OnBlurPass?: boolean
}) => {
    const [selectDate, setSelectDate] = useState(Value ? Value : new Date())
    const [checkAfterDate, setCheckAfterDate] = useState<boolean>(false)
    const [dateFormat, setDateFormat] = useState(`yyyy년 MM월 dd일`)

    // 이전 버튼 클릭
    const handleClickPrevDate = () => {
        if (ShowType === 'year, month') {
            setSelectDate(
                new Date(
                    new Date(selectDate).setMonth(
                        new Date(selectDate).getMonth() - 1
                    )
                )
            )
            return
        }

        setSelectDate(
            new Date(
                new Date(selectDate).setDate(new Date(selectDate).getDate() - 1)
            )
        )
        return
    }

    // 다음 버튼 클릭
    const handleClickNextDate = () => {
        if (ShowType === 'year, month') {
            setSelectDate(
                new Date(
                    new Date(selectDate).setMonth(
                        new Date(selectDate).getMonth() + 1
                    )
                )
            )
            return
        }

        setSelectDate(
            new Date(
                new Date(selectDate).setDate(new Date(selectDate).getDate() + 1)
            )
        )
        return
    }

    useEffect(() => {
        if (Value && selectDate.getTime() !== Value?.getTime()) {
            setSelectDate(Value)
        }
        // FIXME : 종속성에서 selectDate 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Value])

    useEffect(() => {
        // 날짜가 오늘 보다 이후 날짜 인지체크
        const funcCheckAfterDate = () => {
            const checkNowDateObject = gmtTimeToTimeObject(new Date())
            const checkSelectDateObject = gmtTimeToTimeObject(selectDate)
            const checkSelectDate = Number(
                `${checkSelectDateObject.year}${checkSelectDateObject.monthPad}${checkSelectDateObject.dayPad}`
            )
            const checkNowDate = Number(
                `${checkNowDateObject.year}${checkNowDateObject.monthPad}${checkNowDateObject.dayPad}`
            )

            setCheckAfterDate(checkSelectDate >= checkNowDate)
        }

        if (CallBackReturn && selectDate.getTime() !== Value?.getTime()) {
            CallBackReturn(selectDate)
        }

        funcCheckAfterDate()

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
            {PrevNextButton && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleClickPrevDate()}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            )}

            <DatePicker
                readOnly={ReadOnly ? ReadOnly : false}
                disabled={ReadOnly ? ReadOnly : false}
                selected={selectDate}
                onSelect={(date: Date) => {
                    setSelectDate(date)
                }}
                onChange={(e: Date) => {
                    if (ShowType === 'time') {
                        setSelectDate(e)
                    }
                }}
                onChangeRaw={e => {
                    if (e.target.value) {
                        const changeDate = changeDatePickerDate(
                            getOnlyNumber(e.target.value)
                        ) as Date

                        if (MinDate && changeDate < MinDate) {
                            setSelectDate(MinDate)
                        }
                    }
                }}
                onBlur={e => {
                    if (OnBlurPass && OnBlurPass) {
                        return
                    }

                    let value = e.target.value

                    // 값이 "2024년 2월" 일경우 날짜 계산 오류로 인해 수정.
                    if (value.length === 9) {
                        value = `${value} 01일`
                    }

                    setSelectDate(
                        changeDatePickerDate(getOnlyNumber(value)) as Date
                    )
                }}
                dateFormat={dateFormat}
                locale={ko}
                todayButton={true}
                showMonthYearPicker={ShowType === 'year, month'}
                showTimeSelect={ShowType === 'time'}
                showTimeSelectOnly={ShowType === 'time'}
                timeIntervals={ShowType === 'time' ? 60 : 15}
                timeCaption={ShowType === 'time' ? '시간' : ''}
                customInput={
                    InputeType === 'search'
                        ? React.createElement(React.forwardRef(SearchInput))
                        : React.createElement(React.forwardRef(DefaultInput))
                }
                minDate={MinDate ?? MinDate}
                maxDate={MaxDate ?? MaxDate}
            />

            {(() => {
                if (PrevNextButton) {
                    if (checkAfterDate) {
                        return (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"></svg>
                        )
                    } else {
                        return (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleClickNextDate()}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        )
                    }
                }

                return <></>
            })()}
        </DatePickerWapper>
    )
}

export default VaryDatepickerInput
