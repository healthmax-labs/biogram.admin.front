import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import {
    ContentType,
    TextAlignType,
    TextColorType,
    WidthType,
} from '@CommonTypes'

export const InputStyle = {
    DatePickerWapper: styled.div(({ Width }: { Width?: WidthType | null }) => {
        const returnTw = [tw`flex items-center gap-1`]

        if (Width) {
            returnTw.push(ConstStyle.width[Width])
        } else {
            returnTw.push(tw`w-full`)
        }

        return returnTw
    }),
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

export const VaryLabelInputStyle = {
    Wapper: tw.div`flex items-center gap-2`,
    InputLabel: tw.label`block uppercase text-gray-600 text-xs w-2/12 font-bold`,
    Input: styled.input(({ Width = `w60` }: { Width?: WidthType }) => [
        tw`form-input block h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
        ConstStyle.width[Width],
    ]),
}

export const VaryInputStyle = {
    Wapper: styled.div(
        ({ Flex, Width }: { Flex?: boolean; Width?: WidthType | null }) => {
            const returnTw = []

            if (Flex) {
                returnTw.push(tw`flex items-center gap-1`)
            }

            if (Width) {
                returnTw.push(ConstStyle.width[Width])
            } else {
                returnTw.push(tw`w-full`)
            }

            return returnTw
        }
    ),
    CheckBox: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    RadioButton: tw.input`w-4 h-4 appearance-none rounded-full border border-gray-300 bg-gray-100 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer`,
    Input: styled.input(
        ({
            ContentsType = 'default',
            Disabled,
        }: {
            ContentsType?: ContentType
            Disabled?: boolean
        }) => {
            const returnTw = [tw`form-input block h-8 w-full text-xs`]

            if (Disabled) {
                returnTw.push(
                    tw`border-0 leading-none transition cursor-not-allowed`
                )
            } else if (ContentsType === 'search') {
                returnTw.push(
                    tw`rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`
                )
            } else {
                returnTw.push(
                    tw`rounded-md shadow-sm border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 leading-none transition bg-mercury`
                )
            }

            return returnTw
        }
    ),
}

export const VaryLabelStyle = {
    Wapper: styled.div(({ Reverse }: { Reverse: boolean }) => {
        const returnTw = [
            tw`flex items-center object-center justify-center text-center gap-1`,
        ]

        if (Reverse) {
            returnTw.push(tw`flex-row-reverse`)
        }

        return returnTw
    }),
    InputLabel: styled.label(
        ({
            Width,
            TextColor,
            TextAlign,
            CursorPointer,
        }: {
            Width?: WidthType | null
            TextColor: TextColorType
            TextAlign: TextAlignType
            CursorPointer?: boolean
        }) => {
            const returnTw = [tw`block text-xs`]

            if (TextAlign == 'left') {
                returnTw.push(tw`text-left`)
            } else if (TextAlign == 'center') {
                returnTw.push(tw`text-center`)
            } else if (TextAlign == 'right') {
                returnTw.push(tw`text-right`)
            }

            if (Width && Width) {
                returnTw.push(ConstStyle.width[Width])
            }

            if (TextColor === 'gray') {
                returnTw.push(tw`text-gray-500`)
            }

            if (CursorPointer) {
                returnTw.push(tw`cursor-pointer`)
            }

            return returnTw
        }
    ),
}

export const VaryLabelTextAreaStyle = {
    TextArea: tw.textarea`block p-2.5 w-full text-xs text-gray-900 bg-gray-100 border-0 focus:ring-blue-500 focus:border-blue-500`,
}
