import tw from 'twin.macro'
// import styled from '@emotion/styled'
//

export const SelectStyle = {
    DefaultSearchSelect: tw.select`form-select block w-60 h-8 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
}

export const VarySelectBoxStyle = {
    Wapper: tw.div`flex items-center`,
    Select: tw.select`form-select block h-8 border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs leading-none transition border-gray-300 bg-gray-300 w-full`,
}
