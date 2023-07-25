import tw from 'twin.macro'
import styled from '@emotion/styled'
import { TextColorType, TextAlignType } from '@CommonTypes'

export const DashboardStyle = {
    GeonDaonStyle: {
        Container: tw.div`flex w-full p-4`,
        MainWapper: tw.div`flex w-center-width bg-gray-200`,
        Wapper: tw.div`flex flex-wrap w-full`,
        ChartWapper: tw.div`flex w-full gap-4`,
        SearchBox: tw.div`flex px-2 pb-2 items-center object-center`,
        SearchItem: {
            ItemWapper: tw.div`flex w-full gap-1`,
            Selector: tw.div`flex`,
            SearchBotton: tw.div`flex object-center justify-end w-full items-center`,
        },
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
            ChartWapper: tw.div`border-b border-gray-200 w-full`,
            TableBox: {
                Table: tw.table`table-fixed divide-y divide-green-400 w-full`,
                Body: tw.tbody`bg-white divide-y divide-gray-100`,
                Row: tw.tr`whitespace-nowrap rounded-xl`,
                Cell: styled.td(
                    ({
                        textColor,
                        TextAlign,
                    }: {
                        textColor?: TextColorType
                        TextAlign?: TextAlignType
                    }) => {
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

                        if (TextAlign == 'left') {
                            returnTw.push(tw`text-left`)
                        } else if (TextAlign == 'center') {
                            returnTw.push(tw`text-center`)
                        } else if (TextAlign == 'right') {
                            returnTw.push(tw`text-right`)
                        }

                        return returnTw
                    }
                ),
                TextBox: tw.div`text-xs text-gray-900`,
            },
        },
    },
}
