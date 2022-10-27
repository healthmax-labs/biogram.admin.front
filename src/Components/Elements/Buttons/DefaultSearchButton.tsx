import React from 'react'
import { Buttons } from '@Style/Elements/ButtonStyle'

export default function DefaultSearchButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return (
        <Buttons.DefaultSearch onClick={() => ButtonClick()}>
            검색
        </Buttons.DefaultSearch>
    )
}
