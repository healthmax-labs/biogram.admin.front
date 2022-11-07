import React, { useEffect, useState } from 'react'
import { MenuLogo } from '@Assets'
import { SidebarStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { SelectMainLayoutState } from '@Recoil/MainLayoutState'
import { useLocation, useNavigate } from 'react-router-dom'
import { AtomRootState } from '@Recoil/AppRootState'
import { MenuInfoItemInterface } from '@CommonTypes'

const {
    Nav,
    Container,
    Collapse,
    Logo,
    MenuLink,
    MenuHeading,
    Divider,
    NavigationUl,
    NavigationLi,
} = SidebarStyle

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const leftMenuShowStatus = useRecoilValue(SelectMainLayoutState)
    const {
        menuInfo: { AUTHOR_MENU_INFO_LIST },
    } = useRecoilValue(AtomRootState)

    const [pageState, setPageState] = useState<{
        Menus: {
            main: MenuInfoItemInterface[]
            sub: MenuInfoItemInterface[]
        }
    }>({
        Menus: {
            main: [],
            sub: [],
        },
    })

    useEffect(() => {
        const funcSetMenus = () => {
            setPageState(prevState => ({
                ...prevState,
                Menus: {
                    main: AUTHOR_MENU_INFO_LIST.filter(e => e.SORT_ORDR === 1),
                    sub: AUTHOR_MENU_INFO_LIST.filter(e => e.SORT_ORDR !== 1),
                },
            }))
        }

        if (AUTHOR_MENU_INFO_LIST.length > 0) {
            funcSetMenus()
        }
    }, [AUTHOR_MENU_INFO_LIST])

    useEffect(() => {
        console.debug(pageState)
    }, [pageState])
    return (
        <>
            <Nav MenuState={leftMenuShowStatus.leftMenuShow}>
                <Container>
                    {/* Toggler */}
                    {/* Brand */}
                    <Logo src={MenuLogo} alt="BioGram" />
                    {/* Collapse */}
                    <Collapse.Container>
                        {/* Heading */}
                        <MenuHeading>회원관리</MenuHeading>
                        {/* Navigation */}

                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink
                                    Active={
                                        location.pathname ===
                                        `/manage/member/member-list`
                                    }
                                    onClick={() => {
                                        navigate(
                                            `${process.env.PUBLIC_URL}/manage/member/member-list`
                                        )
                                    }}>
                                    회원현황
                                </MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>소속관리</MenuHeading>
                        {/* Navigation */}

                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink
                                    Active={
                                        location.pathname ===
                                        `/manage/belong/belong-status`
                                    }
                                    onClick={() => {
                                        navigate(
                                            `${process.env.PUBLIC_URL}/manage/belong/belong-status`
                                        )
                                    }}>
                                    소속현황
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink
                                    Active={
                                        location.pathname ===
                                        `/manage/belong/belong-manage`
                                    }
                                    onClick={() => {
                                        navigate(
                                            `${process.env.PUBLIC_URL}/manage/belong/belong-manage`
                                        )
                                    }}>
                                    소속 가입신청
                                </MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>컨텐츠 관리</MenuHeading>
                        {/* Navigation */}

                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink Active={false}>매거진</MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    바이오그램 존
                                </MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>현황관리</MenuHeading>
                        {/* Navigation */}
                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink Active={false}>
                                    위험요인 현황
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    전후비교 현황
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    기기측정 현황
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>활동량 현황</MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>통계관리</MenuHeading>
                        {/* Navigation */}
                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink Active={false}>사용자 통계</MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>위험군 통계</MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    위혐요인 통계
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>복약 통계</MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    기기사용 통계
                                </MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>관리자 설정</MenuHeading>
                        {/* Navigation */}
                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink Active={false}>
                                    태블릿 시리얼키 관리
                                </MenuLink>
                            </NavigationLi>

                            <NavigationLi>
                                <MenuLink Active={false}>
                                    이용 약관 관리
                                </MenuLink>
                            </NavigationLi>
                        </NavigationUl>

                        {/* Divider */}
                        <Divider />
                        {/* Heading */}
                        <MenuHeading>홈페이지 관리</MenuHeading>
                        {/* Navigation */}
                        <NavigationUl>
                            <NavigationLi>
                                <MenuLink Active={false}>게시판 관리</MenuLink>
                            </NavigationLi>
                        </NavigationUl>
                        {process.env.REACT_APP_ENV === 'development' && (
                            <>
                                {/* Divider */}
                                <Divider />
                                {/* Heading */}
                                <MenuHeading>퍼블리싱 페이지</MenuHeading>
                                {/* Navigation */}
                                <NavigationUl>
                                    <NavigationLi>
                                        <MenuLink
                                            Active={
                                                location.pathname ===
                                                `/publish/default/default-list`
                                            }
                                            onClick={() => {
                                                navigate(
                                                    `${process.env.PUBLIC_URL}/publish/default/default-list`
                                                )
                                            }}>
                                            기본 리스트
                                        </MenuLink>
                                    </NavigationLi>
                                </NavigationUl>
                            </>
                        )}
                    </Collapse.Container>
                </Container>
            </Nav>
        </>
    )
}
