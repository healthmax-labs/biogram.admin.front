import tw from 'twin.macro'
import styled from '@emotion/styled'
// import ConstStyle from '@Style/ConstStyle'
// import Const from '@Const'
// import { get } from 'lodash'

export const LayoutStyle = {
    Container: styled.div(({ MenuState }: { MenuState: boolean }) => [
        tw`relative bg-white min-w-center-width`,
        MenuState ? tw`ml-menu-width` : tw``,
    ]),
    CenterWapper: tw.div`pl-2 pr-2 mx-auto w-full`,
}

export const FooterStyle = {
    Box: tw.footer`block py-4`,
    Container: tw.div`container mx-auto px-4`,
    Hr: tw.hr`mb-4`,
    Wapper: tw.div`flex flex-wrap items-center md:justify-between justify-center`,
    Left: tw.div`w-full md:w-4/12 px-4`,
    Right: tw.div`w-full md:w-8/12 px-4`,
    CopyRight: tw.div`text-sm font-semibold py-1 text-center md:text-left`,
    CopyRightLink: tw.a`text-blue-500 hover:text-blue-700 text-sm font-semibold py-1`,
    RightBox: {
        UL: tw.ul`flex flex-wrap list-none md:justify-end  justify-center`,
        LI: tw.li``,
        Link: tw.a`text-blue-600 hover:text-blue-800 text-sm font-semibold block py-1 px-3`,
    },
}

export const HeaderStatsStyle = {
    Container: tw.div`relative pb-0 pt-0`,
    MainWapper: tw.div`px-4 md:px-10 mx-auto w-full`,
    Wapper: tw.div``,
    Cards: tw.div`flex flex-wrap`,
    CardItem: tw.div`w-full lg:w-6/12 xl:w-3/12 px-4`,
}

export const SidebarStyle = {
    // Nav2: styled.div(({ MenuState }: { MenuState: boolean }) => [
    //     MenuState
    //         ? tw`z-10 items-center justify-between bg-white py-4 px-6 fixed left-0 top-0 bottom-0 block w-48 flex-row flex-nowrap overflow-hidden overflow-y-auto`
    //         : tw`z-10 items-center justify-between bg-white fixed left-0 top-0 bottom-0 block w-0 flex-row flex-nowrap overflow-hidden overflow-y-auto`,
    // ]),
    Nav: styled.div(({ MenuState }: { MenuState: boolean }) => [
        tw`z-10 items-center justify-between bg-white fixed left-0 top-0 w-0 bottom-0 block flex-row flex-nowrap overflow-hidden overflow-y-auto`,
        MenuState ? tw`py-4 px-6` : tw``,
        MenuState ? tw`w-menu-width` : tw``,
    ]),
    Container: tw.div`mx-auto flex w-full justify-between px-0 min-h-full flex-col flex-nowrap items-stretch`,
    TogglerButton: tw.button`cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden`,
    Logo: tw.img``,
    Collapse: {
        Container: tw.div`top-0 left-0 right-0 z-40 h-auto flex-1 overflow-y-auto overflow-x-hidden rounded relative mt-4 flex flex-col items-stretch opacity-100 shadow-none bg-white`,
        Header: tw.div`bg-white mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full`,
        Wapper: tw.div`flex flex-wrap`,
        Title: {
            Box: tw.div`w-6/12`,
            Buttons: tw.div`flex w-6/12 justify-end`,
            Button: tw.input`border-gray-500 placeholder-gray-300 text-gray-600 h-12 w-full rounded border-0 border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none`,
        },
    },
    Divider: tw.hr`my-0 min-w-full`,
    MainMenuWapper: tw.div`flex flex-nowrap items-center pb-2`,
    HideIconWapper: tw.div`flex items-center pr-1 cursor-pointer`,
    MenuHeading: styled.h6(({ Active }: { Active: boolean }) => {
        const returnTw = [
            tw`flex pt-1 text-xs uppercase no-underline md:min-w-full items-center`,
        ]

        if (Active) {
            returnTw.push(tw`text-blueberry`)
        } else {
            returnTw.push(tw`text-gray-500`)
        }

        return returnTw
    }),
    MenuHeadingLink: tw.div`text-gray-500 block pt-1 pb-2 text-xs uppercase no-underline md:min-w-full cursor-pointer`,
    NavigaitionUlWapper: styled.div(({ Show }: { Show: boolean }) => {
        const returnTw = [tw`flex flex-col items-center`]

        if (Show) {
            returnTw.push(tw``)
        } else {
            returnTw.push(
                tw`hidden p-2 cursor-pointer rounded-full hover:bg-gray-700 transition`
            )
        }

        return returnTw
    }),
    NavigationUl: tw.ul`list-none flex-col min-w-full`,
    NavigationLi: tw.li`items-center`,
    MenuLink: styled.div(({ Active }: { Active: boolean }) => {
        const returnTw = [tw`cursor-pointer pl-6 block text-xs mb-2 uppercase`]

        if (Active) {
            returnTw.push(tw`text-blueberry hover:text-blueberry`)
        } else {
            returnTw.push(tw`text-gray-700 hover:text-gray-500`)
        }
        return returnTw
    }),
}

export const TopbarStyle = {
    Container: tw.nav`top-0 left-0 w-full z-10 bg-transparent flex-row flex-nowrap justify-start flex items-center p-1`,
    Wapper: tw.div`w-full mx-auto items-center flex justify-between flex-wrap px-1`,
    Left: tw.div`list-none items-center flex`,
    Right: tw.div`flex-row list-none items-center flex`,
    Belong: tw.div`items-center flex ml-0.5 text-xs`,
    Name: tw.div`items-center flex ml-2 text-lg`,
    Status: tw.div`items-center flex ml-2 text-xs`,
    Logout: tw.div`items-center flex ml-2`,
    LogoutIcon: tw.img`cursor-pointer items-center flex pb-0.5 w-4`,
}

export const PageContainerStyle = {
    ListPage: {
        Container: tw.div`relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white`,
    },
    DetailPage: {
        Container: tw.div`flex flex-nowrap`,
        FullWapper: tw.div`flex w-center-width`,
        LeftWapper: tw.div`w-left-box`,
        RightWapper: tw.div`w-right-box`,
        ChartLeftWapper: tw.div`w-chart-left-box`,
        ChartRightWapper: tw.div`w-chart-right-box`,
    },
}
