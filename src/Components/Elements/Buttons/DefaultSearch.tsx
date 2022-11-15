import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { DefaultSearch: DefaultSearchStyle } = ButtonStyle

const DefaultSearch = ({ ButtonClick }: { ButtonClick: () => void }) => {
    return (
        <DefaultSearchStyle onClick={() => ButtonClick()}>
            검색
        </DefaultSearchStyle>
    )
}

export default DefaultSearch
