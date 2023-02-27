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

interface MenusItemInterface extends MenuItemInterface {
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
    NavigationUl,
    NavigationLi,
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
            setPageState(prevState => ({
                ...prevState,
                Menus: {
                    ...prevState.Menus,
                    main: AUTHOR_MENU_INFO_LIST.filter(
                        e => e.SORT_ORDR === 1
                    ).map(em => {
                        return {
                            ...em,
                            category: '',
                        }
                    }),
                    sub: AUTHOR_MENU_INFO_LIST.filter(
                        e => e.SORT_ORDR !== 1
                    ).map(em => {
                        const menuInfo = _.find(Routers.Main, {
                            menuCode: em.MENU_CODE,
                        })

                        return {
                            ...em,
                            category: menuInfo ? menuInfo.category : '',
                        }
                    }),
                },
            }))
        }

        if (AUTHOR_MENU_INFO_LIST.length > 0) {
            funcSetMenus()
        }
    }, [AUTHOR_MENU_INFO_LIST])

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

    useEffect(() => {
        // console.debug(pageState.Menus.active)
    }, [pageState.Menus.active])

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
                            (mainMenus: MenuItemInterface, mainIndex) => {
                                return (
                                    <div key={`sidebar-main-menu-${mainIndex}`}>
                                        {mainIndex > 0 && <Divider />}
                                        <MenuHeading
                                            Active={
                                                mainMenus.MENU_CODE ===
                                                pageState.Menus.active.mainCode
                                            }>
                                            {mainMenus.MENU_NM}
                                        </MenuHeading>
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
                                    </div>
                                )
                            }
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
