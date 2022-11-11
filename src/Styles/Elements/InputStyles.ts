import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { InputWidthType } from '@CommonTypes'

export const InputStyle = {
    DatePicker: tw.input`block h-8 px-3 w-24 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    CheckBox: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    Search: {
        Wapper: tw.div`flex max-w-5xl`,
        Label: tw.label`mb-2 text-sm font-medium text-gray-900 sr-only`,
        Toggle: tw.button`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100`,
        SearchBox: tw.div`relative`,
        Search: tw.input`block p-2.5 w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500`,
        SearchButton: tw.button`absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`,
    },
}

export const VaryInputStyle = {
    Wapper: tw.div`flex items-center text-gray-700`,
    // Input: tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    Input: styled.input(({ Width = `w60` }: { Width?: InputWidthType }) => [
        tw`form-input border-0 px-3 h-8 placeholder-gray-300 text-gray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring ease-linear transition-all duration-150`,
        ConstStyle.width[Width],
        // tw`w-10`,
    ]),
}

export const VaryLabelInputStyle = {
    Wapper: tw.div`flex items-center`,
    InputLabel: tw.label`block uppercase text-gray-600 text-xs w-2/12 font-bold`,
    Input: styled.input(({ Width = `w60` }: { Width?: InputWidthType }) => [
        tw`form-input border-0 px-3 h-8 placeholder-gray-300 text-gray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring ease-linear transition-all duration-150`,
        ConstStyle.width[Width],
    ]),
}

export const VaryLabelStyle = {
    Wapper: tw.div`flex items-center`,
    InputLabel: styled.label(
        ({ Width = `w60` }: { Width?: InputWidthType }) => [
            tw`block uppercase text-gray-600 text-xs font-bold`,
            ConstStyle.width[Width],
            // tw`w-12`,
        ]
    ),
}
