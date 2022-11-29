import tw from 'twin.macro'
import styled from '@emotion/styled'

export const SearchBoxStyle = {
    Container: tw.div`flex flex-nowrap items-center`,
    RowContainer: tw.div`flex flex-nowrap`,
    SearchWapper: tw.div`mt-0 w-center-width grid grid-cols-4 gap-1`,
    SearchRowWapper: tw.div`items-center`,
    SearchItemWapper1: tw.div`flex flex-nowrap`,
    SearchItemWapper: styled.div(
        ({ ColSpan = false }: { ColSpan?: boolean }) => [
            tw`flex flex-nowrap`,
            ColSpan ? tw`col-span-3` : ``,
        ]
    ),
    SearchItemRow: styled.div(({ Second }: { Second?: boolean }) => [
        tw`w-center-search-box mt-0 items-center grid grid-cols-4 gap-1`,
        Second ?? tw`pb-4`,
    ]),

    SearchLabel: tw.div`flex object-center content-center w-1/6`,
    SearchColSpanLabel: tw.div`flex object-center content-center w-16`,
    SearchItem: tw.div`flex flex-nowrap`,
    LabelItem: tw.div`w-20`,
    DatepickerLine: tw.div`flex px-2 items-center`,
    SearchButton: tw.div`flex flex-1 object-center justify-end pr-10 w-full`,
    RightSearchButton: tw.div`flex flex-1 items-end justify-end w-full`,
}
