import tw from 'twin.macro'
import styled from '@emotion/styled'
import { TextColorType } from '@CommonTypes'

export const DashboardStyle = {
    GeonDaonStyle: {
        Container: tw.div`flex w-full p-4`,
        MainWapper: tw.div`flex w-center-width bg-gray-200`,
        Wapper: tw.div`flex w-full gap-4`,
        LeftWapper: tw.div`flex w-1/2 rounded-xl`,
        RightWapper: tw.div`flex w-1/2 rounded-xl`,
        WapperCol: tw.div`flex flex-col w-full gap-2`,
        FlexFull: tw.div`flex w-full`,
        FlexNowrapFull: tw.div`flex flex-nowrap w-full gap-2`,
        FlexHelf: tw.div`flex w-1/2`,
        Card: {
            Container: tw.div`flex w-full p-3 rounded-xl bg-gray-100`,
            Wapper: tw.div`flex flex-col w-full`,
            SpinnerWapper: tw.div`flex w-full h-20 items-center object-center justify-center`,
            TitleWapper: tw.div`flex w-full justify-between px-2 pb-1`,
            TitleBox: tw.div`flex flex-nowrap items-center`,
            TableWapper: tw.div`border-b border-gray-200 w-full`,
            Table: tw.table`divide-y divide-green-400 w-full`,
            Body: tw.tbody`bg-white divide-y divide-gray-100`,
            Row: tw.tr`whitespace-nowrap rounded-xl`,
            Cell: styled.td(({ textColor }: { textColor?: TextColorType }) => {
                const returnTw = [tw`px-2 py-1 text-xs h-8`]

                if (textColor == 'gray') {
                    returnTw.push(tw`text-gray-500`)
                } else if (textColor === 'green') {
                    returnTw.push(tw`text-teal-600`)
                } else if (textColor === 'orange') {
                    returnTw.push(tw`text-orange-600`)
                } else if (textColor === 'blue') {
                    returnTw.push(tw`text-blue-600`)
                } else if (textColor === 'pink') {
                    returnTw.push(tw`text-pink-600`)
                }

                return returnTw
            }),
            TextBox: tw.div`text-xs text-gray-900`,
        },
    },
}
