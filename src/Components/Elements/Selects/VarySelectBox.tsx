import React from 'react'
import { VarySelectBoxStyle } from '@Style/Elements/SelectStyles'
import { ContentType, WidthType } from '@CommonTypes'

const { Wapper, Select } = VarySelectBoxStyle

const VarySelectBox = ({
    ContentsType = 'default',
    Value,
    Placeholder,
    HandleOnFocus,
    HandleOnnBlur,
    Elements,
    HandleOnChange,
    Width,
    AutoComplete,
    PlaceholderDisable,
}: {
    Value?: string
    Placeholder?: string
    Elements: Array<{
        value: string | number
        text: string
    }>
    ContentsType?: ContentType
    HandleOnFocus?: () => void
    HandleOnnBlur?: () => void
    HandleOnChange?: ({ value, text }: { value: string; text: string }) => void
    Width?: WidthType | null
    AutoComplete?: boolean
    PlaceholderDisable?: boolean
}) => {
    return (
        <Wapper Width={Width ? Width : 'w60'}>
            <Select
                name="select"
                ContentsType={ContentsType ? ContentsType : 'default'}
                value={Value}
                autoComplete={AutoComplete ? 'autoComplete' : ``}
                onBlur={() => (HandleOnnBlur ? HandleOnnBlur() : null)}
                onFocus={() => (HandleOnFocus ? HandleOnFocus() : null)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    HandleOnChange &&
                        HandleOnChange({
                            value: e.target.value,
                            text: e.target.selectedOptions[0].text,
                        })
                }}>
                <option
                    value={``}
                    disabled={!PlaceholderDisable ? true : PlaceholderDisable}
                    hidden={!PlaceholderDisable ? true : PlaceholderDisable}>
                    {Placeholder ? Placeholder : `선택해 주세요`}
                </option>
                {Elements &&
                    Elements.map((el, i) => {
                        return (
                            <option
                                key={`vary-select-box-select-option-${i}`}
                                value={el.value}>
                                {el.text}
                            </option>
                        )
                    })}
            </Select>
        </Wapper>
    )
}

export default VarySelectBox
