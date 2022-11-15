import { HeaderStatsStyle } from '@Style/Layouts/Manage/MainStyles'

const { Cards, CardItem, Wapper, MainWapper, Container } = HeaderStatsStyle

const HeaderStats = () => {
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

export default HeaderStats
