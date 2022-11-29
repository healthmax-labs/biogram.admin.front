import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const SearchBoxStyle = {
    Container: tw.div`flex flex-nowrap items-center`,
    SearchWapper: tw.div`mt-0 w-center-width grid grid-cols-4 gap-1`,
    SearchItemWapper: tw.div`flex flex-nowrap`,
    SearchLabel: tw.div`flex object-center content-center w-1/5`,
    SearchItem: tw.div`flex flex-nowrap`,
    LabelItem: tw.div`w-20`,
    DatepickerLine: tw.div`flex px-2 items-center`,
    SearchButton: tw.div`flex flex-1 object-center justify-end pr-10 w-full`,
}
