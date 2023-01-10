import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { BgColorType } from '@CommonTypes'

export const ButtonStyle = {
    Hamburger: {
        Box: tw.div`cursor-pointer p-1.5 space-y-1 bg-blueberry rounded shadow`,
        Item: tw.span`block w-2.5 h-0.5 bg-gray-100 animate-pulse`,
    },
    DefaultSearch: tw.button`text-center items-center px-3 py-1.5 bg-blueberry hover:bg-blueberry text-white text-xs font-medium rounded-md`,
    // Manage: tw.button`inline-flex items-center px-1.5 py-1.5 bg-eggplant hover:bg-blueberry text-white text-xs font-medium rounded-md`,
    Manage: tw.button`px-1.5 py-1.5 bg-transparent hover:bg-eggplant text-eggplant font-semibold hover:text-white border border-eggplant hover:border-transparent rounded`,
    DatePickerButton: tw.button`block h-8 px-3 w-24 bg-white rounded-md border-eggplant shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    // VaryButtonStyle: styled.button(({ bgColor }: { bgColor: BgColorType }) => [
    //     tw`inline-flex items-center px-3 py-1 hover:bg-blueberry text-white text-xs rounded-md`,
    //     ConstStyle.bgColor[bgColor],
    // ]),
    VaryRadioButtonStyle: {
        Input: tw.input`appearance-none rounded-full justify-center items-center h-3 w-3 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
        Label: tw.label`inline-block text-gray-800 text-xs`,
    },
    VaryButtonStyle: {
        Button: styled.button(
            ({
                ButtonType,
                Active,
                bgColor,
            }: {
                ButtonType: `button` | `info` | `manage`
                Active: boolean | null
                bgColor: BgColorType | null
            }) => {
                const returnTw = []

                if (ButtonType === 'info') {
                    returnTw.push(
                        tw`inline-flex items-center bg-white text-black text-xs rounded-md mx-1 no-underline hover:underline`
                    )
                } else if (ButtonType === 'button') {
                    if (Active) {
                        returnTw.push(
                            tw`bg-transparent bg-blueberry text-xs text-white hover:bg-blueberry py-1 px-4 border border-gray-300 hover:border-transparent rounded`
                        )
                    } else {
                        returnTw.push(
                            tw`bg-transparent hover:bg-blueberry text-xs text-gray-500 hover:text-white py-1 px-4 border border-gray-300 hover:border-transparent rounded`
                        )
                    }
                } else if (ButtonType === `manage`) {
                    returnTw.push(
                        tw`px-1.5 py-1.5 bg-transparent hover:bg-eggplant text-eggplant font-semibold hover:text-white border border-eggplant hover:border-transparent rounded`
                    )
                }

                if (bgColor) {
                    returnTw.push(ConstStyle.bgColor[bgColor])
                }

                return returnTw
            }
        ),
    },
}
