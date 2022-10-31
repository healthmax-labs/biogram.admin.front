import tw from 'twin.macro'

export const ModalStyle = {
    Container: tw.div`fixed inset-0 z-10 overflow-y-auto`,
    ModalBackground: tw.div`fixed inset-0 w-full h-full bg-black opacity-40`,
    MainWapper: tw.div`flex items-center min-h-screen px-4 py-8`,
    Wapper: tw.div`relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg`,
    MainBox: tw.div`mt-3`,
    CenterBox: tw.div`mt-2 text-center`,
    Center: {
        CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
        PhoneNumber: tw.p`mt-2 text-center`,
        AuthText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    },
    ButtonBox: tw.div`items-center gap-2 mt-3`,
    Button: tw.button`w-1/3 px-3 py-1.5 bg-m-button hover:bg-m-blue text-white text-xs rounded-md mx-2`,
}

export const ConfimModalStyle = {
    CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
}

export const AuthModalStyle = {
    CenterText: tw.p`mt-2 text-[15px] leading-relaxed text-gray-500`,
    PhoneNumber: tw.p`mt-2 text-center`,
    AuthText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
    InputBox: tw.div`relative w-full flex-wrap items-stretch mb-3`,
    AuthInput: tw.input`relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-96 pr-10 text-center`,
    AuthSpan: tw.span`z-10 h-full leading-snug absolute text-center bg-transparent rounded text-xs inline-flex items-center justify-center w-8 right-12 text-m-blue`,
    AuthErrorText: tw.p`mt-0 text-[15px] text-red-700`,
}

export const AlertModelStyle = {
    TitleText: tw.p`mt-0 text-[15px] leading-relaxed text-gray-500`,
}
