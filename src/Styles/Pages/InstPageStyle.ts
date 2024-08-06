import tw from 'twin.macro'
import styled from '@emotion/styled'

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    ChargerList: {
        Container: tw.div`w-full py-1`,
        Table: tw.table`w-full bg-transparent border-collapse items-center scrollbar-hide whitespace-nowrap overflow-auto`,
        Tbody: tw.tbody`w-full bg-gray-100 flex flex-col text-center items-center justify-between`,
        TableRow: styled.tr(({ BgState }: { BgState: boolean }) => [
            BgState
                ? tw`flex w-full bg-mercury h-8 items-center cursor-pointer hover:bg-daisy`
                : tw`flex w-full bg-pearl h-8 items-center cursor-pointer hover:bg-daisy`,
        ]),
        TableRowNonBg: tw.tr`flex w-full bg-daisy h-10 items-center cursor-pointer`,
        TableCell: tw.td`flex items-center justify-center w-1/4 h-8 align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
        TableCellFull: tw.td`flex w-full items-center justify-center align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
        TableHeightRow2: tw.tr`flex w-full bg-daisy h-24 items-center`,
        TableHeightRow: styled.tr(({ Height }: { Height: boolean }) => {
            const returnTw = [tw`flex w-full bg-daisy h-24 items-center`]

            if (Height) {
                returnTw.push(tw`h-24`)
            } else {
                returnTw.push(tw`h-14`)
            }

            return returnTw
        }),
        TableBigCell: tw.td`flex w-full items-center justify-center align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
        TableCellBox: tw.div`flex flex-col w-full items-center justify-center gap-1`,
        TableCellBoxInfoAround: tw.div`flex w-full items-center justify-around`,
        TableCellInfoSmallPiece: tw.div`flex w-1/12`,
        TableCellInfoBigPiece: tw.div`flex w-2/12`,
        TableUserInfoBox: tw.div`flex w-full items-center justify-around gap-1`,
        TableUserInfoBoxWapper: tw.div`flex w-full items-center justify-center`,
        TableUserInfoBoxStartWapper: tw.div`flex w-full gap-2 justify-start`,
        TableUserSelectBoxWapper: tw.div`flex items-center justify-end w-44`,
        TableUserDatePickerWapper: tw.div`flex items-center justify-end`,
    },
}
