import React from 'react'
import { SearchButton } from '@Style/Elements/Buttons'

export default function DefaultSearchButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return <SearchButton onClick={() => ButtonClick()}>검색</SearchButton>
}
