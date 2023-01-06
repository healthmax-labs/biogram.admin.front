import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const ListComponentStyle = {
    Box: {
        Container: tw.div`flex flex-nowrap w-full`,
        Wapper: tw.div`grid grid-rows-2 grid-flow-col gap-0 w-full h-full`,
        Item: tw.div`border w-16 min-w-full`,
    },
}
