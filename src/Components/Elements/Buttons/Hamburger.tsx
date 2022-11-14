import { ButtonStyle } from '@Style/Elements/ButtonStyle'

const {
    Hamburger: { Box, Item },
} = ButtonStyle

const Hamburger = ({ ButtonClick }: { ButtonClick: () => void }) => {
    return (
        <Box onClick={() => ButtonClick()}>
            <Item></Item>
            <Item></Item>
        </Box>
    )
}

export default Hamburger
