import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { BgColorType } from '@CommonTypes'

export const ButtonStyle = {
    Hamburger: {
        Box: tw.div`cursor-pointer p-1.5 space-y-1 bg-m-blue rounded shadow`,
        Item: tw.span`block w-2.5 h-0.5 bg-gray-100 animate-pulse`,
    },
    DefaultSearch: tw.button`text-center h-8 items-center w-20 bg-m-blue hover:bg-m-blue text-white text-xs font-medium rounded-md`,
    Manage: tw.button`inline-flex items-center px-3 py-1.5 bg-m-b-blue hover:bg-m-blue text-white text-xs font-medium rounded-md mx-2`,
    DatePickerButton: tw.button`block h-8 px-3 w-24 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    VaryButtonStyle: styled.button(({ bgColor }: { bgColor: BgColorType }) => [
        tw`inline-flex items-center px-3 py-1 hover:bg-m-blue text-white text-xs rounded-md`,
        ConstStyle.bgColor[bgColor],
    ]),
    VaryRadioButtonStyle: {
        Input: tw.input`appearance-none rounded-full justify-center items-center h-3 w-3 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
        Label: tw.label`inline-block text-gray-800 text-xs`,
    },
    VaryInfoButtonStyle: {
        Button: tw.button`inline-flex items-center bg-white text-black text-xs rounded-md mx-1 no-underline hover:underline`,
    },
}
