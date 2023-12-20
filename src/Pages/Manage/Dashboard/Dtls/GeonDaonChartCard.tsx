import React from 'react'
import {
    Spinner,
    VaryLineChart,
    VaryThreeLineChart,
    VarySingleLineChart,
} from '@Elements'
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
    LineCount,
    LeftTitle,
    RightTitle,
    ChartData,
    Data1Color,
    Data2Color,
    Data3Color,
}: {
    Loading: boolean
    LeftTitle: React.ReactNode
    RightTitle?: React.ReactNode
    LineCount: 1 | 2 | 3
    ChartData: Array<{
        Date: string
        Value1: number
        Value2?: number
        Value3?: number
    }>
    Data1Color?: string
    Data2Color?: string
    Data3Color?: string
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
                        {(() => {
                            if (LineCount === 1) {
                                return (
                                    <VarySingleLineChart
                                        ChartID={generateRandomString(10)}
                                        Data1={ChartData.map(c => {
                                            return {
                                                date: dateInsertHypen(c.Date),
                                                value: c.Value1 ? c.Value1 : 0,
                                            }
                                        })}
                                        Data1Color={Data1Color}
                                    />
                                )
                            } else if (LineCount === 2) {
                                return (
                                    <VaryLineChart
                                        ChartID={generateRandomString(10)}
                                        Data1={ChartData.map(c => {
                                            return {
                                                date: dateInsertHypen(c.Date),
                                                value: c.Value2 ? c.Value2 : 0,
                                            }
                                        })}
                                        Data2={ChartData.map(c => {
                                            return {
                                                date: dateInsertHypen(c.Date),
                                                value: c.Value1,
                                            }
                                        })}
                                    />
                                )
                            } else if (LineCount === 3) {
                                return (
                                    <VaryThreeLineChart
                                        ChartID={generateRandomString(10)}
                                        Data1={ChartData.map(c => {
                                            return {
                                                date: dateInsertHypen(c.Date),
                                                value: c.Value2 ? c.Value2 : 0,
                                            }
                                        })}
                                        Data1Color={Data1Color}
                                        Data2={ChartData.map(c => {
                                            return {
                                                date: dateInsertHypen(c.Date),
                                                value: c.Value1,
                                            }
                                        })}
                                        Data2Color={Data2Color}
                                        Data3={ChartData.map(c => {
                                            if (c.Value3) {
                                                return {
                                                    date: dateInsertHypen(
                                                        c.Date
                                                    ),
                                                    value: c.Value3,
                                                }
                                            } else {
                                                return {
                                                    date: ``,
                                                    value: null,
                                                }
                                            }
                                        })}
                                        Data3Color={Data3Color}
                                    />
                                )
                            }
                        })()}
                    </ChartWapper>
                )}
            </Wapper>
        </Container>
    )
}

export default GeonDaonChartCard
