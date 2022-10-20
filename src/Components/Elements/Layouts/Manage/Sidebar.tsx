import React from 'react'
import { Link } from 'react-router-dom'
import logo from '@Assets/Images/logo.svg'
import NotificationDropdown from './NotificationDropdown'
import UserDropdown from './UserDropdown'

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState('hidden')
    return (
        <>
            <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
                <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                        type="button"
                        onClick={() =>
                            setCollapseShow('bg-white m-2 py-3 px-6')
                        }>
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <img src={logo} alt="BioGram" />
                    {/* User */}
                    <ul className="flex list-none flex-wrap items-center md:hidden">
                        <li className="relative inline-block">
                            <NotificationDropdown />
                        </li>
                        <li className="relative inline-block">
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            'absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
                            collapseShow
                        }>
                        {/* Collapse header */}
                        <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                                        to="/">
                                        Notus React
                                    </Link>
                                </div>
                                <div className="flex w-6/12 justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                                        onClick={() =>
                                            setCollapseShow('hidden')
                                        }>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 h-12 w-full rounded  border-0 border border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none"
                                />
                            </div>
                        </form>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            회원관리
                        </h6>
                        {/* Navigation */}

                        <ul className="flex list-none flex-col md:min-w-full md:flex-col">
                            <li className="items-center">
                                <Link
                                    className={
                                        'block py-3 text-xs font-bold uppercase ' +
                                        (window.location.href.indexOf(
                                            '/admin/dashboard'
                                        ) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to="/admin/dashboard">
                                    <i
                                        className={
                                            'fas fa-tv mr-2 text-sm ' +
                                            (window.location.href.indexOf(
                                                '/admin/dashboard'
                                            ) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }></i>{' '}
                                    회원현황
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            소속관리
                        </h6>
                        {/* Navigation */}

                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/manage/belong/belong-status">
                                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{' '}
                                    소속현황
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/manage/belong/belong-manage">
                                    <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{' '}
                                    소속 가입신청
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            컨텐츠 관리
                        </h6>
                        {/* Navigation */}

                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/landing">
                                    <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{' '}
                                    매거진
                                </Link>
                            </li>

                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/profile">
                                    <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{' '}
                                    바이오그램 존
                                </Link>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            현황관리
                        </h6>
                        {/* Navigation */}
                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    휘험요인 현황
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    전후비교 현황
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-angular text-blueGray-300 mr-2 text-base"></i>
                                    기기측정 현황
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    활동량 현황
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            통계관리
                        </h6>
                        {/* Navigation */}
                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    사용자 통계
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    위험군 통계
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-angular text-blueGray-300 mr-2 text-base"></i>
                                    위혐요인 통계
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    복양 통계
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    기기사용 통계
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            관리자 설정
                        </h6>
                        {/* Navigation */}
                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    태블릿 시리얼키 관리
                                </a>
                            </li>

                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    이용 약관 관리
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="text-blueGray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full">
                            홈페이지 관리
                        </h6>
                        {/* Navigation */}
                        <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
                            <li className="inline-flex">
                                <a
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                                    target="_blank"
                                    className="text-blueGray-700 hover:text-blueGray-500 mb-4 block text-sm font-semibold no-underline">
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    게시판 관리
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
