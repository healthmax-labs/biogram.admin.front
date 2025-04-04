import tw from 'twin.macro'
// import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ListTableItemStyle = {
    MbtlnumCell: styled.div(({ CRTFC }: { CRTFC: 'Y' | 'N' }) => [
        CRTFC === 'Y' ? tw`` : tw`text-red-700`,
    ]),
}

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    MemoContainer: tw.div`flex flex-col break-words bg-white`,
    MemoTextLength: tw.div`flex w-full justify-end text-xs`,
    PstinstInfoList: {
        Container: tw.div`w-full py-1`,
        Table: tw.table`w-full bg-transparent border-collapse items-center scrollbar-hide whitespace-nowrap overflow-auto`,
        Tbody: tw.tbody`w-full bg-gray-100 flex flex-col text-center items-center justify-between`,
        TableRow: styled.tr(({ BgState }: { BgState: boolean }) => [
            BgState
                ? tw`flex w-full bg-mercury h-8 items-center cursor-pointer hover:bg-daisy`
                : tw`flex w-full bg-pearl h-8 items-center cursor-pointer hover:bg-daisy`,
        ]),
        TableCell: tw.td`flex items-center justify-center w-1/4 h-8 align-middle text-xs border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
    },
    ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
    ButtonItem: tw.div`pl-1`,
    PstinstLeaveModalContentBox: tw.div`w-full justify-evenly`,
    PstinstLeaveModalContentMessage: tw.div`mt-0 text-base leading-relaxed text-gray-500 pb-3`,
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
            Head: tw.thead`h-8 border text-xs bg-steel font-medium`,
            HeadRow: tw.tr`h-8`,
            HeadCell: tw.th`h-8 text-xs font-medium text-white border-l border-l-gray-50`,
            Body: tw.tbody``,
            BodyRow: tw.tr`bg-white border`,
            BodyCellBef1: tw.td`h-8 border-r text-xs font-bold text-gray-900 whitespace-nowrap`,
            BodyCellBef: tw.td`h-8 border-r text-xs font-bold text-gray-900 whitespace-nowrap`,
            BodyCellBefLink: tw.div`cursor-pointer underline`,
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
            ButtonWapper: tw.div`flex flex-nowrap w-full border py-2`,
            Button: tw.div`flex h-8 w-full justify-end gap-2`,
        },
        MealDiary: {
            RowWapper: tw.div`w-full`,
            Search: {
                SearchBox: tw.div`flex flex-nowrap w-full border justify-end gap-2`,
                SearchItem: tw.div`flex py-2 gap-2`,
            },
            TitleBox: tw.div`w-full pt-3 text-xs font-medium text-gray-600`,
            Table: {
                Table: tw.table`text-center min-w-full shadow-md rounded`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`border bg-steel text-xs text-white`,
                TheadCellItem: tw.div`flex w-full justify-center`,
                Body: tw.tbody``,
                Row: tw.tr``,
                BlankRow: tw.tr`h-5`,
                Cell: styled.td(({ Bg }: { Bg: boolean }) => {
                    const returnTw = [
                        tw`border text-xs text-gray-500 items-center object-center`,
                    ]

                    if (Bg) {
                        returnTw.push(tw`text-white bg-steel`)
                    } else {
                        returnTw.push(tw`text-gray-500`)
                    }

                    return returnTw
                }),
                TextCell: styled.td(({ Bg }: { Bg?: boolean }) => {
                    const returnCss = [
                        tw`border text-xs text-gray-500 object-center`,
                    ]

                    if (Bg) {
                        returnCss.push(tw`bg-steel`)
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
                TextWapper: tw.div`flex flex-nowrap items-center justify-center`,
                NumericText: styled.p(
                    ({ TextColor }: { TextColor?: 'white' | 'gray' }) => {
                        const returnTw = []

                        if (TextColor === 'white') {
                            returnTw.push(tw`text-white`)
                        } else if (TextColor === 'gray') {
                            returnTw.push(tw`text-gray-600`)
                        } else {
                            returnTw.push(tw`text-gray-600`)
                        }

                        return returnTw
                    }
                ),
                DiffText: styled.p(
                    ({
                        TextColor,
                    }: {
                        TextColor?: string | 'red' | 'blue' | 'white'
                    }) => {
                        const returnTw = []

                        if (TextColor && TextColor === 'red') {
                            returnTw.push(tw`text-red-600`)
                        } else if (TextColor && TextColor === 'blue') {
                            returnTw.push(tw`text-blue-600`)
                        } else if (TextColor && TextColor === 'white') {
                            returnTw.push(tw`text-white`)
                        } else {
                            returnTw.push(tw`text-gray-600`)
                        }

                        return returnTw
                    }
                ),
            },
            History: {
                Wapper: tw.div`w-full`,
                ButtonBox: tw.div`flex flex-nowrap gap-2 pt-2`,
                ImageBox: {
                    Container: tw.div`flex flex-nowrap w-full`,
                    ImageWapper: tw.div`w-1/2`,
                    ImageTitleCell: tw.div`flex flex-nowrap w-full py-2`,
                    ImageImageCell: tw.div`flex flex-nowrap w-full`,
                    EmptyCellStep1: tw.div`w-1/6`,
                    EmptyCellStep2: tw.div`w-4/6`,
                    TitleBox: tw.div`w-4/6 text-xs`,
                    ImageBox: tw.div`w-4/6 text-xs`,
                    TableBox: tw.div`w-1/2`,
                },
            },
        },
        Survey: {
            RowWapper: tw.div`w-full pb-10`,
            DateBox: tw.div`flex w-full justify-end text-xs text-gray-500 pt-2`,
            Table: {
                Table: tw.table`min-w-full rounded border`,
                Body: tw.tbody``,
                Row: tw.tr``,
                Cell: tw.td`border text-xs text-gray-500 w-1/12 h-8 content-center justify-center`,
                CategoryCell: styled.td(
                    ({
                        CellType,
                    }: {
                        CellType: `blue` | `cyan` | `indigo`
                    }) => {
                        const returnTw = [
                            tw`text-xs text-gray-500 w-1/12 h-8 content-center justify-center px-3`,
                        ]

                        if (CellType === `blue`) {
                            returnTw.push(tw`bg-blue-500 text-white`)
                        } else if (CellType === `cyan`) {
                            returnTw.push(tw`bg-cyan-500 text-white`)
                        } else if (CellType === `indigo`) {
                            returnTw.push(tw`bg-indigo-500 text-white`)
                        } else {
                        }

                        return returnTw
                    }
                ),
                TypeCell: styled.td(
                    ({
                        CellType,
                    }: {
                        CellType: `blue` | `cyan` | `indigo`
                    }) => {
                        const returnTw = [
                            tw`border text-xs w-1/12 h-8 content-center justify-center px-3`,
                        ]

                        if (CellType === `blue`) {
                            returnTw.push(
                                tw`bg-blue-50 text-blue-500 border-blue-500`
                            )
                        } else if (CellType === `cyan`) {
                            returnTw.push(
                                tw`bg-cyan-50 text-cyan-500 border-cyan-500`
                            )
                        } else if (CellType === `indigo`) {
                            returnTw.push(
                                tw`bg-indigo-50 text-indigo-500 border-indigo-500`
                            )
                        } else {
                        }

                        return returnTw
                    }
                ),
                ValueCell: styled.td(
                    ({
                        CellType,
                    }: {
                        CellType: `blue` | `cyan` | `indigo`
                    }) => {
                        const returnTw = [
                            tw`border text-xs text-gray-500 w-1/12 h-8 content-center justify-center px-3`,
                        ]

                        if (CellType === `blue`) {
                            returnTw.push(tw`border-blue-500`)
                        } else if (CellType === `cyan`) {
                            returnTw.push(tw`border-cyan-500`)
                        } else if (CellType === `indigo`) {
                            returnTw.push(tw`border-indigo-500`)
                        } else {
                        }

                        return returnTw
                    }
                ),
            },
            ButtonWapper: tw.div`flex flex-nowrap w-full border py-2`,
            Button: tw.div`flex h-8 w-full justify-end gap-2`,
        },
        MyCoach: {
            RowWapper: tw.div`w-full pb-1`,
            SearchWapper: tw.div`flex flex-nowrap w-full border`,
            SearchBox: tw.div`flex flex-nowrap w-full py-2`,
            SearchGuideTextBox: tw.div`flex w-1/2`,
            SearchGuideText: tw.div`flex text-xs text-gray-600 items-center pl-2`,
            SearchItem: tw.div`flex w-1/2 justify-end gap-2`,
            LoadingBox: tw.div`flex flex-col pt-32`,
            TableBox: tw.div`flex`,
            Table: {
                Table: tw.table`text-center min-w-full shadow-md rounded table-fixed`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`bg-steel text-xs text-white h-8`,
                TheadYCell: tw.th`bg-yellow-300 text-xs text-white h-8`,
                Body: tw.tbody``,
                Row: tw.tr``,
                CellBg: tw.td`border bg-steel text-xs text-white h-8`,
                Cell: tw.td`border text-xs text-gray-500 h-8`,
                TFoot: tw.tfoot`text-xs border bg-gray-500`,
                TFootRow: tw.tr``,
                TFootCell: tw.th`bg-steel text-xs text-white h-8`,
            },
        },
        RawAge: {
            RowWapper: tw.div`flex flex-nowrap w-full pt-4`,
            TitleBox: tw.div`flex text-lg items-center text-gray-500 font-semibold`,
            Title: tw.div`w-full`,
            SubTitle: tw.div`text-sm text-gray-500`,
            Text: tw.div`text-xs text-gray-500`,
            WFull: tw.div`w-full`,
            RsltAnlyBox: tw.div`grid grid-cols-1 gap-1`,
            GuidBox: tw.div`grid grid-cols-1 gap-1`,
            TableWapper: tw.div`w-full`,
            Table: {
                ReportBox: tw.div`flex flex-nowrap w-full justify-end pb-3`,
                Desc: tw.div`flex flex-nowrap w-full`,
                DescRight: tw.div`flex text-xs w-1/2`,
                DescLeft: tw.div`flex text-xs w-1/2 justify-end`,
                Table: tw.table`text-center min-w-full shadow-md rounded`,
                Thead: tw.thead`text-xs border`,
                TheadRow: tw.tr``,
                TheadCell: tw.th`bg-steel text-xs text-white h-8`,
                TheadYCell: tw.th`bg-yellow-300 text-xs text-white`,
                Body: tw.tbody``,
                Row: tw.tr``,
                CellBg: tw.td`border bg-steel text-xs text-white `,
                Cell: tw.td`border text-xs text-gray-500 h-8`,
                TFoot: tw.tfoot`text-xs border bg-gray-500`,
                TFootRow: tw.tr``,
                TFootCell: tw.th`bg-steel text-xs text-white`,
            },
        },
        Mesg: {
            Container: tw.div``,
            Search: {
                SearchBox: tw.div`flex flex-nowrap w-full border justify-end gap-2`,
                SearchItem: tw.div`flex py-2 gap-2`,
            },
        },
        Chart: {
            Container: tw.div``,
            Search: {
                SearchBox: tw.div`flex flex-nowrap w-full border justify-end gap-2`,
                SearchItem: tw.div`flex py-2 gap-2`,
                DateLine: tw.div`flex items-center`,
            },
        },
        MyGraph: {
            Container: tw.div``,
            Search: {
                SearchBox: tw.div`flex flex-nowrap w-full border gap-2 px-10`,
                SearchItem: tw.div`flex py-4 gap-4`,
            },
        },
        Report: {
            Container: tw.div`flex flex-col`,
            RowWapper: tw.div`flex flex-col w-full`,
            TitleBox: tw.div`flex w-full px-6 pt-6 pb-2`,
            Title: tw.div`text-xs text-gray-600 font-bold`,
            SubTitle: tw.div`text-xs text-gray-600`,
            ItemWapper: tw.div`flex flex-col w-full border px-10 py-5 justify-center`,
            ItemBox: tw.div`flex flex-wrap w-full`,
            RadioItems: tw.div`flex flex-nowrap w-full py-1`,
            CheckBoxItems: tw.div`grid grid-cols-12 gap-1 py-1`,
        },
    },
    Message: {
        Container: tw.div`flex flex-col break-words bg-white px-2 pt-20`,
        Memo: {
            Container: tw.div`flex flex-col break-words bg-white pt-3 gap-1`,
            Row: tw.div`flex flex-nowrap whitespace-nowrap w-full`,
            LabelCell: tw.div`flex px-0 w-1/4 h-8`,
            ItemCell: tw.div`flex w-full`,
            ButtonBox: tw.div`flex w-full pt-3 justify-end gap-1`,
            ButtonCenterBox: tw.div`flex w-full pt-3 justify-center gap-1`,
            Empty: tw.div``,
            SendBoxGrid: tw.div`grid grid-rows-2 grid-flow-col gap-1`,
            SendBoxRow: tw.div`flex flex-nowrap items-center`,
            SendBoxDatePickerWapper: tw.div`flex flex-nowrap gap-1`,
            SendBoxDatePickerDate: tw.div`w-3/5`,
            SendBoxDatePickerTime: tw.div`w-2/5`,
        },
    },
}

export const ConsultGroupDetailStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
}
