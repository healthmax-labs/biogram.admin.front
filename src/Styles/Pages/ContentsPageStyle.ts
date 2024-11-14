import tw from 'twin.macro'
// import styled from '@emotion/styled'

export const DetailPageStyle = {
    DetailContainer: tw.div`flex flex-nowrap flex-col`,
    Address: {
        Button: tw.div`flex flex-row w-1/12`,
        Input: tw.div`w-10/12`,
    },
    Geo: tw.div`w-3/12`,
    MapURL: tw.div`w-6/12`,
    DatePicker: tw.div`w-2/12`,
    DatePickerLine: tw.div`flex items-center px-1 pr-2`,
    DeviceKeySelect: tw.div`w-6/12`,
    DeviceKeySelectButton: tw.div`flex w-1/12`,
    ButtonBox: tw.div`flex flex-nowrap py-2 justify-center`,
    ButtonItem: tw.div`flex pl-1`,
}
