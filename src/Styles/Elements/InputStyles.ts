import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { InputWidthType, ContentType, InputBgColorType } from '@CommonTypes'

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

export const VaryLabelInputStyle = {
    Wapper: tw.div`flex items-center`,
    InputLabel: tw.label`block uppercase text-gray-600 text-xs w-2/12 font-bold`,
    Input: styled.input(({ Width = `w60` }: { Width?: InputWidthType }) => [
        // tw`form-input border-0 px-3 h-8 placeholder-gray-300 text-gray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring ease-linear transition-all duration-150`,
        tw`form-input block h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
        ConstStyle.width[Width],
    ]),
}

// export const VaryInputStyle = {
//     Wapper: tw.div`flex items-center`,
//     CheckBox: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
//     // Input: tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
//     Input: styled.input(
//         ({
//             ContentsType,
//             Disabled,
//             Width = `w60`,
//         }: {
//             ContentsType?: ContentType
//             Disabled?: boolean
//             Width?: InputWidthType
//         }) => [
//             Disabled
//                 ? tw`form-input block h-8 border-gray-300 bg-white border-0 bg-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs leading-none transition cursor-not-allowed`
//                 : tw`form-input block h-8 bg-white border-0 text-xs leading-none transition cursor-not-allowed pl-1`,
//             tw`block h-8 px-3 w-24 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
//             ConstStyle.width[Width],
//         ]
//     ),
// }

export const VaryInputStyle = {
    Wapper: tw.div`flex items-center`,
    CheckBox: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    // Input: tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    Input: styled.input(
        ({
            ContentsType = 'default',
            Bg,
            Disabled,
            Width,
        }: {
            ContentsType?: ContentType
            Bg?: InputBgColorType
            Disabled?: boolean
            Width?: InputWidthType | null
        }) => {
            let returnTw

            if (Disabled) {
                returnTw = [
                    tw`form-input block h-8 border-0 text-xs leading-none transition cursor-not-allowed pl-1`,
                ]
            } else if (ContentsType === 'search') {
                returnTw = [
                    tw`block h-8 px-3 w-24 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
                ]
            } else {
                returnTw = [
                    tw`form-input block h-8 border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs leading-none transition`,
                ]
            }

            if (Bg && Bg === 'white') {
                returnTw.push(tw`bg-white`)
            } else if (Bg && Bg === 'gray1') {
                returnTw.push(tw`border-gray-300 bg-gray-300`)
            } else if (Bg && Bg === 'gray2') {
                returnTw.push(tw`border-gray-100 bg-gray-100`)
            } else {
                returnTw.push(tw`border-gray-300 bg-gray-300`)
            }

            if (Width) {
                returnTw.push(ConstStyle.width[Width])
            } else {
                returnTw.push(tw`w-full`)
            }

            return returnTw
        }
    ),
}

export const VaryLabelStyle = {
    Wapper: styled.div(({ Reverse }: { Reverse: boolean }) => {
        const returnTw = [tw`flex items-center object-center`]

        if (Reverse) {
            returnTw.push(tw`flex-row-reverse`)
        }

        returnTw.push(tw`items-center object-center`)

        return returnTw
    }),
    InputLabel: styled.label(
        ({
            Width,
            TextColor,
        }: {
            Width?: InputWidthType
            TextColor: 'gray' | 'white'
        }) => [
            tw`block text-xs`,
            Width ? ConstStyle.width[Width] : tw``,
            TextColor === 'gray' ? tw`text-gray-500` : tw``,
        ]
    ),
    CheckBox: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
}

export const VaryLabelTextAreaStyle = {
    TextArea: tw.textarea`block p-2.5 w-full text-xs text-gray-900 bg-gray-100 border-0 focus:ring-blue-500 focus:border-blue-500`,
}
