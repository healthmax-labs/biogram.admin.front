import tw from 'twin.macro'
import styled from '@emotion/styled'
import { WidthType } from '@Type/CommonTypes'
import ConstStyle from '@Style/ConstStyle'
//

export const TableStyle = {
    Container: tw.div`flex flex-col h-screen max-h-[77vh]`,
    Wapper: tw.div`overflow-auto`,
    Table1: tw.table`table-fixed w-full border`,
    Table: styled.table(({ tableType }: { tableType: `auto` | `fixed` }) => {
        const returnTw = [tw`w-full border`]

        if (tableType === 'auto') {
            returnTw.push(tw`table-auto`)
        } else if (tableType === 'fixed') {
            returnTw.push(tw`table-fixed`)
        }

        return returnTw
    }),
    Thead: tw.thead``,
    HeaderRow: styled.tr(({ Step }: { Step: number }) => {
        const returnTw = [tw`sticky bg-steel h-8`]

        if (Step === 0) {
            returnTw.push(tw`top-0`)
        } else if (Step === 1) {
            returnTw.push(tw`top-8`)
        }

        return returnTw
    }),
    HeaderCell1: tw.th`z-[1100] bg-steel px-2 h-8 align-middle text-xs whitespace-nowrap text-white border border-gray-100`,
    HeaderCell: styled.th(({ cellWidth }: { cellWidth?: WidthType }) => {
        const returnTw = [
            tw`z-[1100] bg-steel px-2 h-8 align-middle text-xs whitespace-nowrap text-white border border-gray-100`,
        ]

        if (cellWidth) {
            returnTw.push(ConstStyle.width[cellWidth as WidthType])
        }

        return returnTw
    }),
    Tbody: tw.tbody`divide-y`,
    TbodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`bg-mercury max-h-9 items-center cursor-pointer hover:bg-daisy`
            : tw`bg-pearl h-9 items-center cursor-pointer hover:bg-daisy`,
    ]),
    TbodyCell: styled.td(
        ({
            textAlign,
        }: {
            textAlign?: string | 'left' | 'center' | 'right'
        }) => {
            const returnTw = [tw`h-8 text-center text-xs truncate`]

            if (textAlign && textAlign === 'left') {
                returnTw.push(tw`text-left`)
            } else if (textAlign && textAlign === 'center') {
                returnTw.push(tw`text-center`)
            } else if (textAlign && textAlign === 'right') {
                returnTw.push(tw`text-right`)
            } else {
                returnTw.push(tw`text-center`)
            }

            return returnTw
        }
    ),
}

export const DetailTableStyle = {
    TableContainer: tw.table`table-fixed w-full`,
    TableWapper: tw.tbody`bg-white`,
    Row: tw.tr`whitespace-nowrap max-h-11 w-full`,
    LabelCell: tw.td`px-6 w-1/4 text-sm text-gray-500 border`,
    InputCell: tw.td`px-6 w-3/4 py-1 border h-8`,
    InputCellFull: tw.td`border h-8`,
    QuilEditorLabelCell: tw.td`px-6 w-1/4 text-sm text-gray-500 border`,
    QuilEditorCell: tw.td`px-6 w-3/4 py-1 border min-h-screen`,
    InputItem: tw.div`w-full`,
    InputFullItem: tw.div`w-full`,
    ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
    ButtonItem: tw.div`pl-1`,
}

export const CommonListTableStyle = {
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center text-center`,
    TableHeader: tw.thead`w-full flex text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-steel items-center`,
    HeaderCheckbox: tw.th`p-4 w-1/12 px-1 align-middle py-1 text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    HeaderCell: tw.th`flex p-4 w-2/4 px-3 align-middle py-1 items-center justify-center text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    TableBody: tw.tbody`w-full h-[59vh] bg-gray-100 flex flex-col text-center items-center overflow-y-scroll`,
    TableBodyS: tw.tbody`w-full bg-gray-100 flex flex-col text-center items-center overflow-y-scroll`,
    TableBodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-mercury h-9 items-center cursor-pointer hover:bg-daisy text-center`
            : tw`flex w-full bg-pearl h-9 items-center cursor-pointer hover:bg-daisy text-center`,
    ]),
    TableBodyCell: tw.td`flex items-center w-full justify-center h-9 align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
}
