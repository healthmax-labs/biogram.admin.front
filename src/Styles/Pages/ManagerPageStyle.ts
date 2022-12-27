import tw from 'twin.macro'

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    Stplat: {
        ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
        ButtonItem: tw.div`flex pl-1`,
        Table: {
            Wapper: tw.table`min-w-full text-center`,
            Head: tw.thead`h-8 border text-xs bg-m-dip-blue font-medium`,
            HeadRow: tw.tr`h-8`,
            HeadCell: tw.th`h-8 text-xs font-medium text-white border-l border-l-gray-50`,
            Body: tw.tbody``,
            BodyRow: tw.tr`bg-white border cursor-pointer`,
            BodyCell: tw.td`h-8 border-r text-xs whitespace-nowrap text-gray-600`,
        },
    },
}
