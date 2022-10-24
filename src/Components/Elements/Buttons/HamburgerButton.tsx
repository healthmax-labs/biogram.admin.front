import {
    HamburgerButtonBox,
    HamburgerButtonItem,
} from '@Style/Elements/Buttons'

export default function HamburgerButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return (
        <HamburgerButtonBox onClick={() => ButtonClick()}>
            <HamburgerButtonItem></HamburgerButtonItem>
            <HamburgerButtonItem></HamburgerButtonItem>
            <HamburgerButtonItem></HamburgerButtonItem>
        </HamburgerButtonBox>
    )
}
