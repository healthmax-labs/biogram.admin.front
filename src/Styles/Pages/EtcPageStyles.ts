import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const SplashPage = {
    Container: tw.div`flex items-center justify-center h-screen`,
    Wapper: tw.div`flex justify-center items-center space-x-1 text-sm text-gray-700`,
    LoadingText: tw.div``,
}

export const UnderConstruction = {
    MainContainer: tw.div`flex items-center justify-center h-screen bg-gray-200`,
    Container: tw.div`container`,
    Wapper: tw.div`bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2`,
    TextBox: tw.div`text-center`,
    TextH2: tw.h2`text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl`,
    TextSpan: tw.span`text-indigo-600`,
    TextP: tw.p`text-m-dip-blue md:text-xl mt-10`,
    TextLink: tw.a`hover:underline`,
}
