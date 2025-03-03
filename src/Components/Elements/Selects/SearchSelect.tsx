import React from 'react'
import { SelectStyle } from '@Style/Elements/SelectStyles'

const { DefaultSearchSelect } = SelectStyle

const SearchSelect = ({
    id,
    name,
    autoComplete,
    handleOnFocus,
    handleOnnBlur,
    elements,
}: {
    id: string
    name: string
    autoComplete: string
    handleOnFocus: () => void
    elements: Array<{
        value: string | number
        text: string
    }>
    handleOnnBlur?: () => void
}) => {
    return (
        <DefaultSearchSelect
            id={id}
            name={name}
            autoComplete={autoComplete}
            onBlur={() => (handleOnnBlur ? handleOnnBlur() : null)}
            onFocus={() => handleOnFocus()}>
            {elements &&
                elements.map((el, i) => {
                    return (
                        <option
                            key={`default-search-select-option-${i}`}
                            value={el.value}>
                            {el.text}
                        </option>
                    )
                })}
        </DefaultSearchSelect>
    )
}

export default SearchSelect
