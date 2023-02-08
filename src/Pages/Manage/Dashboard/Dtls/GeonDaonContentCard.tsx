import { TextColorType } from '@CommonTypes'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'

const {
    GeonDaonStyle: {
        Card: { Container, Wapper, TableWapper, Table, Body, Row, Cell },
    },
} = DashboardStyle

interface ItemInterface {
    name: string
    color?: TextColorType
}

const GeonDaonContentCard = ({
    LeftTitle,
    RightTitle,
    Items,
}: {
    LeftTitle: React.ReactNode
    RightTitle?: React.ReactNode
    Items: Array<ItemInterface[]>
}) => {
    return (
        <Container>
            <Wapper>
                <div className="flex w-full justify-between px-2 pb-1">
                    <div className="flex flex-nowrap items-center">
                        {<>{LeftTitle}</>}
                    </div>
                    <div className="flex flex-nowrap items-center">
                        {RightTitle && <>{RightTitle}</>}
                    </div>
                </div>
                <TableWapper>
                    <Table>
                        <Body>
                            {Items &&
                                Items.length > 0 &&
                                Items.map(el => {
                                    return (
                                        <Row>
                                            {el.length > 0 &&
                                                el.map(e => {
                                                    return (
                                                        <Cell
                                                            textColor={
                                                                e.color
                                                                    ? e.color
                                                                    : 'gray'
                                                            }>
                                                            {e.name}
                                                        </Cell>
                                                    )
                                                })}
                                        </Row>
                                    )
                                })}
                        </Body>
                    </Table>
                </TableWapper>
            </Wapper>
        </Container>
    )
}

export default GeonDaonContentCard
