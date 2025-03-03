import tw from 'twin.macro'
import styled from '@emotion/styled'

// PstinstSelector
export const PstinstSelectorStyle = {
    TableBox: tw.div`overflow-x-auto relative shadow-md`,
    InputWapper: tw.div`pb-1`,
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center`,
    TableHeader: tw.thead`w-full text-left text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-steel items-center`,
    HeaderCell: tw.th`p-4 w-2/4 px-3 align-middle py-1 text-xs uppercase border-l-2 border-r-2 whitespace-nowrap text-center text-white border-gray-500`,
    TableBody: tw.tbody`w-full h-[50vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`,
    TableBodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-white h-auto items-center border-b-2 py-2`
            : tw`flex w-full h-auto items-center border-b-2`,
    ]),
    TableBodyCell: tw.td`text-left justify-center w-2/4 py-2 h-auto text-xs border-r-2 text-gray-500 border-gray-100`,
    ItemWapper: tw.div`flex items-center mb-1 ml-3`,
    ItemCols: tw.div`grid grid-cols-1`,
    ItemCheckBox: tw.input`w-4 h-4 text-blueberry bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    ItemLabel: tw.label`cursor-pointer ml-2`,
    // ItemLavelText: tw.p`text-gray-900 dark:text-gray-300`,
    ItemLavelText: styled.p(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`text-xs text-white bg-blueberry`
            : tw`text-xs text-gray-500`,
    ]),
    SearchInputWapper: tw.div`flex flex-nowrap w-full flex-row gap-1`,
    SearchInputGrow: tw.div`grow`,
    SearchInputFlex: tw.div`flex`,
}

export const StplatInfoAgreeModalStyle = {
    Container: tw.div``,
    TitleBox: tw.div`py-2 text-left text-2xl`,
    ItemGrid: tw.div`grid grid-rows-4 grid-flow-col gap-1 h-1/6`,
    ItemRow: styled.div(({ First }: { First: boolean }) => [
        First ? tw`row-span-4` : tw`row-span-2 col-span-2`,
    ]),
    AgreeItemCard: tw.div`px-2 py-2 bg-white border border-gray-200 rounded-lg shadow-md`,
    AgreeItemTitle: tw.div`mb-2 text-sm text-left font-bold tracking-tight text-gray-900`,
    AgreeItemContent: styled.div(({ First }: { First: boolean }) => [
        First
            ? tw`h-[35rem] overflow-y-scroll`
            : tw`h-[15rem] overflow-y-scroll`,
        tw`text-left text-xs`,
    ]),
    AgreeItemCheckBox: tw.div`flex pt-3 items-end object-bottom place-items-end content-end`,
    AllAgreeButton: tw.div`flex flex-row justify-center text-xs pt-3`,
}

export const PstinstSelectBoxStyle = {
    Wapper: tw.div`flex flex-nowrap w-full gap-2`,
}

export const AutoAlertModalStyle = {
    Container: tw.div`flex flex-col max-h-[75vh] overflow-y-scroll`,
    Title: tw.div`flex text-lg items-center text-gray-500 font-semibold`,
    SubTitle: tw.div`text-xs text-gray-500 w-full text-left pb-1`,
    InstText: tw.div`text-xs text-gray-500 w-full text-left`,
    RowWapper: tw.div`flex w-full flex-col py-1`,
    ButtonBox: tw.div`flex w-full gap-2`,
    TableStyle: {
        Table: tw.table`text-center min-w-full table-fixed`,
        Thead: tw.thead`text-xs`,
        TheadRow: tw.tr``,
        TheadCell: tw.th`border bg-steel text-xs text-white max-w-xs`,
        Body: tw.tbody``,
        Row: tw.tr`w-full`,
        Cell: tw.td`border text-xs text-gray-500 object-center w-1/12`,
    },
}
