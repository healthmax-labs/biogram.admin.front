import { Buttons } from '@Style/Elements/ButtonStyle'

export default function HamburgerButton({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return (
        <Buttons.Hamburger.Box onClick={() => ButtonClick()}>
            <Buttons.Hamburger.Item></Buttons.Hamburger.Item>
            <Buttons.Hamburger.Item></Buttons.Hamburger.Item>
        </Buttons.Hamburger.Box>
    )
}
