import React from 'react'
import { SearchButton } from '@Style/Elements/Buttons'

export default function DefaultSearchButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return (
        <SearchButton
            className="text-center items-center px-3 py-1.5 w-20 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-md mx-2"
            onClick={() => ButtonClick()}>
            검색
        </SearchButton>
    )
}
