import React from 'react'
import { Spinner, VaryLineChart } from '@Elements'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { dateInsertHypen, generateRandomString } from '@Helper'

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
    ChartData,
}: {
    Loading: boolean
    LeftTitle: React.ReactNode
    RightTitle?: React.ReactNode
    ChartData: Array<{ Date: string; Value1: number; Value2: number }>
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
                        <VaryLineChart
                            ChartID={generateRandomString(10)}
                            Data1={ChartData.map(c => {
                                return {
                                    date: dateInsertHypen(c.Date),
                                    value: c.Value2,
                                }
                            })}
                            Data2={ChartData.map(c => {
                                return {
                                    date: dateInsertHypen(c.Date),
                                    value: c.Value1,
                                }
                            })}
                        />
                    </ChartWapper>
                )}
            </Wapper>
        </Container>
    )
}

export default GeonDaonChartCard
