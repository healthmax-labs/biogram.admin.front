import tw from 'twin.macro'
import styled from '@emotion/styled'

export const MainStyle = {
    SearchWapper: tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`,
    ManageWapper: tw.div`px-6 mb-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-gray-50 text-gray-500 border-gray-100`,
    TableWapper: tw.div`block w-full overflow-x-auto`,
}
export const SearchBoxStyle = {
    Container: tw.div`mt-0`,
    Wapper: tw.div`grid grid-cols-2 gap-1`,
    Item: tw.div`text-gray-700 flex items-center`,
    LabelItem: tw.div`w-40`,
    Label: tw.label`inline-block align-baseline text-xs uppercase whitespace-nowrap text-left text-gray-500`,
    LabelText: tw.p`text-xs uppercase whitespace-nowrap text-left text-gray-500`,
    LabelItemBox: tw.div`w-1/6`,
    Select: tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    Input: tw.input`form-input block w-60 h-8 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
    DatepickerBox: tw.div`grid grid-rows-1 grid-flow-col gap-1`,
    Datepicker: tw.div`flex flex-row`,
    DatepickerLine: tw.p`px-5 inline-block align-baseline pt-2`,
    Relative: tw.div`relative`,
    SearchButtonBox: tw.div`absolute bottom-0 -right-2`,
}
export const ManageBoxStyle = {
    Wapper: tw.div`w-full justify-evenly object-right`,
    Buttons: tw.div`relative col-span-1 items-end justify-end text-right object-right -right-2`,
}
export const ListTableStyle = {
    Table: tw.table`w-full bg-transparent border-collapse items-center`,
    Thead: tw.thead`w-full flex text-white text-xs h-8`,
    TheadTr: tw.tr`w-full flex bg-m-dip-blue items-center`,
    ThCheckbox: tw.th`p-4 w-1/12 px-1 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    TheadTh: tw.th`p-4 w-1/4 px-3 align-middle py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-white border-gray-100`,
    Tbody: tw.tbody`w-full h-[69vh] bg-gray-100 flex flex-col text-center items-center justify-between overflow-y-scroll`,
    TbodyTr: styled.tr(({ BgState }: { BgState: boolean }) => [
        BgState
            ? tw`flex w-full bg-white h-9 items-center`
            : tw`flex w-full h-9 items-center`,
    ]),
    TbodyTd: tw.td`flex items-center justify-center w-1/4 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
    TbodyTdCheckbox: tw.td`flex items-center justify-center w-1/12 h-10 align-middle text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-center text-gray-500 border-gray-100`,
}

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    MemoContainer: tw.div`flex flex-col break-words bg-white`,
}
