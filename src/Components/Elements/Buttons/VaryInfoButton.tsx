import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const {
    VaryInfoButtonStyle: { Button },
} = ButtonStyle

const VaryInfoButton = ({
    ButtonName,
    HandleClick,
}: {
    ButtonName: string
    HandleClick: () => void
}) => {
    return <Button onClick={() => HandleClick()}>{ButtonName}</Button>
}

export default VaryInfoButton
