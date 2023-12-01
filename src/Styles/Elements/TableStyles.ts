import tw from 'twin.macro'
import styled from '@emotion/styled'
import { WidthType } from '@Type/CommonTypes'
import ConstStyle from '@Style/ConstStyle'
//

export const TableStyle = {
    Container: tw.div`flex flex-col h-screen max-h-[75vh]`,
    Wapper: tw.div`overflow-auto`,
    PaginationWapper: tw.div`block w-full pt-2`,
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
    CellTextBox: tw.div`flex w-full text-center items-center justify-center`,
    CellText: tw.span`flex w-full text-center items-center justify-center`,
}

export const DetailTableStyle = {
    TableContainer: tw.table`table-fixed w-full`,
    TableWapper: tw.tbody`bg-white`,
    Row: tw.tr`whitespace-nowrap max-h-11 w-full`,
    LabelCell: tw.td`px-6 w-36 text-sm text-gray-500 border`,
    InputCell: styled.td(({ NoWarp }: { NoWarp?: boolean }) => {
        const returnTw = [tw`px-6 py-1 border h-8`]

        if (NoWarp) {
            // returnTw.push(tw`flex flex-nowrap`)
        }

        return returnTw
    }),
    QuilEditorLabelCell: tw.td`px-6 w-1/4 text-sm text-gray-500 border`,
    QuilEditorCell: tw.td`px-6 w-3/4 py-1 border min-h-screen`,
    InputItem: tw.div`w-full`,
    InputFullItem: tw.div`w-full`,
    ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
    ButtonItem: tw.div`pl-1`,
}

export const CommonListTableStyle = {
    TableWapper: tw.table`table-auto w-full bg-transparent border-collapse items-center text-center`,
    TableHeader: tw.thead`w-full flex text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-steel items-center`,
    HeaderCheckbox: tw.th`p-4 w-1/12 px-1 align-middle text-xs whitespace-nowrap text-center text-white`,
    HeaderCell: styled.th(({ Border }: { Border?: boolean }) => {
        const returnTw = [
            tw`flex p-4 w-2/4 px-3 align-middle items-center justify-center text-xs whitespace-nowrap text-center text-white`,
        ]

        if (Border) {
            returnTw.push(tw`border border-gray-100`)
        }

        return returnTw
    }),
    TableBody: styled.tbody(
        ({
            HeightLimit,
            Scroll,
        }: {
            HeightLimit: boolean
            Scroll: boolean
        }) => {
            const returnTw = [
                tw`w-full bg-gray-100 flex flex-col text-center items-center`,
            ]

            if (Scroll) {
                returnTw.push(tw`overflow-y-scroll`)
            }

            if (HeightLimit) {
                returnTw.push(tw`h-[59vh]`)
            }

            return returnTw
        }
    ),
    TableBodyS: tw.tbody`w-full bg-gray-100 flex flex-col text-center items-center overflow-y-scroll`,
    TableBodyRow: styled.tr(
        ({
            BgState,
            FullHeight,
        }: {
            BgState: boolean
            FullHeight?: boolean
        }) => {
            const returnTw = [
                tw`flex w-full items-center cursor-pointer hover:bg-daisy text-center`,
            ]

            if (BgState) {
                returnTw.push(tw`bg-mercury`)
            } else {
                returnTw.push(tw`bg-pearl`)
            }

            if (FullHeight) {
                returnTw.push(tw`h-full`)
            } else {
                returnTw.push(tw`h-9`)
            }

            return returnTw
        }
    ),
    TableBodyCell: styled.td(
        ({
            Border,
            FullHeight,
        }: {
            Border?: boolean
            FullHeight?: boolean
        }) => {
            const returnTw = [
                tw`flex items-center w-full justify-center align-middle text-xs text-center truncate text-gray-500`,
            ]

            if (Border) {
                returnTw.push(tw`border border-gray-200`)
            }

            if (FullHeight) {
                returnTw.push(tw`h-screen items-center`)
            } else {
                returnTw.push(tw`h-9`)
            }

            return returnTw
        }
    ),
}

export const ModalDefaultTableStyle = {
    TableBox: tw.div`overflow-x-auto relative shadow-md`,
    InputWapper: tw.div`pb-1`,
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center`,
    TableHeader: tw.thead`w-full text-left text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-steel items-center`,
    HeaderCell: tw.th`p-4 w-2/4 px-3 align-middle py-1 text-xs uppercase border-l-2 border-r-2 whitespace-nowrap text-center text-white border-gray-500`,
    TableBody: tw.tbody`w-full h-[50vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`,
    TableBodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-white h-8 items-center border-b-2`
            : tw`flex w-full h-8 items-center border-b-2`,
    ]),
    TableBodyCell: tw.td`text-center justify-center w-2/4 py-2 h-8 text-xs border-r-2 text-gray-500 border-gray-100`,
    TableBodyEmptyCell: tw.td`text-center justify-center w-2/4 py-2 h-8 text-xs border-r-2 text-gray-500 border-gray-100`,
    ItemWapper: tw.div`flex items-center justify-center mb-1 ml-3`,
    ItemCols: tw.div`grid grid-cols-1`,
}
