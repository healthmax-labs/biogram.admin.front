import React, { useEffect, useState } from 'react'
import { MenuLogo, SamsungLogoImage } from '@Assets'
import { SidebarStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { AtomRootState } from '@Recoil/AppRootState'
import { MenuItemInterface } from '@CommonTypes'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import Routers from '@Routers'
import _, { isEmpty } from 'lodash'
import { storageShowMenuInfo } from '@Helper'

interface MenusItemInterface extends MenuItemInterface {
    show: boolean
    pathName?: string
    reloadButton?: boolean
    category: string
}

const {
    Nav,
    Container,
    Collapse,
    Logo,
    MenuLink,
    MenuHeading,
    Divider,
    MainMenuWapper,
    HideIconWapper,
    NavigaitionUlWapper,
    NavigationUl,
    NavigationLi,
    MenuHeadingLink,
} = SidebarStyle

const initializeState = {
    Menus: {
        main: [],
        sub: [],
        active: {
            mainCode: '',
            menuCode: '',
            category: '',
        },
    },
}

const Sidebar = () => {
    const navigate = useNavigate()
    const locationState = useLocation()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const {
        menuInfo: { AUTHOR_MENU_INFO_LIST },
        userinfo: { USID },
    } = useRecoilValue(AtomRootState)

    const [pageState, setPageState] = useState<{
        Menus: {
            main: MenusItemInterface[]
            sub: MenusItemInterface[]
            active: {
                mainCode: string
                menuCode: string
                category: string
            }
        }
    }>(initializeState)

    useEffect(() => {
        const funcSetMenus = () => {
            const menuShowInfo = USID
                ? storageShowMenuInfo.getMy({ usid: USID })
                : []

            const mainList = AUTHOR_MENU_INFO_LIST.filter(
                e => e.SORT_ORDR === 1
            ).map(em => {
                return {
                    ...em,
                    category: '',
                    show: (() => {
                        const findShow = _.find(menuShowInfo, {
                            code: em.MENU_CODE,
                        })
                        if (findShow) {
                            return findShow.show
                        } else {
                            return true
                        }
                    })(),
                }
            })

            const subList = AUTHOR_MENU_INFO_LIST.filter(
                e => e.SORT_ORDR !== 1
            ).map(em => {
                const menuInfo = _.find(Routers.Main, {
                    menuCode: em.MENU_CODE,
                })

                return {
                    ...em,
                    category: menuInfo ? menuInfo.category : '',
                    show: true,
                }
            })

            setPageState(prevState => ({
                ...prevState,
                Menus: {
                    ...prevState.Menus,
                    main: mainList,
                    sub: subList,
                },
            }))
        }

        if (AUTHOR_MENU_INFO_LIST.length > 0) {
            funcSetMenus()
        }
    }, [AUTHOR_MENU_INFO_LIST, USID])

    // 메뉴 보이기 안보이기 에서 기존과 값이 다들경우 저장
    useEffect(() => {
        if (USID && pageState.Menus.main.length > 0) {
            const storageData = storageShowMenuInfo.getMy({ usid: USID })
            const stateData = pageState.Menus.main.map(e => {
                return {
                    code: e.MENU_CODE,
                    show: e.show,
                }
            })

            if (JSON.stringify(storageData) !== JSON.stringify(stateData)) {
                storageShowMenuInfo.setMy({ usid: USID, info: stateData })
            }
        }
    }, [USID, pageState.Menus.main])

    useEffect(() => {
        // 현 활성화 페이지 정보.
        const routerMatchs = matchRoutes(
            Routers.Main.map(el => {
                return {
                    path: el.pathName,
                }
            }),
            location
        )

        if (routerMatchs) {
            const {
                route: { path },
            } = routerMatchs[0]

            const findMenu = _.find(Routers.Main, { pathName: path })

            setPageState(prevState => ({
                ...prevState,
                Menus: {
                    ...prevState.Menus,
                    active: {
                        mainCode: findMenu ? findMenu.mainCode : '',
                        menuCode: findMenu ? findMenu.menuCode : '',
                        category: findMenu ? findMenu.category : '',
                    },
                },
            }))
        }
    }, [locationState])

    return (
        <>
            <Nav MenuState={mainLayoutState.leftMenuShow}>
                <Container>
                    <Logo
                        src={
                            mainLayoutState.Theme === 'GeonDaon'
                                ? SamsungLogoImage
                                : MenuLogo
                        }
                        alt="BioGram"
                    />
                    {/* Collapse */}
                    <Collapse.Container>
                        {pageState.Menus.main.map(
                            (mainMenus: MenusItemInterface, mainIndex) => {
                                return (
                                    <div key={`sidebar-main-menu-${mainIndex}`}>
                                        {mainIndex > 0 && <Divider />}
                                        <MainMenuWapper>
                                            <HideIconWapper
                                                onClick={() => {
                                                    setPageState(prevState => ({
                                                        ...prevState,
                                                        Menus: {
                                                            ...prevState.Menus,
                                                            main: prevState.Menus.main.map(
                                                                e => {
                                                                    if (
                                                                        e.MENU_CODE ===
                                                                        mainMenus.MENU_CODE
                                                                    ) {
                                                                        return {
                                                                            ...e,
                                                                            show: !e.show,
                                                                        }
                                                                    } else {
                                                                        return e
                                                                    }
                                                                }
                                                            ),
                                                        },
                                                    }))
                                                }}>
                                                {mainMenus.show ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-3 h-3">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-3 h-3">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                )}
                                            </HideIconWapper>

                                            <MenuHeading
                                                Active={
                                                    mainMenus.MENU_CODE ===
                                                    pageState.Menus.active
                                                        .mainCode
                                                }>
                                                {mainMenus.MENU_NM}
                                            </MenuHeading>
                                        </MainMenuWapper>
                                        <NavigaitionUlWapper
                                            Show={mainMenus.show}>
                                            {pageState.Menus.sub
                                                .filter(
                                                    e =>
                                                        e.MENU_ORDR_GUBUN ===
                                                        mainMenus.MENU_ORDR_GUBUN
                                                )
                                                .map((subMenu, subIndex) => {
                                                    return (
                                                        <NavigationUl
                                                            key={`sidebar-sub-menu-${subIndex}`}>
                                                            <NavigationLi>
                                                                <MenuLink
                                                                    Active={
                                                                        mainMenus.MENU_CODE ===
                                                                            pageState
                                                                                .Menus
                                                                                .active
                                                                                .mainCode &&
                                                                        subMenu.category ===
                                                                            pageState
                                                                                .Menus
                                                                                .active
                                                                                .category
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            isEmpty(
                                                                                subMenu.pathName
                                                                            )
                                                                        ) {
                                                                            alert(
                                                                                '준비 중입니다.'
                                                                            )
                                                                            return
                                                                        }
                                                                        navigate(
                                                                            `${process.env.PUBLIC_URL}${subMenu.pathName}`
                                                                        )
                                                                    }}>
                                                                    {
                                                                        subMenu.MENU_NM
                                                                    }
                                                                </MenuLink>
                                                            </NavigationLi>
                                                        </NavigationUl>
                                                    )
                                                })}
                                        </NavigaitionUlWapper>
                                    </div>
                                )
                            }
                        )}
                        {mainLayoutState.Theme !== 'GeonDaon' && (
                            <>
                                {/* Divider */}
                                <Divider />
                                {/* Heading */}
                                <MenuHeading Active={false}>
                                    <MenuHeadingLink
                                        onClick={() => {
                                            window.open(
                                                'https://api.mybiogram.com/common/file?atchmnfl_nm=MkF5U1d2bUhiNURnbnFOWTRQTFg2Zz09'
                                            )
                                        }}>
                                        메뉴얼 다운로드
                                    </MenuHeadingLink>
                                </MenuHeading>
                            </>
                        )}

                        {process.env.REACT_APP_ENV === 'development' && (
                            <>
                                {/* Divider */}
                                <Divider />
                                {/* Heading */}
                                <MenuHeading Active={false}>
                                    퍼블리싱 페이지
                                </MenuHeading>
                                {/* Navigation */}
                                <NavigationUl>
                                    <NavigationLi>
                                        <MenuLink
                                            Active={
                                                locationState.pathname ===
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

export default Sidebar
