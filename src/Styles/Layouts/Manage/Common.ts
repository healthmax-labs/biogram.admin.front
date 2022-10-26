import tw from 'twin.macro'
import styled from '@emotion/styled'
//
export const ManageLayoutContainer = styled.div(
    ({ MenuState }: { MenuState: boolean }) => [
        MenuState
            ? tw`relative ml-48 bg-gray-100 min-width[1650px]`
            : tw`relative bg-gray-100 min-width[1650px]`,
    ]
)

export const ManageLayoutCenterWapper = tw.div`px-10 mx-auto w-full -mt-44`

export const SidebarNav = styled.div(
    ({ MenuState }: { MenuState: boolean }) => [
        MenuState
            ? tw`z-10 items-center justify-between bg-white py-4 px-6 shadow-xl fixed left-0 top-0 bottom-0 block w-48 flex-row flex-nowrap overflow-hidden overflow-y-auto`
            : tw`z-10 items-center justify-between bg-white shadow-xl fixed left-0 top-0 bottom-0 block w-0 flex-row flex-nowrap overflow-hidden overflow-y-auto`,
    ]
)
export const SidebarContainer = tw.div`mx-auto flex w-full justify-between px-0 min-h-full flex-col flex-nowrap items-stretch`
export const SidebarTogglerButton = tw.button`cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden`
export const SidebarLogoImage = tw.img``

export const SidebarCollapseHeader = tw.div`border-gray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full`
export const SidebarCollapseWapper = tw.div`flex flex-wrap`
export const SidebarCollapseTitleBox = tw.div`w-6/12`
export const SidebarCollapseTitleButtonBox = tw.div`flex w-6/12 justify-end`
export const SidebarCollapseTitleButton = tw.button`cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden`

export const SidebarCollapseSearchForm = tw.form`mt-6 mb-4 md:hidden`
export const SidebarCollapseSearchFormInputBox = tw.div`mb-3 pt-0`
export const SidebarCollapseSearchFormInput = tw.input`border-gray-500 placeholder-gray-300 text-gray-600 h-12 w-full rounded border-0 border-solid bg-white px-3 py-2 text-base font-normal leading-snug shadow-none outline-none focus:outline-none`

export const SidebarDividerHr = tw.hr`my-4 md:min-w-full`
export const SidebarMenuHeading = tw.h6`text-gray-500 block pt-1 pb-4 text-xs font-bold uppercase no-underline md:min-w-full`

export const SidebarNavigationUl = tw.ul`flex list-none flex-col md:min-w-full md:flex-col`
export const SidebarNavigationLi = tw.li`items-center`
export const SidebarMenuLink = tw.div`cursor-pointer text-gray-700 hover:text-gray-500 mb-4 block text-xs font-semibold uppercase`

// export const SidebarCollapseContainer = styled.div(
//     ({ CollapseShow }: { CollapseShow: boolean }) => [
//         CollapseShow
//             ? tw`absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none bg-white m-2 py-3 px-6`
//             : tw`top-0 left-0 right-0 z-40 h-auto flex-1  overflow-y-auto overflow-x-hidden rounded relative mt-4 flex flex-col items-stretch opacity-100 shadow-none bg-white`,
//     ]
// )
export const SidebarCollapseContainer = tw.div`top-0 left-0 right-0 z-40 h-auto flex-1  overflow-y-auto overflow-x-hidden rounded relative mt-4 flex flex-col items-stretch opacity-100 shadow-none bg-white`

export const HeaderStateContainer = tw.div`relative pb-32 pt-12`
export const HeaderStateWapper = tw.div`px-4 md:px-10 mx-auto w-full`
export const HeaderStateWapperSub = tw.div``
export const HeaderStatsCards = tw.div`flex flex-wrap`
export const HeaderStatsCardItem = tw.div`w-full lg:w-6/12 xl:w-3/12 px-4`

export const TopbarContainer = tw.nav`top-0 left-0 w-full z-10 bg-transparent flex-row flex-nowrap justify-start flex items-center p-4`
export const TopbarWapper = tw.div`w-full mx-auto items-center flex justify-between flex-wrap px-1`
export const TopbarLeftBox = tw.div`list-none items-center flex`
export const TopbarRightBox = tw.div`flex-row list-none items-center flex`
export const TopbarBelong = tw.div`items-center flex ml-0.5 text-xs`
export const TopbarName = tw.div`items-center flex ml-2 text-lg`
export const TopbarSatus = tw.div`items-center flex ml-2 text-xs`
export const TopbarLoginOut = tw.div`items-center flex ml-2`
export const TopbarLoginOutIcon = tw.img`items-center flex pb-0.5 w-4`
