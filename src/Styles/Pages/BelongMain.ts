import tw from 'twin.macro'

export const Container = tw.div`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white`
export const TopWapper = tw.div`rounded-t mb-0 px-4 py-3 border-0`
export const TableWapper = tw.div`block w-full overflow-x-auto`
export const PaginationWapper = tw.div`block w-full overflow-x-auto`

export const SearchBox = tw.div`flex flex-wrap items-center`
export const TopSearchBox = tw.div`flex items-center justify-center`
export const TopSearch = tw.div`flex border-2 rounded`
export const TopSearchInput = tw.input`px-4 py-2 w-80 text-sm`
export const TopSearchButton = tw.button`flex items-center justify-center px-4 border-l`
export const TopRightButtonBox = tw.div`relative w-full px-4 max-w-full flex-grow flex-1 text-right`
export const TopRightButton = tw.button`inline-flex items-center px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md mx-2`

export const Table = tw.table`items-center w-full bg-transparent border-collapse`
export const TableThead = tw.thead``
export const TableTr = tw.tr``
export const TableTh = tw.th`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
export const TableTbody = tw.tbody``
export const TableTbodyTr = tw.tr``
export const TableTbodyTh = tw.th`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`
