import tw from 'twin.macro'
import styled from '@emotion/styled'
//

// DefaultPagination
export const PageLoadingStyle = {
    Container: tw.div`absolute bg-white bg-opacity-60 z-10 w-full flex items-center justify-center h-screen`,
    // Wapper: tw.div`flex items-center h-screen`,
    Wapper: styled.div(({ bgImage }: { bgImage: string }) => [
        {
            background: `URL(${bgImage})`,
        },
        tw`items-center bg-cover`,
    ]),
    Text: tw.span`text-xs py-2`,
}
export const PaginationStyle = {
    Container: tw.div`flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4`,
    Wapper: tw.div`flex lg:w-11/12 w-full items-center justify-between border-t border-gray-200 dark:border-gray-700`,
    Left: tw.div`flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer`,
    PreviousText: tw.p`text-sm ml-3 font-medium leading-none`,
    PagingBox: tw.div`sm:flex`,
    Numbering: styled.p(({ Active }: { Active: boolean }) => [
        Active
            ? tw`text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2`
            : tw`text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2`,
    ]),
    Right: tw.div`flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer`,
    NextText: tw.p`text-sm font-medium leading-none mr-3`,
}

export const ElementLoadingStyle = {
    Container: tw.div`bg-white bg-opacity-60 z-10 w-full flex items-center justify-center`,
    Wapper: styled.div(({ bgImage }: { bgImage: string }) => [
        {
            background: `URL(${bgImage})`,
        },
        tw`items-center bg-cover`,
    ]),
    Text: tw.span`text-center text-xs`,
}
