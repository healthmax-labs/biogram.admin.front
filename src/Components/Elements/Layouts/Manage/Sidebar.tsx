import React from 'react'
import { Link } from 'react-router-dom'
import { MenuLogo } from '@Assets'
import {
    SidebarNav,
    SidebarContainer,
    SidebarLogoImage,
    SidebarCollapseContainer,
    SidebarDividerHr,
    SidebarMenuHeading,
    SidebarNavigationUl,
    SidebarNavigationLi,
    SidebarMenuLink,
} from '@Style/Layouts/Manage/Common'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'

export default function Sidebar() {
    const leftMenuShowStatus = useRecoilValue(SelectMainLayoutState)
    return (
        <>
            <SidebarNav MenuState={leftMenuShowStatus.leftMenuShow}>
                <SidebarContainer>
                    {/* Toggler */}
                    {/* Brand */}
                    <SidebarLogoImage src={MenuLogo} alt="BioGram" />
                    {/* Collapse */}
                    <SidebarCollapseContainer>
                        {/* Heading */}
                        <SidebarMenuHeading>회원관리</SidebarMenuHeading>
                        {/* Navigation */}
                        {/*네비게이션 처리.*/}
                        {/*<ul className="flex list-none flex-col md:min-w-full md:flex-col">*/}
                        {/*    <li className="items-center">*/}
                        {/*        <Link*/}
                        {/*            className={*/}
                        {/*                'block py-3 text-xs font-bold uppercase ' +*/}
                        {/*                (window.location.href.indexOf(*/}
                        {/*                    '/admin/dashboard'*/}
                        {/*                ) !== -1*/}
                        {/*                    ? 'text-lightBlue-500 hover:text-lightBlue-600'*/}
                        {/*                    : 'text-blueGray-700 hover:text-blueGray-500')*/}
                        {/*            }*/}
                        {/*            to="/admin/dashboard">*/}
                        {/*            <i*/}
                        {/*                className={*/}
                        {/*                    'fas fa-tv mr-2 text-sm ' +*/}
                        {/*                    (window.location.href.indexOf(*/}
                        {/*                        '/admin/dashboard'*/}
                        {/*                    ) !== -1*/}
                        {/*                        ? 'opacity-75'*/}
                        {/*                        : 'text-blueGray-300')*/}
                        {/*                }></i>{' '}*/}
                        {/*            회원현황*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}

                        {/* Navigation */}
                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <Link
                                    className={
                                        'block py-3 text-xs font-bold uppercase ' +
                                        (window.location.href.indexOf(
                                            '/manage/member/member-list'
                                        ) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to="/manage/member/member-list">
                                    <i
                                        className={
                                            'fas fa-tv mr-2 text-sm ' +
                                            (window.location.href.indexOf(
                                                '/manage/member/member-list'
                                            ) !== -1
                                                ? 'opacity-75'
                                                : 'text-blueGray-300')
                                        }></i>
                                    회원현황
                                </Link>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>소속관리</SidebarMenuHeading>
                        {/* Navigation */}

                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/manage/belong/belong-status">
                                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{' '}
                                    소속현황
                                </Link>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/manage/belong/belong-manage">
                                    <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{' '}
                                    소속 가입신청
                                </Link>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>컨텐츠 관리</SidebarMenuHeading>
                        {/* Navigation */}

                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/landing">
                                    <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                                    매거진
                                </Link>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 block py-3 text-xs font-bold uppercase"
                                    to="/profile">
                                    <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>
                                    바이오그램 존
                                </Link>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>현황관리</SidebarMenuHeading>
                        {/* Navigation */}
                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    위험요인 현황
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    전후비교 현황
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-angular text-blueGray-300 mr-2 text-base"></i>
                                    기기측정 현황
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    활동량 현황
                                </SidebarMenuLink>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>통계관리</SidebarMenuHeading>
                        {/* Navigation */}
                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    사용자 통계
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    위험군 통계
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-angular text-blueGray-300 mr-2 text-base"></i>
                                    위혐요인 통계
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    복양 통계
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-js-square text-blueGray-300 mr-2 text-base"></i>
                                    기기사용 통계
                                </SidebarMenuLink>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>관리자 설정</SidebarMenuHeading>
                        {/* Navigation */}
                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    태블릿 시리얼키 관리
                                </SidebarMenuLink>
                            </SidebarNavigationLi>

                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fab fa-css3-alt text-blueGray-300 mr-2 text-base"></i>
                                    이용 약관 관리
                                </SidebarMenuLink>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>

                        {/* Divider */}
                        <SidebarDividerHr />
                        {/* Heading */}
                        <SidebarMenuHeading>홈페이지 관리</SidebarMenuHeading>
                        {/* Navigation */}
                        <SidebarNavigationUl>
                            <SidebarNavigationLi>
                                <SidebarMenuLink>
                                    <i className="fas fa-paint-brush text-blueGray-300 mr-2 text-base"></i>
                                    게시판 관리
                                </SidebarMenuLink>
                            </SidebarNavigationLi>
                        </SidebarNavigationUl>
                    </SidebarCollapseContainer>
                </SidebarContainer>
            </SidebarNav>
        </>
    )
}
