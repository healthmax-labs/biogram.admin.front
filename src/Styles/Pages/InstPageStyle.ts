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
    },
}
