import styled from '@emotion/styled'
import tw from 'twin.macro'

export const Container = styled.section(({ bgImage }: { bgImage: string }) => [
    {
        background: `URL(${bgImage})`,
    },
    tw`relative flex min-h-screen flex-col justify-center overflow-hidden w-full h-screen bg-cover`,
])

export const Wapper = tw.section`m-auto w-full rounded border-t border-blue-600 bg-white p-6 shadow-lg lg:max-w-md`
export const LogoBox = tw.div`grid place-items-center`
export const FormBox = tw.div`mt-6`
export const FormRow = tw.div`mt-4`
export const FormInputRow = tw.div`mt-6`
export const InputLavel = tw.label`block text-sm text-gray-800`
export const InputId = tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`
export const InputPassword = tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`
export const LoginButton = tw.button`w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none`
export const LoginLogoImage = tw.img`object-contain w-56`

export const RememberID = tw.div`flex items-center`
export const RememberIdInput = tw.input`w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`
export const RememberIdLabel = tw.label`ml-2 text-sm font-medium text-gray-900 dark:text-gray-300`
