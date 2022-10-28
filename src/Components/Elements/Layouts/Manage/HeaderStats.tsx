import { HeaderStatsStyle } from '@Style/Layouts/Manage/MainStyles'

const { Cards, CardItem, Wapper, MainWapper, Container } = HeaderStatsStyle

export default function HeaderStats() {
    return (
        <>
            {/* Header */}
            <Container>
                <MainWapper>
                    <Wapper>
                        {/* Card stats */}
                        <Cards>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                        </Cards>
                    </Wapper>
                </MainWapper>
            </Container>
        </>
    )
}
