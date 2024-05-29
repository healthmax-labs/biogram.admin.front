import tw from 'twin.macro'

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
    TextP: tw.p`text-steel md:text-xl mt-10`,
    TextLink: tw.a`hover:underline`,
}

export const UhealthzoneListMapStyle = {
    Container: tw.div`relative  h-full items-center justify-center bg-gray-50`,
    MarkerTitleWapper2: tw.div`fixed w-full items-center justify-center px-5 bg-gray-100 border border-gray-300 h-16 rounded-xl z-auto hover:z-50`,
    MarkerTitleWapper: tw.div`relative bottom-16 flex w-full items-center justify-center px-5 bg-gray-100 border border-gray-300 h-8 rounded-xl`,
    MarkerTitle: tw.span`text-base font-semibold`,
}
