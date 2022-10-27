import tw from 'twin.macro'
// import styled from '@emotion/styled'
//

// HamburgerButton
export const Buttons = {
    Hamburger: {
        Box: tw.div`cursor-pointer p-1.5 space-y-1 bg-m-blue rounded shadow`,
        Item: tw.span`block w-2.5 h-0.5 bg-gray-100 animate-pulse`,
    },
    DefaultSearch: tw.button`text-center items-center px-3 py-1.5 w-20 bg-m-blue hover:bg-m-blue text-white text-xs font-medium rounded-md mx-2`,
    Manage: tw.button`inline-flex items-center px-3 py-1.5 bg-m-button hover:bg-m-blue text-white text-xs font-medium rounded-md mx-2`,
    DatePicker: tw.button`block h-8 px-3 w-24 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs`,
}
