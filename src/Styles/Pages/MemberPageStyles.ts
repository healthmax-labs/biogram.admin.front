import tw from 'twin.macro'
// import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const MainStyle = {
    SearchWapper: tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`,
    ManageWapper: tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`,
    TableWapper: tw.div`block w-full overflow-x-auto`,
}

export const SearchBoxStyle = {
    Container: tw.div`mt-0`,
    Wapper: tw.div`grid grid-cols-2 gap-1`,
    Item: tw.div`text-gray-700 flex items-center`,
    LabelItem: tw.div`w-40`,
    Label: tw.label`inline-block align-baseline text-xs uppercase whitespace-nowrap text-left text-gray-500`,
    LabelText: tw.p`text-xs uppercase whitespace-nowrap text-left text-gray-500`,
    LabelItemBox: tw.div`w-1/6`,
    Select: tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    Input: tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    DatepickerBox: tw.div`grid grid-rows-1 grid-flow-col gap-1`,
    Datepicker: tw.div`flex flex-row`,
    DatepickerLine: tw.p`px-5 inline-block align-baseline pt-2`,
    Relative: tw.div`relative`,
    SearchButtonBox: tw.div`absolute bottom-0 -right-2`,
}

export const ListTableStyle = {
    MbtlnumCell: styled.div(({ CRTFC }: { CRTFC: 'Y' | 'N' }) => [
        CRTFC === 'Y' ? tw`` : tw`text-red-700`,
    ]),
}

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    MemoContainer: tw.div`flex flex-col break-words bg-white`,
    PstinstInfoList: {
        Container: tw.div`px-1 py-0`,
        Table: tw.table`w-full bg-transparent border-collapse items-center scrollbar-hide whitespace-nowrap overflow-auto`,
        Tbody: tw.tbody`w-full bg-gray-100 flex flex-col text-center items-center justify-between`,
        TableRow: tw.tr`flex w-full bg-white h-8 items-center cursor-pointer hover:bg-green-200`,
        TableCell: tw.td`flex items-center justify-center w-1/4 h-8 align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
    },
    ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
    ButtonItem: tw.div`pl-1`,
}

export const ConsultDetailStyle = {
    Tabs: {
        Container: tw.div`pt-2 `,
        Rows: tw.ul`flex flex-wrap text-xs text-center text-gray-500 border-b border-gray-200`,
        Cells: tw.li`mr-2`,
        Items: styled.div(({ Active }: { Active: boolean }) => [
            tw`inline-block p-2 rounded-t-lg`,
            Active
                ? tw`text-blue-600 bg-gray-100`
                : tw`hover:text-gray-600 hover:bg-gray-50 cursor-pointer`,
        ]),
    },
    Detail: {
        Container: tw.div`flex flex-col max-h-[75vh] overflow-y-scroll`,
        MyData: {
            Wapper: tw.table`min-w-full text-center`,
            Head: tw.thead`h-8 border text-xs bg-m-dip-blue font-medium`,
            HeadRow: tw.tr`h-8`,
            HeadCell: tw.th`h-8 text-xs font-medium text-white border-l border-l-gray-50`,
            Body: tw.tbody``,
            BodyRow: tw.tr`bg-white border`,
            BodyCellBef1: tw.td`h-8 border-r text-xs font-bold text-gray-900 whitespace-nowrap`,
            BodyCellBef: tw.td`h-8 border-r text-xs font-bold text-gray-900 whitespace-nowrap`,
            BodyCellBefLink: tw.div`cursor-pointer`,
            // BodyCell: tw.td`h-8 border-r text-xs text-gray-600 whitespace-nowrap`,
            BodyCell: styled.td(
                ({ Color }: { Color?: 'block' | 'red' | 'green' }) => {
                    const returnCss = [
                        tw`h-8 border-r text-xs whitespace-nowrap`,
                    ]

                    if (Color && Color === 'red') {
                        returnCss.push(tw`text-red-600`)
                    } else if (Color && Color === 'green') {
                        returnCss.push(tw`text-green-500`)
                    } else {
                        returnCss.push(tw`text-gray-600`)
                    }

                    return returnCss
                }
            ),
        },
        MealDiary: {
            RowWapper: tw.div`w-full`,
            Search: {
                SearchBox: tw.div`flex flex-nowrap w-full border justify-end`,
                SearchItem: tw.div`flex py-2`,
            },
            TitleBox: tw.div`w-full pt-3 text-xs font-medium text-gray-600`,
            Table: {
                Table: tw.table`text-center min-w-full shadow-md rounded`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`border bg-m-dip-blue text-xs text-white`,
                TheadCellItem: tw.div`flex w-full justify-center`,
                Body: tw.tbody``,
                Row: tw.tr``,
                BlankRow: tw.tr`h-5`,
                Cell: tw.td`border text-xs text-gray-500 object-center`,
                CellBg: tw.td`border text-xs text-white bg-m-dip-blue items-center object-center`,
                TextCell: styled.td(({ Bg }: { Bg?: boolean }) => {
                    const returnCss = [
                        tw`border text-xs text-gray-500 object-center`,
                    ]

                    if (Bg) {
                        returnCss.push(tw`bg-m-dip-blue`)
                    }

                    return returnCss
                }),
                CellText: styled.span(
                    ({
                        Color,
                    }: {
                        Color: 'red' | 'blue' | 'gray' | 'white'
                    }) => {
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
            },
            History: {
                Wapper: tw.div`w-full`,
                ButtonBox: tw.div`flex flex-nowrap gap-2 pt-2`,
            },
        },
        Survey: {
            RowWapper: tw.div`w-full pb-1`,
            Table: {
                Table: tw.table`text-left min-w-full shadow-md rounded`,
                Body: tw.tbody``,
                Row: tw.tr``,
                CellBg: tw.td`border bg-m-dip-blue text-xs text-white `,
                Cell: tw.td`border text-xs text-gray-500`,
            },
        },
        MyCoach: {
            RowWapper: tw.div`w-full pb-1`,
            SearchWapper: tw.div`flex flex-nowrap w-full border`,
            SearchBox: tw.div`flex py-2 items-center w-full justify-end`,
            SearchItem: tw.div`flex py-2`,
            TableBox: tw.div`flex`,
            Table: {
                Table: tw.table`text-center min-w-full shadow-md rounded`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`bg-m-dip-blue text-xs text-white h-8`,
                TheadYCell: tw.th`bg-yellow-300 text-xs text-white h-8`,
                Body: tw.tbody``,
                Row: tw.tr``,
                CellBg: tw.td`border bg-m-dip-blue text-xs text-white h-8`,
                Cell: tw.td`border text-xs text-gray-500 h-8`,
                TFoot: tw.tfoot`text-xs border bg-gray-500`,
                TFootRow: tw.tr``,
                TFootCell: tw.th`bg-m-dip-blue text-xs text-white h-8`,
            },
        },
        RawAge: {
            RowWapper: tw.div`w-full pb-1`,
            Table: {
                Table: tw.table`text-center min-w-full shadow-md rounded`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`bg-m-dip-blue text-xs text-white`,
                TheadYCell: tw.th`bg-yellow-300 text-xs text-white`,
                Body: tw.tbody``,
                Row: tw.tr``,
                CellBg: tw.td`border bg-m-dip-blue text-xs text-white `,
                Cell: tw.td`border text-xs text-gray-500`,
                TFoot: tw.tfoot`text-xs border bg-gray-500`,
                TFootRow: tw.tr``,
                TFootCell: tw.th`bg-m-dip-blue text-xs text-white`,
            },
        },
    },
    Message: {
        Container: tw.div`flex flex-col break-words bg-white`,
    },
}
