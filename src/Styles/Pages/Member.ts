import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const Container = tw.div`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-width[400px]`
export const SearchWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
export const ManageWapper = tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
export const TableWapper = tw.div`block w-full overflow-x-auto`

export const SearchBoxWapper = tw.div`w-full grid grid-cols-4 gap-2 justify-evenly min-width[1024px]`
export const SearchLeftBox = tw.div`col-span-2 items-start justify-start min-width[400px]`
export const SearchRightBox = tw.div`col-span-2 items-end justify-end min-width[400px] text-right`

export const Table = tw.table`w-full bg-transparent border-collapse items-center`
export const TableThead = tw.thead`flex text-white w-full`
export const TableTr = tw.tr`flex w-full bg-blue-100`
export const TableTh = tw.th`p-4 w-1/4 px-4 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100 bg-blue-100`
export const TableTbody = tw.tbody`h-[60vh] bg-gray-100 flex flex-col items-center justify-between overflow-y-scroll w-full`
export const TableTbodyTr = tw.tr`flex w-full`
export const TableTbodyTd = tw.td`p-4 w-1/4 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100`
