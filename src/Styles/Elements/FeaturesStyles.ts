import tw from 'twin.macro'
import styled from '@emotion/styled'
//

// PstinstSelector
export const PstinstSelectorStyle = {
    TableBox: tw.div`overflow-x-auto relative shadow-md`,
    InputWapper: tw.div`pb-1`,
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center`,
    TableHeader: tw.thead`w-full text-left text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-m-dip-blue items-center`,
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
    ItemCheckBox: tw.input`w-4 h-4 text-m-blue bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    ItemLabel: tw.label`cursor-pointer ml-2`,
    // ItemLavelText: tw.p`text-gray-900 dark:text-gray-300`,
    ItemLavelText: styled.p(({ BgState }: { BgState: boolean }) => [
        BgState ? tw`text-xs text-white bg-m-blue` : tw`text-xs text-gray-500`,
    ]),
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
        tw`text-left`,
    ]),
    AgreeItemCheckBox: tw.div`flex pt-3 items-end object-bottom place-items-end content-end`,
    AllAgreeButton: tw.div`flex flex-row justify-center text-xs pt-3`,
}
