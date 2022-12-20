import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const {
    VaryInfoButtonStyle: { Button },
} = ButtonStyle

const VaryInfoButton = ({
    InfoType,
    Active,
    ButtonName,
    HandleClick,
}: {
    ButtonName: string
    Active?: boolean
    InfoType?: `info` | `button`
    HandleClick: () => void
}) => {
    return (
        <Button
            onClick={() => HandleClick()}
            Active={Active ? Active : false}
            ButtonType={InfoType ? InfoType : 'info'}>
            {ButtonName}
        </Button>
    )
}

export default VaryInfoButton
