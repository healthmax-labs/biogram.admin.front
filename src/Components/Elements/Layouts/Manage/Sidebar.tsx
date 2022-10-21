import React from 'react'
import { Link } from 'react-router-dom'
import { LogoImage } from '@Assets'
import {
    SidebarNav,
    SidebarContainer,
    SidebarTogglerButton,
    SidebarLogoImage,
    SidebarCollapseContainer,
    SidebarCollapseHeader,
    SidebarCollapseWapper,
    SidebarCollapseTitleBox,
    SidebarCollapseTitleButtonBox,
    SidebarCollapseTitleButton,
    SidebarCollapseSearchForm,
    SidebarCollapseSearchFormInputBox,
    SidebarCollapseSearchFormInput,
    SidebarDividerHr,
    SidebarMenuHeading,
    SidebarNavigationUl,
    SidebarNavigationLi,
    SidebarMenuLink,
} from '@Style/Layouts/Manage/Common'

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState<boolean>(false)
    return (
        <>
            <SidebarNav>
                <SidebarContainer>
                    {/* Toggler */}
                    <SidebarTogglerButton
                        type="button"
                        onClick={() => setCollapseShow(true)}>
                        <i className="fas fa-bars"></i>
                    </SidebarTogglerButton>
                    {/* Brand */}
                    <SidebarLogoImage src={LogoImage} alt="BioGram" />
                    {/* Collapse */}
                    <SidebarCollapseContainer CollapseShow={collapseShow}>
                        {/* Collapse header */}
                        <SidebarCollapseHeader>
                            <SidebarCollapseWapper>
                                <SidebarCollapseTitleBox>
                                    <Link
                                        className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                                        to="/">
                                        바이오 그램 관리자
                                    </Link>
                                </SidebarCollapseTitleBox>
                                <SidebarCollapseTitleButtonBox>
                                    <SidebarCollapseTitleButton
                                        type="button"
                                        onClick={() => setCollapseShow(false)}>
                                        <i className="fas fa-times"></i>
                                    </SidebarCollapseTitleButton>
                                </SidebarCollapseTitleButtonBox>
                            </SidebarCollapseWapper>
                        </SidebarCollapseHeader>

                        {/* Form */}
                        <SidebarCollapseSearchForm>
                            <SidebarCollapseSearchFormInputBox>
                                <SidebarCollapseSearchFormInput
                                    type="text"
                                    placeholder="Search"
                                />
                            </SidebarCollapseSearchFormInputBox>
                        </SidebarCollapseSearchForm>

                        {/* Divider */}
                        <SidebarDividerHr />
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
                                            '/manage/belong/belong-manage'
                                        ) !== -1
                                            ? 'text-lightBlue-500 hover:text-lightBlue-600'
                                            : 'text-blueGray-700 hover:text-blueGray-500')
                                    }
                                    to="/admin/dashboard">
                                    <i
                                        className={
                                            'fas fa-tv mr-2 text-sm ' +
                                            (window.location.href.indexOf(
                                                '/manage/belong/belong-manage'
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
