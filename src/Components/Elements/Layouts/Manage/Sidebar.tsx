import React, { useEffect, useState } from 'react'
import { MenuLogo, SamsungLogoImage } from '@Assets'
import { SidebarStyle } from '@Style/Layouts/Manage/MainStyles'
import { useRecoilValue } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import { AtomRootState } from '@Recoil/AppRootState'
import { MenuItemInterface } from '@CommonTypes'
import { isEmpty } from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

interface MenusItemInterface extends MenuItemInterface {
    pathName?: string
    reloadButton?: boolean
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

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const {
        menuInfo: { AUTHOR_MENU_INFO_LIST },
    } = useRecoilValue(AtomRootState)

    const [pageState, setPageState] = useState<{
        Menus: {
            main: MenusItemInterface[]
            sub: MenusItemInterface[]
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
                                        <MenuHeading>
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
                                                                    location.pathname ===
                                                                    `${subMenu.pathName}`
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

export default Sidebar
