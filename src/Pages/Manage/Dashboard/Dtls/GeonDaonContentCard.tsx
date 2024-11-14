import React from 'react'
import { Spinner } from '@Elements'
import { TextColorType, TextAlignType } from '@CommonTypes'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { useNavigate } from 'react-router-dom'

const {
    GeonDaonStyle: {
        Card: {
            Container,
            Wapper,
            SpinnerWapper,
            TableWapper,
            TitleBox,
            TableBox: { Table, Body, Row, Cell },
            TitleWapper,
        },
    },
} = DashboardStyle

interface ItemInterface {
    name: string
    color?: TextColorType
    textAlign?: TextAlignType
    type?: `text` | `link`
    link?: string
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
    const navigate = useNavigate()
    return (
        <Container>
            <Wapper>
                <TitleWapper>
                    <TitleBox>{<>{LeftTitle}</>}</TitleBox>
                    <TitleBox>{RightTitle && <>{RightTitle}</>}</TitleBox>
                </TitleWapper>
                {Loading ? (
                    <SpinnerWapper>
                        <Spinner />
                    </SpinnerWapper>
                ) : (
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
                                                                }
                                                                TextAlign={
                                                                    e.textAlign
                                                                        ? e.textAlign
                                                                        : 'center'
                                                                }>
                                                                {e.type &&
                                                                e.type ===
                                                                    `link` ? (
                                                                    <div
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            navigate(
                                                                                {
                                                                                    pathname:
                                                                                        process
                                                                                            .env
                                                                                            .PUBLIC_URL +
                                                                                        `${e.link}`,
                                                                                }
                                                                            )
                                                                        }}>
                                                                        {e.name}
                                                                    </div>
                                                                ) : (
                                                                    e.name
                                                                )}
                                                            </Cell>
                                                        )
                                                    })}
                                            </Row>
                                        )
                                    })}
                            </Body>
                        </Table>
                    </TableWapper>
                )}
            </Wapper>
        </Container>
    )
}

export default GeonDaonContentCard
