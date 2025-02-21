import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { MaxHeightType } from '@CommonTypes'

export const ModalStyle = {
    Container: tw.div`fixed inset-0 z-10 overflow-y-auto max-h-[calc(100vh - 5%)] overflow-x-hidden`,
    ModalBackground: tw.div`fixed inset-0 w-full h-full bg-black opacity-40`,
    MainWapper: styled.div(({ needMax }: { needMax?: boolean }) => [
        tw`flex items-center px-4 py-8`,
        needMax ? tw`max-h-screen` : tw`min-h-screen`,
    ]),
    Wapper: styled.div(({ maxWidth = `lg` }: { maxWidth?: MaxHeightType }) => [
        tw`relative w-full p-4 mx-auto bg-white rounded-md shadow-lg max-h-full`,
        ConstStyle.maxWidth[maxWidth],
    ]),
    RareWapper: styled.div(
        ({ maxWidth = `lg` }: { maxWidth?: MaxHeightType }) => [
            tw`relative w-full mx-auto rounded-md shadow-lg max-h-full`,
            ConstStyle.maxWidth[maxWidth],
        ]
    ),
    MainBox: tw.div`mt-3`,
    CenterBox: tw.div`mt-2 text-center`,
    Center: {
        CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
        PhoneNumber: tw.p`mt-2 text-center`,
        AuthText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    },
    ButtonBox: tw.div`flex items-center justify-center gap-2 mt-3`,
    ButtonCenterBox: tw.div`flex w-full text-center items-center justify-center gap-2 mt-3`,
    Button: tw.button`w-1/3 px-3 py-1.5 bg-eggplant hover:bg-blueberry text-white text-xs rounded-md mx-2`,
}

export const ConfirmModalStyle = {
    CenterText: tw.div`mt-2 text-[15px] leading-relaxed text-gray-500`,
}

export const AuthModalStyle = {
    CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
    PhoneNumber: tw.p`mt-2 text-center`,
    AuthText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    InputBox: tw.div`relative w-full flex-wrap items-stretch mb-3`,
    AuthInput: tw.input`relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-96 pr-10 text-center`,
    AuthSpan: tw.span`z-10 h-full leading-snug absolute text-center bg-transparent rounded text-xs inline-flex items-center justify-center w-8 right-12 text-blueberry`,
    AuthErrorText: tw.p`mt-0 h-8 text-[15px] text-red-700`,
}

export const AlertModelStyle = {
    TitleText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
}

export const PstinstAgreeModalStyle = {
    Container: tw.div``,
    TitleBox: tw.div`py-2 text-left text-2xl`,
    ItemGrid: styled.div(({ Length }: { Length: number }) => {
        const returnTw = []

        if (Length === 2) {
            returnTw.push(tw`grid grid-rows-1 grid-flow-col gap-1 h-1/6`)
        } else {
            returnTw.push(tw`grid grid-cols-3 gap-1 h-1/6`)
        }

        return returnTw
    }),
    ItemRow1: tw.div`row-span-2 col-span-2`,
    ItemRow: styled.div(({ Length }: { Length: number }) => {
        const returnTw = []

        if (Length === 2) {
            returnTw.push(tw`row-span-2 col-span-2`)
        } else {
            returnTw.push(tw``)
        }

        return returnTw
    }),
    AgreeItemCard: tw.div`px-2 py-2 bg-white border border-gray-200 rounded-lg shadow-md`,
    AgreeItemTitle: tw.div`mb-2 text-sm text-left font-bold tracking-tight text-gray-900`,
    AgreeItemContent: tw.div`h-[35rem] overflow-y-scroll text-left w-full break-normal max-w-md`,
    AgreeItemCheckBox1: tw.div`flex pt-3 items-center object-center place-items-end content-end`,
    AgreeItemCheckBox: tw.div`flex items-center`,
    AllAgreeButtonBox: tw.div`flex flex-row justify-center text-xs pt-3`,
    AllAgreeButton: tw.div`flex flex-nowrap gap-1`,
}

export const MemberSearchModalStyle = {
    Container: tw.div`flex flex-wrap w-full gap-1`,
    RowWapper: tw.div`flex w-full`,
    RowWapperGap: tw.div`flex w-full gap-2`,
    Mbtlnum: styled.p(({ Color }: { Color: 'gray' | 'red' }) => {
        const returnTw = []

        if (Color === 'red') {
            returnTw.push(tw`text-red-600`)
        } else {
            returnTw.push(tw`text-gray-500`)
        }

        return returnTw
    }),
    TitleText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    SelectedButton: {
        Container: tw.div`grid grid-cols-7 gap-1`,
        Wapper: tw.span`inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-gray-500 bg-gray-100 rounded`,
        Button: tw.button`inline-flex items-center p-0.5 ml-2 text-xs text-gray-500 bg-transparent rounded-sm`,
        Sr: tw.span`sr-only`,
    },
}

export const MemberConsultGroupModalStyle = {
    TitleWapper: tw.div`flex w-full justify-center pb-4`,
    TitleBox: tw.div`text-xs`,
}

export const ConsultChartPrintModalStyle = {
    Container: tw.div`flex w-full flex-col`,
    RowWapper: tw.div`flex flex-col w-full`,
    EmptyRow: tw.div`flex flex-col w-full pt-5`,
    FlexRow: tw.div`flex w-full`,
    TitleRow: tw.div`flex w-full h-8 justify-start items-center px-4`,
    LabelBox: tw.div`flex w-2/12 h-16 border justify-center items-center`,
    ValueBox: tw.div`flex w-4/12 h-16 border justify-center items-center`,
    Text: tw.p`text-xs`,
    Contents: tw.div`text-xs py-2 px-2 border h-auto text-left break-words whitespace-pre-wrap w-full`,
}
