import React from 'react'
import { Spinner, VaryLineChart } from '@Elements'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'

const {
    GeonDaonStyle: {
        Card: {
            Container,
            Wapper,
            SpinnerWapper,
            ChartWapper,
            TitleBox,
            TitleWapper,
        },
    },
} = DashboardStyle

const GeonDaonChartCard = ({
    Loading,
    LeftTitle,
    RightTitle,
}: {
    Loading: boolean
    LeftTitle: React.ReactNode
    RightTitle?: React.ReactNode
}) => {
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
                    <ChartWapper>
                        <VaryLineChart />
                    </ChartWapper>
                )}
            </Wapper>
        </Container>
    )
}

export default GeonDaonChartCard
