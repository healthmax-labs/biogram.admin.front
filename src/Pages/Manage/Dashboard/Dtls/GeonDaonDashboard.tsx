import React from 'react'
import { DefaultSearchButton, PstinstSelector, VaryLabel } from '@Elements'
import GeonDaonContentCard from './GeonDaonContentCard'
import GeonDaonChartCard from './GeonDaonChartCard'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addComma } from '@Helper'
import Codes from '@Codes'
import _ from 'lodash'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useDashBoard, useMainLayouts } from '@Hook/index'
import Messages from '@Messages'

const {
    GeonDaonStyle: {
        Container,
        Wapper,
        ChartWapper,
        SearchBox,
        SearchItem,
        LeftWapper,
        RightWapper,
        WapperCol,
        FlexFull,
        FlexNowrapFull,
        FlexHelf,
    },
} = DashboardStyle

const GeonDaonDashboard = () => {
    const [dashBoardPageState, setDashBoardPageState] =
        useRecoilState(DashBoardPageState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const { handleGetGeonDaonData } = useDashBoard()
    const { handlMainAlert } = useMainLayouts()

    const myData = Codes.myData.flatMap(i => i.list)
    const DeviceCode = Codes.StatisticsDeviceCode.flatMap(i => i.list)

    const handleSEarchButtonClick = () => {
        handleGetGeonDaonData(dashBoardPageState.instNo)
    }

    return (
        <Container>
            <Wapper>
                <ChartWapper>
                    <SearchBox>
                        <VaryLabel
                            LabelName={`소속`}
                            TextAlign={`left`}
                            LabelWidth={`w8`}
                            Children={
                                <SearchItem.ItemWapper>
                                    <SearchItem.Selector>
                                        <PstinstSelector
                                            SelectElement={{
                                                value: dashBoardPageState.instNo,
                                                text: dashBoardPageState.instNm,
                                            }}
                                            HandleSelectValue={({
                                                instNo,
                                                instNm,
                                            }) => {
                                                setDashBoardPageState(
                                                    prevState => ({
                                                        ...prevState,
                                                        instNo: instNo,
                                                        instNm: instNm,
                                                    })
                                                )
                                            }}
                                        />
                                    </SearchItem.Selector>
                                    <SearchItem.SearchBotton>
                                        <div>
                                            <DefaultSearchButton
                                                ButtonClick={() => {
                                                    if (
                                                        _.isNull(
                                                            dashBoardPageState.instNo
                                                        ) ||
                                                        _.isNull(
                                                            dashBoardPageState.instNm
                                                        )
                                                    ) {
                                                        handlMainAlert({
                                                            state: true,
                                                            message:
                                                                Messages.Default
                                                                    .pstinstSelectEmpty,
                                                        })
                                                        return
                                                    }
                                                    handleSEarchButtonClick()
                                                }}
                                            />
                                        </div>
                                    </SearchItem.SearchBotton>
                                </SearchItem.ItemWapper>
                            }
                        />
                    </SearchBox>
                </ChartWapper>
                <ChartWapper>
                    <LeftWapper>
                        <WapperCol>
                            <FlexFull>
                                <GeonDaonChartCard
                                    Loading={
                                        dashBoardPageState.member.status ===
                                        'loading'
                                    }
                                    LeftTitle={
                                        <>
                                            <p className="flex text-xs">
                                                회원현황
                                            </p>
                                            <p className="flex text-little object-bottom pl-1">
                                                (단위: 명)
                                            </p>
                                        </>
                                    }
                                    RightTitle={
                                        <>
                                            <p className="flex text-xs pl-1 text-teal-600">
                                                ∎ 신규
                                            </p>
                                            <p className="flex text-xs pl-1">
                                                ∎ 전체
                                            </p>
                                        </>
                                    }
                                    ChartData={
                                        dashBoardPageState.member.list.length >
                                        0
                                            ? dashBoardPageState.member.list.map(
                                                  member => {
                                                      return {
                                                          Date: member.SEARCH_DE,
                                                          Value1: member.TT_CNT,
                                                          Value2: member.TD_CNT,
                                                      }
                                                  }
                                              )
                                            : []
                                    }
                                />
                            </FlexFull>
                            <FlexNowrapFull>
                                <FlexHelf>
                                    <WapperCol>
                                        <div>
                                            {
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .gender.status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                성별 회원현황
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: 명)
                                                            </p>
                                                        </>
                                                    }
                                                    RightTitle={
                                                        <>
                                                            <p className="flex text-xs pl-1 text-teal-600">
                                                                {`오늘 ${addComma(
                                                                    dashBoardPageState
                                                                        .gender
                                                                        .count
                                                                        .today
                                                                )}`}
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                /
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                {`전체 ${addComma(
                                                                    dashBoardPageState
                                                                        .gender
                                                                        .count
                                                                        .total
                                                                )}`}
                                                            </p>
                                                        </>
                                                    }
                                                    Items={dashBoardPageState.gender.list.map(
                                                        e => {
                                                            return [
                                                                {
                                                                    name: e.SEXDSTN,
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: `${addComma(
                                                                        e.TT_TOT_RATE
                                                                    )}%`,
                                                                    textAlign:
                                                                        'center',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TD_TOT_CNT
                                                                    ),
                                                                    color: 'green',
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TT_TOT_CNT
                                                                    ),
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div>
                                            {
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .ageGroup.status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                연령별 회원 현황
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: 명)
                                                            </p>
                                                        </>
                                                    }
                                                    RightTitle={
                                                        <>
                                                            <p className="flex text-xs pl-1 text-teal-600">
                                                                ∎ 신규
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                ∎ 전체
                                                            </p>
                                                        </>
                                                    }
                                                    Items={dashBoardPageState.ageGroup.list.map(
                                                        e => {
                                                            const findCode =
                                                                _.find(
                                                                    Codes
                                                                        .ageGroup
                                                                        .list,
                                                                    {
                                                                        code: String(
                                                                            e.AGES_GROUP
                                                                        ),
                                                                    }
                                                                )

                                                            return [
                                                                {
                                                                    name: `${
                                                                        findCode
                                                                            ? findCode.name
                                                                            : ''
                                                                    }`,
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: `${_.round(
                                                                        e.TT_TOT_RATE,
                                                                        2
                                                                    ).toFixed(
                                                                        1
                                                                    )}%`,
                                                                    textAlign:
                                                                        'center',
                                                                },
                                                                {
                                                                    name: `${addComma(
                                                                        e.TD_TOT_CNT
                                                                    )}`,
                                                                    color: 'green',
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                                {
                                                                    name: `${addComma(
                                                                        e.TT_TOT_CNT
                                                                    )}`,
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div>
                                            {
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .riskFctr.status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                위험 요인 현황
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: 명)
                                                            </p>
                                                        </>
                                                    }
                                                    Items={Codes.etc.dayCode.type4.map(
                                                        day => {
                                                            const findData =
                                                                _.find(
                                                                    dashBoardPageState
                                                                        .riskFctr
                                                                        .list,
                                                                    {
                                                                        CNT_TY: day.code,
                                                                    }
                                                                )

                                                            if (findData) {
                                                                return [
                                                                    {
                                                                        name: day.name,
                                                                        textAlign:
                                                                            'left',
                                                                    },
                                                                    {
                                                                        name: addComma(
                                                                            findData.RISK_CNT
                                                                        ),
                                                                        textAlign:
                                                                            'right',
                                                                    },
                                                                ]
                                                            } else {
                                                                return [
                                                                    {
                                                                        name: day.name,
                                                                        textAlign:
                                                                            'left',
                                                                    },
                                                                    {
                                                                        name: '0',
                                                                        textAlign:
                                                                            'right',
                                                                    },
                                                                ]
                                                            }
                                                        }
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div>
                                            {
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .fctrFctrGroup
                                                            .status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                위험 요인별 현황
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: 명)
                                                            </p>
                                                        </>
                                                    }
                                                    RightTitle={
                                                        <>
                                                            <p className="flex text-xs pl-1 text-orange-600">
                                                                ∎ 오늘
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                ∎ 6개월
                                                            </p>
                                                        </>
                                                    }
                                                    Items={dashBoardPageState.fctrFctrGroup.list.map(
                                                        e => {
                                                            const findCode =
                                                                _.find(myData, {
                                                                    code: e.MESURE_CODE,
                                                                })
                                                            return [
                                                                {
                                                                    name: findCode
                                                                        ? findCode.genName
                                                                        : '',
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TD_CNT
                                                                    ),
                                                                    color: 'orange',
                                                                    textAlign:
                                                                        'center',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TT_CNT
                                                                    ),
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    )}
                                                />
                                            }
                                        </div>
                                    </WapperCol>
                                </FlexHelf>
                                <FlexHelf>
                                    <WapperCol>
                                        <div>
                                            {
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .riskGroupDormant
                                                            .status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                위험군 휴면 현황
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: 명)
                                                            </p>
                                                        </>
                                                    }
                                                    RightTitle={
                                                        <>
                                                            <p className="flex text-xs pl-1 text-orange-600">
                                                                ∎ 오늘
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                ∎ 6개월
                                                            </p>
                                                        </>
                                                    }
                                                    Items={dashBoardPageState.riskGroupDormant.list.map(
                                                        e => {
                                                            const findCode =
                                                                _.find(myData, {
                                                                    code: e.MESURE_CODE,
                                                                })
                                                            return [
                                                                {
                                                                    name: findCode
                                                                        ? findCode.genName
                                                                        : '',
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TD_CNT
                                                                    ),
                                                                    textAlign:
                                                                        'center',
                                                                    color: 'orange',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.TT_CNT
                                                                    ),
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    )}
                                                />
                                            }
                                        </div>
                                    </WapperCol>
                                </FlexHelf>
                            </FlexNowrapFull>
                        </WapperCol>
                    </LeftWapper>
                    <RightWapper>
                        <WapperCol>
                            <FlexFull>
                                <GeonDaonChartCard
                                    Loading={
                                        dashBoardPageState.mesureInfo.status ===
                                        'loading'
                                    }
                                    LeftTitle={
                                        <>
                                            <p className="flex text-xs">
                                                측정현황
                                            </p>
                                            <p className="flex text-little object-bottom pl-1">
                                                (단위: 명)
                                            </p>
                                        </>
                                    }
                                    RightTitle={
                                        <>
                                            <p className="flex text-xs pl-1 text-teal-600">
                                                ∎ 신규
                                            </p>
                                            <p className="flex text-xs pl-1">
                                                ∎ 전체
                                            </p>
                                        </>
                                    }
                                    ChartData={
                                        dashBoardPageState.mesureInfo.list
                                            .length > 0
                                            ? dashBoardPageState.mesureInfo.list.map(
                                                  mesure => {
                                                      return {
                                                          Date: mesure.MESURE_DE,
                                                          Value1: mesure.TT_CNT,
                                                          Value2: mesure.TD_CNT,
                                                      }
                                                  }
                                              )
                                            : []
                                    }
                                />
                            </FlexFull>
                            <FlexNowrapFull>
                                <FlexHelf>
                                    <WapperCol>
                                        <div>
                                            <GeonDaonContentCard
                                                Loading={
                                                    dashBoardPageState
                                                        .mesureInfoZone
                                                        .status === 'loading'
                                                }
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            측정 현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                Items={Codes.etc.dayCode.type2.map(
                                                    day => {
                                                        const findData = _.find(
                                                            dashBoardPageState
                                                                .mesureInfoZone
                                                                .list,
                                                            { CNT_TY: day.code }
                                                        )

                                                        if (findData) {
                                                            return [
                                                                {
                                                                    name: day.name,
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        findData.MESURE_CNT
                                                                    ),
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        } else {
                                                            return [
                                                                {
                                                                    name: day.name,
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: '0',
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    }
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <GeonDaonContentCard
                                                Loading={
                                                    dashBoardPageState
                                                        .mesureInfoZoneDevice
                                                        .status === 'loading'
                                                }
                                                LeftTitle={
                                                    <>
                                                        <p className="flex text-xs">
                                                            기기별 측정현황
                                                        </p>
                                                        <p className="flex text-little object-bottom pl-1">
                                                            (단위: 명)
                                                        </p>
                                                    </>
                                                }
                                                RightTitle={
                                                    <>
                                                        <p className="flex text-xs pl-1 text-blue-600">
                                                            ∎ 오늘
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 최근 30일
                                                        </p>
                                                    </>
                                                }
                                                Items={dashBoardPageState.mesureInfoZoneDevice.list.map(
                                                    e => {
                                                        const findCode = _.find(
                                                            DeviceCode,
                                                            {
                                                                code: e.MESURE_TY,
                                                            }
                                                        )

                                                        return [
                                                            {
                                                                name: findCode
                                                                    ? findCode.name
                                                                    : e.MESURE_TY,
                                                                textAlign:
                                                                    'left',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    Number(
                                                                        e.TD_CNT
                                                                    )
                                                                ),
                                                                textAlign:
                                                                    'center',
                                                                color: 'blue',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    Number(
                                                                        e.MT_CNT
                                                                    )
                                                                ),
                                                                textAlign:
                                                                    'right',
                                                            },
                                                        ]
                                                    }
                                                )}
                                            />
                                        </div>
                                    </WapperCol>
                                </FlexHelf>
                                <FlexHelf>
                                    <WapperCol>
                                        {mainLayoutState.Theme ===
                                            'GeonDaon' && (
                                            <div>
                                                <GeonDaonContentCard
                                                    Loading={
                                                        dashBoardPageState
                                                            .mybodyScoreImprvm
                                                            .status ===
                                                        'loading'
                                                    }
                                                    LeftTitle={
                                                        <>
                                                            <p className="flex text-xs">
                                                                건강 개선률
                                                            </p>
                                                            <p className="flex text-little object-bottom pl-1">
                                                                (단위: %)
                                                            </p>
                                                        </>
                                                    }
                                                    RightTitle={
                                                        <>
                                                            <p className="flex text-xs pl-1 text-blue-600">
                                                                ∎ 내근직
                                                            </p>
                                                            <p className="flex text-xs pl-1">
                                                                ∎ 외근직
                                                            </p>
                                                        </>
                                                    }
                                                    Items={dashBoardPageState.mybodyScoreImprvm.list.map(
                                                        e => {
                                                            const findCode =
                                                                _.find(
                                                                    Codes
                                                                        .ageGroup
                                                                        .list,
                                                                    {
                                                                        code: String(
                                                                            e.AGES_GROUP
                                                                        ),
                                                                    }
                                                                )

                                                            return [
                                                                {
                                                                    name: `${
                                                                        findCode
                                                                            ? findCode.name
                                                                            : e.AGES_GROUP
                                                                    }`,
                                                                    textAlign:
                                                                        'left',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.IW_SCORE
                                                                    ),
                                                                    color: 'blue',
                                                                },
                                                                {
                                                                    name: addComma(
                                                                        e.OW_SCORE
                                                                    ),
                                                                    textAlign:
                                                                        'right',
                                                                },
                                                            ]
                                                        }
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </WapperCol>
                                </FlexHelf>
                            </FlexNowrapFull>
                        </WapperCol>
                    </RightWapper>
                </ChartWapper>
            </Wapper>
        </Container>
    )
}

export default GeonDaonDashboard
