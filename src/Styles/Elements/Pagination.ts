import tw from 'twin.macro'
import styled from '@emotion/styled'
//

// DefaultPagination
export const Container = tw.div`flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4`
export const Wapper = tw.div`flex lg:w-11/12 w-full items-center justify-between border-t border-gray-200 dark:border-gray-700`

export const LeftBox = tw.div`flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer`
export const PreviousText = tw.p`text-sm ml-3 font-medium leading-none`
export const PagingBox = tw.div`sm:flex`

// text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2
// text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2
// export const DefaultPaginationNumbering = tw.p`text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2`

export const Numbering = styled.p(({ Active }: { Active: boolean }) => [
    Active
        ? tw`text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2`
        : tw`text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2`,
])

export const RightBox = tw.div`flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer`
export const NextText = tw.p`text-sm font-medium leading-none mr-3`
