import React from 'react'
import { SelectStyle } from '@Style/Elements/SelectStyles'

const { DefaultSearchSelect } = SelectStyle

export default function SearchSelect({
    id,
    name,
    autoComplete,
}: {
    id: string
    name: string
    autoComplete: string
}) {
    return (
        <DefaultSearchSelect id={id} name={name} autoComplete={autoComplete}>
            <option>소속 선택</option>
        </DefaultSearchSelect>
    )
}
