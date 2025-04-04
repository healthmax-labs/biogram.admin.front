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
    Container: tw.div`flex items-center justify-center`,
    Wapper: tw.div`flex w-full items-center justify-between border-t border-gray-200`,
    Left: styled.div(({ Active }: { Active: boolean }) => {
        const returnTw = [tw`flex items-center text-gray-600`]

        if (Active) {
            returnTw.push(tw`cursor-pointer`)
        }

        return returnTw
    }),
    PreviousText: tw.p`text-sm ml-3 font-medium leading-none`,
    PagingBox: tw.div`flex`,
    Numbering: styled.p(({ Active }: { Active: boolean }) => [
        Active
            ? tw`text-sm font-medium leading-none cursor-pointer text-blueberry border-t border-blueberry pt-3 mr-4 px-2`
            : tw`text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-blueberry border-t border-transparent hover:border-blueberry pt-3 mr-4 px-2`,
    ]),
    Right: styled.div(({ Active }: { Active: boolean }) => {
        const returnTw = [tw`flex items-center text-gray-600`]

        if (Active) {
            returnTw.push(tw`cursor-pointer`)
        }

        return returnTw
    }),
    NextText: tw.p`text-sm font-medium leading-none mr-3`,
}

export const ElementLoadingStyle = {
    Container: styled.div(({ FullScreen }: { FullScreen: boolean }) => [
        FullScreen
            ? tw`bg-white bg-transparent z-10 w-full flex h-screen items-center justify-center`
            : tw`bg-white bg-transparent z-10 w-full flex h-full items-center justify-center`,
    ]),
    Wapper: styled.div(({ bgImage }: { bgImage: string }) => [
        {
            background: `URL(${bgImage})`,
        },
        tw`items-center bg-cover`,
    ]),
    Text: tw.span`text-center text-xs`,
}

export const TableLoadingStyle = {
    Container: tw.div`bg-white bg-opacity-60 z-10 w-full flex items-center justify-center`,
    Wapper: styled.div(({ bgImage }: { bgImage: string }) => [
        {
            background: `URL(${bgImage})`,
        },
        tw`items-center bg-cover`,
    ]),
    Text: tw.span`text-center text-xs`,
}
