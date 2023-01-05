import tw from 'twin.macro'
import styled from '@emotion/styled'

export const MainStyle = {
    SearchWapper: tw.div`align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap text-left text-gray-500 bg-gray-100`,
    ManageWapper: tw.div`flex flex-nowrap align-middle py-1 text-xs border-l-0 border-r-0 whitespace-nowrap text-left text-gray-500 justify-end`,
    TableWapper: tw.div`block w-full overflow-x-auto`,
}

export const SearchBoxStyle = {
    Container: tw.div`flex flex-nowrap items-center`,
    RowContainer: tw.div`flex flex-nowrap`,
    SearchWapper: tw.div`w-center-width grid grid-cols-4 gap-1`,
    SearchRowWapper: tw.div``,
    SearchItemWapper: styled.div(
        ({ ColSpan = false }: { ColSpan?: boolean }) => [
            tw`flex flex-nowrap`,
            ColSpan ? tw`col-span-3` : ``,
        ]
    ),
    SearchItemRow: tw.div`w-center-search-box items-center grid grid-cols-4 h-10`,
    SearchLabel: tw.div`flex object-center content-center pr-2`,
    SearchColSpanLabel: tw.div`flex object-center content-center w-16`,
    SearchItem: tw.div`flex flex-nowrap`,
    SearchItemGap: tw.div`flex flex-nowrap gap-3`,
    LabelItem: tw.div`w-20`,
    DatepickerLine: tw.div`flex px-2 items-center`,
    SearchButton: tw.div`flex object-top w-full`,
    RightSearchButton1: tw.div`flex items-end object-center justify-end w-full`,
    RightSearchButton: styled.div(({ Item }: { Item?: 'center' | 'end' }) => {
        const returnCss = [tw`flex object-center justify-end w-full`]

        if (Item && Item === 'center') {
            returnCss.push(tw`items-center`)
        } else if (Item && Item === 'end') {
            returnCss.push(tw`items-end pb-1`)
        } else {
            returnCss.push(tw`items-center`)
        }

        return returnCss
    }),
}

export const ManageBoxStyle = {
    Wapper: tw.div``,
    Buttons: tw.div`flex flex-nowrap gap-1`,
}

export const WapperStyle = {
    InputWapper: tw.div`flex flex-nowrap w-full items-center`,
    FullWapper: tw.div`w-full`,
    FullWapperGap: tw.div`w-full gap-2 py-1`,
    FullNoWarap: tw.div`flex flex-nowrap w-full`,
    FlexNoWarap: tw.div`flex flex-nowrap`,
    FlexNoWarapGap: tw.div`flex flex-nowrap gap-2 py-1`,
}
