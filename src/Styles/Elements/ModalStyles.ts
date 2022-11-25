import tw from 'twin.macro'
import styled from '@emotion/styled'
import ConstStyle from '@Style/ConstStyle'
import { MaxHeightType } from '@CommonTypes'

export const ModalStyle = {
    Container: tw.div`fixed inset-0 z-10 overflow-y-auto max-h-[calc(100vh - 5%)] overflow-x-hidden`,
    ModalBackground: tw.div`fixed inset-0 w-full h-full bg-black opacity-40`,
    MainWapper1: tw.div`flex items-center min-h-screen px-4 py-8`,
    MainWapper: styled.div(({ needMax }: { needMax?: boolean }) => [
        tw`flex items-center px-4 py-8`,
        needMax ? tw`max-h-screen` : tw`min-h-screen`,
    ]),
    Wapper: styled.div(({ maxWidth = `lg` }: { maxWidth?: MaxHeightType }) => [
        tw`relative w-full p-4 mx-auto bg-white rounded-md shadow-lg max-h-full`,
        ConstStyle.maxWidth[maxWidth],
    ]),
    MainBox: tw.div`mt-3`,
    CenterBox: tw.div`mt-2 text-center`,
    Center: {
        CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
        PhoneNumber: tw.p`mt-2 text-center`,
        AuthText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    },
    ButtonBox: tw.div`items-center gap-2 mt-3`,
    ButtonCenterBox: tw.div`w-full text-center items-center gap-2 mt-3`,
    Button: tw.button`w-1/3 px-3 py-1.5 bg-m-b-blue hover:bg-m-blue text-white text-xs rounded-md mx-2`,
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
    AuthSpan: tw.span`z-10 h-full leading-snug absolute text-center bg-transparent rounded text-xs inline-flex items-center justify-center w-8 right-12 text-m-blue`,
    AuthErrorText: tw.p`mt-0 h-8 text-[15px] text-red-700`,
}

export const AlertModelStyle = {
    TitleText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
}

export const PstinstAgreeModalStyle = {
    Container: tw.div``,
    TitleBox: tw.div`py-2 text-left text-2xl`,
    ItemGrid: tw.div`grid grid-rows-1 grid-flow-col gap-1 h-1/6`,
    ItemRow: tw.div`row-span-2 col-span-2`,
    AgreeItemCard: tw.div`px-2 py-2 bg-white border border-gray-200 rounded-lg shadow-md`,
    AgreeItemTitle: tw.div`mb-2 text-sm text-left font-bold tracking-tight text-gray-900`,
    AgreeItemContent: tw.div`h-[35rem] overflow-y-scroll text-left`,
    AgreeItemCheckBox: tw.div`flex pt-3 items-end object-bottom place-items-end content-end`,
    AllAgreeButton: tw.div`flex flex-row justify-center text-xs pt-3`,
}

export const TotalScoreModalStyle = {
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center text-center`,
    TableHeader: tw.thead`w-full flex text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-m-dip-blue items-center`,
    HeaderCheckbox: tw.th`p-4 w-1/12 px-1 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    HeaderCell: tw.th`p-4 w-1/4 px-3 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    TableBody: tw.tbody`w-full h-[69vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`,
    TableBodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-white h-9 items-center cursor-pointer hover:bg-green-200 text-center`
            : tw`flex w-full h-9 items-center cursor-pointer hover:bg-green-200 text-center`,
    ]),
    TableBodyCell: tw.td`flex items-center w-full justify-center h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
    TbodyTdCheckbox: tw.td`flex items-center justify-center w-1/12 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
}
