import tw from 'twin.macro'
import styled from '@emotion/styled'

export const Container = tw.div`relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-white`
export const SearchWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`
export const ManageWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`
export const TableWapper = tw.div`block w-full overflow-x-auto`

// export const SearchBoxWapper = tw.div`w-full grid grid-cols-4 gap-2 justify-evenly min-width[1024px]`
export const SearchLeftBox = tw.div`col-span-2 items-start justify-start`
export const SearchRightBox = tw.div`col-span-2 items-end justify-end text-right`

export const SearchBoxContainer = tw.div`mt-0`
export const SearchBoxWapper = tw.div`grid grid-cols-2 gap-1`
export const SearchBoxItem = tw.div`text-gray-700 flex items-center`
export const SearchBoxLabelItem = tw.div`w-40`
export const SearchBoxLabel = tw.label`inline-block align-baseline text-xs uppercase whitespace-nowrap text-left text-gray-500`
export const SearchBoxLabelText = tw.p`text-xs uppercase whitespace-nowrap text-left text-gray-500`
export const SearchBoxLabelItemBox = tw.div`w-40`
export const SearchBoxSelect = tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`
export const SearchBoxInput = tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`
export const DatepickerBox = tw.div`grid grid-rows-1 grid-flow-col gap-1`
export const DatepickerLine = tw.p`px-5 inline-block align-baseline pt-2`
export const SearchBoxRelative = tw.div`relative`
export const SearchBoxSearchButtonBox = tw.div`absolute bottom-0 -right-2`

export const ManageBoxWapper = tw.div`w-full justify-evenly object-right`
export const ManageBoxButtons = tw.div`relative col-span-1 items-end justify-end text-right object-right -right-2`

export const Table = tw.table`w-full bg-transparent border-collapse items-center`
export const TableThead = tw.thead`w-full flex text-white text-xs h-8`
export const TableTr = tw.tr`w-full flex bg-m-dip-blue items-center`
export const TableThFirst = tw.th`p-4 w-1/12 px-1 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`
export const TableTh = tw.th`p-3 w-1/4 px-3 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`

export const TableTbody = tw.tbody`w-full h-[69vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`
export const TableTbodyTr = styled.tr(({ BgState }: { BgState: boolean }) => [
    BgState
        ? tw`flex w-full bg-white h-9 items-center`
        : tw`flex w-full h-9 items-center`,
])

export const TableTbodyTdFirst = tw.td`flex items-center justify-center w-1/12 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`
export const TableTbodyTd = tw.td`flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`
