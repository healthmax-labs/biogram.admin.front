import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

const ExampleCustomInput = (
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

export default function SearchBox() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <>
            <div className="mt-1">
                <div className="grid grid-cols-2 gap-1">
                    <div className="">
                        <div className="text-gray-700 flex items-center">
                            <div className="mb-0 w-1/6">
                                <label
                                    htmlFor="forms-labelLeftInputCode"
                                    className="font-xs">
                                    <p className="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-gray-500">
                                        소속 :
                                    </p>
                                </label>
                            </div>
                            <div className="w-1/6 flex-grow ml-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country"
                                    className="form-input mt-1 block h-8 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs">
                                    <option>소속 선택</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-gray-700 flex items-center"></div>
                        <div className="text-gray-700 flex items-center">
                            <div className="w-1/6">
                                <label htmlFor="forms-labelLeftInputCode">
                                    <p className="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-gray-500">
                                        가입일자 :
                                    </p>
                                </label>
                            </div>
                            <div className="grid grid-rows-1 grid-flow-col gap-1">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: any) => setStartDate(date)}
                                    dateFormat={`yyyy/MM/dd`}
                                    locale={ko}
                                    customInput={React.createElement(
                                        React.forwardRef(ExampleCustomInput)
                                    )}
                                />
                                {`~`}
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: any) => setStartDate(date)}
                                    dateFormat={`yyyy/MM/dd`}
                                    locale={ko}
                                    customInput={React.createElement(
                                        React.forwardRef(ExampleCustomInput)
                                    )}
                                />
                            </div>
                        </div>
                        <div className="text-gray-700 flex items-center"></div>
                        <div className="text-gray-700 flex items-center">
                            <div className="w-1/6">
                                <label htmlFor="forms-labelLeftInputCode">
                                    <p className="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left text-gray-500">
                                        검색어 :
                                    </p>
                                </label>
                            </div>
                            <div className="w-1/6 flex-grow ml-2">
                                <input
                                    className="form-input mt-1 block h-8 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                    type="search"
                                    id="search-dropdown"
                                    placeholder="ID / 이름 / 연락처 / 전화번호"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute bottom-0 right-4 h-8 w-20">
                        <button className="text-center items-center px-3 py-1.5 w-20 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-md mx-2">
                            검색
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
