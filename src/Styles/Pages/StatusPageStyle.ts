import tw from 'twin.macro'
import styled from '@emotion/styled'
import { ConditionsType } from '@CommonTypes'
// import styled from '@emotion/styled'

export const ListComponentStyle = {
    Box: {
        Container: tw.div`flex flex-nowrap w-full`,
        Wapper: tw.div`grid grid-rows-2 grid-flow-col gap-0 w-full h-full`,
        Item: tw.div`w-16 min-w-full`,
    },
    XcptComponent: tw.div`flex w-full text-left pl-3 bg-blush h-8 items-center text-etext`,
    TableConditionsCellWapper: tw.div`flex flex-nowrap w-full items-center justify-center gap-7`,
    TableConditionsCell: styled.div(
        ({ Conditions }: { Conditions: string | ConditionsType }) => {
            const returnTw = [tw`flex items-center w-3 h-3 rounded-full`]

            if (Conditions === `주의`) {
                returnTw.push(tw`bg-orange-300`)
            } else if (Conditions === `나쁨`) {
                returnTw.push(tw`bg-red-500`)
            } else if (Conditions === `매우나쁨`) {
                returnTw.push(tw`bg-red-500`)
            }

            return returnTw
        }
    ),
    TableConditionsCellText: tw.p`text-xs`,
}
