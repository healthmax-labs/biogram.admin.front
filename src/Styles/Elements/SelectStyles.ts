import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { ContentType, InputWidthType } from '@CommonTypes'

export const SelectStyle = {
    DefaultSearchSelect: tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
}

export const VarySelectBoxStyle = {
    Wapper1: tw.div`flex items-center w-60`,
    Wapper: styled.div(({ Width }: { Width?: InputWidthType | null }) => {
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
            const returnTw = []

            if (ContentsType === 'search') {
                returnTw.push(
                    tw`form-select block h-8 px-3 w-24 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`
                )
            } else {
                returnTw.push(
                    tw`form-select h-8 border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs leading-none transition border-gray-300 bg-gray-300 block w-full`
                )
            }

            return returnTw
        }
    ),
}
