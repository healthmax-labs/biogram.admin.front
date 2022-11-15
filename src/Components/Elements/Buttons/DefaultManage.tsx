import React from 'react'
import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const { Manage } = ButtonStyle

const DefaultManage = ({
    ButtonClick,
    ButtonName,
}: {
    ButtonClick: () => void
    ButtonName: string
}) => {
    return <Manage onClick={() => ButtonClick()}>{ButtonName}</Manage>
}

export default DefaultManage
