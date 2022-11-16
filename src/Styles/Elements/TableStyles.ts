import tw from 'twin.macro'
import styled from '@emotion/styled'
//

// DefaultPagination
export const TableStyle = {
    TableWapper: tw.table`w-full bg-transparent border-collapse items-center`,
    TableHeader: tw.thead`w-full flex text-white text-xs h-8`,
    HeaderRow: tw.tr`w-full flex bg-m-dip-blue items-center`,
    HeaderCheckbox: tw.th`p-4 w-1/12 px-1 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    HeaderCell: tw.th`p-4 w-1/4 px-3 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    TableBody: tw.tbody`w-full h-[69vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`,
    TableBodyRow: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-white h-9 items-center cursor-pointer hover:bg-green-200`
            : tw`flex w-full h-9 items-center cursor-pointer hover:bg-green-200`,
    ]),
    TableBodyCell: tw.td`flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
    TbodyTdCheckbox: tw.td`flex items-center justify-center w-1/12 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
}

export const DetailTableStyle = {
    TableContainer: tw.table`divide-y divide-gray-300 w-full`,
    TableWapper: tw.tbody`bg-white divide-y divide-gray-300`,
    Row: tw.tr`whitespace-nowrap`,
    LabelCell: tw.td`px-6 h-10 text-sm text-gray-500 border`,
    InputCell: tw.td`px-6 py-1 border`,
}
