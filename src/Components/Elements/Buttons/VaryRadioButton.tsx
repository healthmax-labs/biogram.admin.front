import React from 'react'
import { VaryInputStyle } from '@Style/Elements/InputStyles'

const { Wapper } = VaryInputStyle

const VaryRadioButton = ({ LabelName }: { LabelName: string }) => {
    return (
        <Wapper>
            <input
                className="appearance-none rounded-full justify-center items-center h-3 w-3 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
            />
            <label
                className="form-check-label inline-block text-gray-800 text-xs"
                htmlFor="flexRadioDefault2">
                {LabelName}
            </label>
        </Wapper>
    )
}

export default VaryRadioButton
