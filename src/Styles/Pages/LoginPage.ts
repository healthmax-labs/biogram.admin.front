import styled from '@emotion/styled'
import tw from 'twin.macro'

export const LoginContainer = styled.section(
    ({ bgImage }: { bgImage: string }) => [
        tw`relative flex min-h-screen flex-col justify-center overflow-hidden`,
        {
            background: `URL(${bgImage})`,
        },
    ]
)

export const LoginWapper = tw.section`m-auto w-full rounded border-t border-blue-600 bg-white p-6 shadow-lg lg:max-w-md`
export const LogoBox = tw.div`grid place-items-center`
export const LoginFormBox = tw.div`mt-6`
export const LoginFormRow = tw.div`mt-4`
export const LoginFormInputRow = tw.div`mt-6`
export const LoginInputLavel = tw.label`block text-sm text-gray-800`
export const LoginInputId = tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`
export const LoginInputPassword = tw.input`mt-2 block w-full rounded-md border bg-white px-4 py-2 text-blue-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`
export const LoginButton = tw.button`w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none`
export const LoginLogoImage = tw.img`object-contain w-56`
