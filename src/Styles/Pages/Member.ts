import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const Container = tw.div`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white`
export const SearchWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
export const ManageWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
export const TableWapper = tw.div`block w-full overflow-x-auto`

// export const SearchBoxWapper = tw.div`w-full grid grid-cols-4 gap-2 justify-evenly min-width[1024px]`
export const SearchLeftBox = tw.div`col-span-2 items-start justify-start`
export const SearchRightBox = tw.div`col-span-2 items-end justify-end text-right`

export const Table = tw.table`w-full bg-transparent border-collapse items-center`
export const TableThead = tw.thead`flex text-white w-full`
export const TableTr = tw.tr`flex w-full bg-blue-100`
export const TableTh = tw.th`p-4 w-1/4 px-4 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 bg-blue-100`
export const TableTbody = tw.tbody`h-[60vh] bg-gray-100 flex flex-col items-center justify-between overflow-y-scroll w-full`
export const TableTbodyTr = tw.tr`flex w-full`
export const TableTbodyTd = tw.td`p-4 w-1/4 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100`

export const SearchBoxContainer = tw.div`mt-1`
export const SearchBoxWapper = tw.div`grid grid-cols-2 gap-1`
export const SearchBoxItem = tw.div`text-gray-700 flex items-center`
export const SearchBoxLabelItem = tw.div`mb-0 w-1/6`
export const SearchBoxLabel = tw.label`px-6 align-middle py-0 text-xs uppercase whitespace-nowrap font-semibold text-left text-gray-500`
export const SearchBoxLabelText = tw.p`px-3 align-middle py-0 text-xs uppercase whitespace-nowrap font-semibold text-left text-gray-500`
export const SearchBoxLabelItemBox = tw.div`w-1/6 ml-2`
export const SearchBoxSelect = tw.select`form-input mt-1 block h-8 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`
export const SearchBoxInput = tw.input`form-input mt-1 block h-8 w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`
export const SearchBoxRelative = tw.div`relative`
export const SearchBoxSearchButtonBox = tw.div`absolute bottom-0 right-4 h-8 w-20`
export const DatepickerBox = tw.div`grid grid-rows-1 grid-flow-col gap-1`

export const ManageBoxWapper = tw.div`w-full justify-evenly`
export const ManageBoxButtons = tw.div`col-span-2 items-end justify-end text-right`
