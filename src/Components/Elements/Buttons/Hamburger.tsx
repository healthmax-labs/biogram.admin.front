import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const {
    Hamburger: { Box, Item },
} = ButtonStyle

export default function Hamburger({
    ButtonClick,
}: {
    ButtonClick: () => void
}) {
    return (
        <Box onClick={() => ButtonClick()}>
            <Item></Item>
            <Item></Item>
        </Box>
    )
}
