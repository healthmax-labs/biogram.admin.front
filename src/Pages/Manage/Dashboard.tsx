// import TableDropdown from './TableDropdown'
import { getList } from '@Service/InstdeptService'

import { useEffect, useState } from 'react'

interface INSTDEPT_LIST {
    BRTHDY: string
    CONFM_AT: string
    CONFM_DE: string
    DEPT_NM: null
    DEPT_NO: null
    INST_NM: string
    INST_NO: number
    MBER_NO: number
    MBTLNUM: string
    MEBER_NM: string
    NO: string
    SEXDSTN: string
    STAT: string
}

export default function Dashboard() {
    const color = 'light'

    const [resList, setResList] = useState<INSTDEPT_LIST[]>([])

    const getTableList = async () => {
        const response = await getList({
            CUR_PAGE: 1,
            INST_NO: 0,
            ITEM_COUNT: 15,
            SEARCH_KEY: '',
        })

        setResList(response.payload.INSTDEPT_LIST)
    }

    useEffect(() => {
        getTableList().then()
    }, [])
    return (
        <>
            <div
                className={
                    'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
                    (color === 'light'
                        ? 'bg-white'
                        : 'bg-lightBlue-900 text-white')
                }>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    'font-semibold text-lg ' +
                                    (color === 'light'
                                        ? 'text-blueGray-700'
                                        : 'text-white')
                                }></h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="flex items-center justify-center ">
                            <div className="flex border-2 rounded ">
                                <input
                                    type="text"
                                    className="px-4 py-2 w-80 text-sm"
                                    placeholder="Search..."
                                />
                                <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                        className="w-6 h-6 text-gray-600 text-sm"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                소속승인
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                소속거절
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                저장
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                부서입력
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                부서제거
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2">
                                부서설정
                            </button>
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    회원번호
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    회원명
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    휴대폰번호
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    생년월일
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    성별
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    소속이름
                                </th>
                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    부서
                                </th>

                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    소속가입일
                                </th>

                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }>
                                    상태
                                </th>

                                <th
                                    className={
                                        'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                        (color === 'light'
                                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                            : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                    }></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resList.map((el: INSTDEPT_LIST, index) => {
                                return (
                                    <tr key={index}>
                                        <th className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.MBER_NO}
                                        </th>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.MEBER_NM}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.MBTLNUM}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.MBTLNUM}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.SEXDSTN}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.INST_NM}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.DEPT_NM}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.CONFM_DE}
                                        </td>
                                        <td className="px-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            {el.STAT}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="block w-full overflow-x-auto">
                    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer">
                                <svg
                                    width="14"
                                    height="8"
                                    viewBox="0 0 14 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.1665 4H12.8332"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M1.1665 4L4.49984 7.33333"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M1.1665 4.00002L4.49984 0.666687"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="text-sm ml-3 font-medium leading-none ">
                                    Previous
                                </p>
                            </div>
                            <div className="sm:flex">
                                <p className="text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2">
                                    1
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    2
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    3
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    4
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    5
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    6
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    7
                                </p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                                    8
                                </p>
                            </div>
                            <div className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer">
                                <p className="text-sm font-medium leading-none mr-3">
                                    Next
                                </p>
                                <svg
                                    width="14"
                                    height="8"
                                    viewBox="0 0 14 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.1665 4H12.8332"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.5 7.33333L12.8333 4"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.5 0.666687L12.8333 4.00002"
                                        stroke="currentColor"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
