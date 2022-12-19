import { VarySelectBoxStyle } from '@Style/Elements/SelectStyles'
import React from 'react'
import { ContentType } from '@CommonTypes'

const { Wapper, Select } = VarySelectBoxStyle

const VarySelectBox = ({
    ContentsType = 'default',
    Value,
    Placeholder,
    HandleOnFocus,
    HandleOnnBlur,
    Elements,
    HandleOnChange,
}: {
    Value: string
    Placeholder?: string
    Elements: Array<{
        value: string | number
        text: string
    }>
    ContentsType?: ContentType
    HandleOnFocus?: () => void
    HandleOnnBlur?: () => void
    HandleOnChange: ({ value, text }: { value: string; text: string }) => void
}) => {
    return (
        <Wapper>
            <Select
                name="select"
                ContentsType={ContentsType ? ContentsType : 'default'}
                value={Value}
                onBlur={() => (HandleOnnBlur ? HandleOnnBlur() : null)}
                onFocus={() => (HandleOnFocus ? HandleOnFocus() : null)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    HandleOnChange({
                        value: e.target.value,
                        text: e.target.selectedOptions[0].text,
                    })
                }}>
                <option value={``} disabled hidden>
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
