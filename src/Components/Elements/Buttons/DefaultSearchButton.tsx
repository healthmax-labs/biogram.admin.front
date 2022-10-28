import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { DefaultSearch } = ButtonStyle

export default function DefaultSearchButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return <DefaultSearch onClick={() => ButtonClick()}>검색</DefaultSearch>
}
