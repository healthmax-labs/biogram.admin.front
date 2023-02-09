import React from 'react'
import { Spinner } from '@Elements'
import { TextColorType } from '@CommonTypes'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'

const {
    GeonDaonStyle: {
        Card: {
            Container,
            Wapper,
            SpinnerWapper,
            TableWapper,
            Table,
            Body,
            Row,
            Cell,
            TitleWapper,
            TitleBox,
        },
    },
} = DashboardStyle

interface ItemInterface {
    name: string
    color?: TextColorType
}

const GeonDaonContentCard = ({
    Loading,
    LeftTitle,
    RightTitle,
    Items,
}: {
    Loading: boolean
    LeftTitle: React.ReactNode
    RightTitle?: React.ReactNode
    Items: Array<ItemInterface[]>
}) => {
    return (
        <Container>
            <Wapper>
                {Loading ? (
                    <SpinnerWapper>
                        <Spinner />
                    </SpinnerWapper>
                ) : (
                    <>
                        <TitleWapper>
                            <TitleBox>{<>{LeftTitle}</>}</TitleBox>
                            <TitleBox>
                                {RightTitle && <>{RightTitle}</>}
                            </TitleBox>
                        </TitleWapper>
                        <TableWapper>
                            <Table>
                                <Body>
                                    {Items &&
                                        Items.length > 0 &&
                                        Items.map((el, elIndex) => {
                                            return (
                                                <Row
                                                    key={`geondaon-content-card-item-row-${elIndex}`}>
                                                    {el.length > 0 &&
                                                        el.map((e, eIndex) => {
                                                            return (
                                                                <Cell
                                                                    key={`geondaon-content-card-item-cell-${eIndex}`}
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
                    </>
                )}
            </Wapper>
        </Container>
    )
}

export default GeonDaonContentCard
