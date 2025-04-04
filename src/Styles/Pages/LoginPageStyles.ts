import styled from '@emotion/styled'
import tw from 'twin.macro'

export const LoginPageStyle = {
    Container: styled.section(({ bgImage }: { bgImage: string }) => [
        {
            background: `URL(${bgImage})`,
        },
        tw`relative flex min-h-screen flex-col justify-center overflow-hidden w-full h-screen bg-cover`,
    ]),
    Wapper: tw.section`m-auto w-full rounded bg-white p-6 shadow-lg max-w-md`,
    LogoBox: tw.div`grid place-items-center`,
    FormBox: tw.form`mt-6`,
    FormRow: tw.div`mt-4`,
    InputRow: tw.div`mt-6`,
    ErrorRow: tw.div`mt-0 text-center`,
    ErrorMessage: tw.span`text-xs text-red-700`,
    Label: tw.label`block text-sm text-brescian`,
    InputId: tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`,
    InputPassword: tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`,
    LoginButton: tw.div`w-full text-center transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none cursor-pointer`,
    LoginLogoImage: tw.img`object-contain w-56`,
    RememberID: tw.div`flex items-center`,
    RememberIdInput: tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
    RememberIdLabel: tw.label`ml-2 text-sm font-medium text-brescian`,
    GeonDaon: {
        Logo: {
            Wapper: tw.div`flex flex-col w-full`,
            Row: tw.div`flex flex-nowrap w-full items-center justify-start`,
            TitleBold: tw.span`text-4xl font-bold text-brescian pt-1`,
            TitleNormal: tw.span`text-4xl font-bold text-brescian`,
            TitleLine: tw.div`border-b-4 w-16 border-brescian py-1`,
        },
        BottomBox: {
            Wapper: tw.div`flex w-full px-40 pb-20`,
            LogoBox: tw.div`flex items-center justify-start w-1/2`,
            TelBox: tw.div`flex items-end w-1/2 justify-end text-brescian`,
        },
    },
}
