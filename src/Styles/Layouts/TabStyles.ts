import tw from 'twin.macro'
import styled from '@emotion/styled'

export const MainTabStyle = {
    MainUl: tw.ul`flex flex-wrap text-xs text-center text-gray-500 border-b border-gray-200`,
    MainLi: tw.li`mr-2`,
    ButtonWapper: tw.div`flex flex-row p-1 bg-gray-100 rounded-t-lg items-center object-center`,
    TabButton: styled.button(({ Active }: { Active: boolean }) => [
        Active
            ? tw`flex text-m-blue bg-gray-100 rounded-t-lg`
            : tw`flex items-center object-center rounded-t-lg hover:text-gray-600 hover:bg-gray-50`,
    ]),
    CloseButton: tw.button`bg-white ml-1 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`,
}
