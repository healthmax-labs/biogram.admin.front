import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { ContentType, WidthType } from '@CommonTypes'

export const SelectStyle = {
    DefaultSearchSelect: tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
}

export const VarySelectBoxStyle = {
    Wapper: styled.div(({ Width }: { Width?: WidthType | null }) => {
        const returnTw = [tw`flex items-center`]

        if (Width) {
            returnTw.push(ConstStyle.width[Width])
        } else {
            returnTw.push(tw`w-full`)
        }

        return returnTw
    }),
    Select: styled.select(
        ({ ContentsType = 'default' }: { ContentsType: ContentType }) => {
            const returnTw = [
                tw`form-select h-8 w-full  rounded-md shadow-sm text-xs`,
            ]

            if (ContentsType === 'search') {
                returnTw.push(
                    tw`px-3 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white`
                )
            } else {
                returnTw.push(
                    tw`border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 leading-none transition border-gray-300 bg-gray-300 block bg-mercury`
                )
            }

            return returnTw
        }
    ),
}
