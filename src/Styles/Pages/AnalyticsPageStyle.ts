import tw from 'twin.macro'
// import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ContentsStyle = {
    Container: tw.div`flex flex-col max-h-[75vh] overflow-y-scroll`,
    RowWapper: tw.div`w-full py-2`,
    TitleBox: tw.div`w-full pt-3`,
    ChartBox: tw.div`flex w-full items-center justify-center text-xs font-medium text-gray-600 border border-gray-300`,
    ButtonBox: tw.div`flex py-1 justify-end`,
    TableBox: tw.div`flex w-full items-center justify-center text-xs font-medium text-gray-600 border-gray-300`,
    Table: {
        Table: tw.table`text-center min-w-full table-fixed`,
        Thead: tw.thead`text-xs`,
        TheadRow: tw.tr``,
        TheadCell: tw.th`border bg-m-dip-blue text-xs text-white max-w-xs`,
        TheadCellItem: tw.div`flex w-full justify-center`,
        Body: tw.tbody``,
        Row: tw.tr`w-full`,
        BlankRow: tw.tr`h-5`,
        Cell: tw.td`border text-xs text-gray-500 object-center w-1/12`,
        CellW: tw.td`border text-xs text-gray-500 object-center`,
        CellWW: tw.td`border text-xs text-gray-500 object-center w-2/12`,
        CellBg: tw.td`border text-xs text-white bg-m-dip-blue items-center object-center`,
        TextCell: styled.td(({ Bg }: { Bg?: boolean }) => {
            const returnCss = [tw`border text-xs text-gray-500 object-center`]

            if (Bg) {
                returnCss.push(tw`bg-m-dip-blue`)
            }

            return returnCss
        }),
        CellText: styled.span(
            ({ Color }: { Color: 'red' | 'blue' | 'gray' | 'white' }) => {
                const returnCss = [tw`text-xs`]

                if (Color === 'red') {
                    returnCss.push(tw`text-red-600`)
                } else if (Color === 'blue') {
                    returnCss.push(tw`text-blue-600`)
                } else if (Color === 'white') {
                    returnCss.push(tw`text-white`)
                } else {
                    returnCss.push(tw`text-gray-600`)
                }

                return returnCss
            }
        ),
        TFoot: tw.tfoot`text-xs border`,
        TFootRow: tw.tr``,
        TFootCell: tw.th`border bg-m-dip-blue text-xs text-white`,
    },
}
