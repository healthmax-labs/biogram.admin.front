import GeonDaonContentCard from './GeonDaonContentCard'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { useRecoilValue } from 'recoil'
import { addComma, dateInsertHypen, getDateDayUnit } from '@Helper'
import Codes from '@Codes'
import _ from 'lodash'
import React from 'react'

const {
    GeonDaonStyle: {
        Container,
        Wapper,
        LeftWapper,
        RightWapper,
        WapperCol,
        FlexFull,
        FlexNowrapFull,
        FlexHelf,
    },
} = DashboardStyle

const GeonDaonDashboard = () => {
    const dashBoardPageState = useRecoilValue(DashBoardPageState)

    const myData = Codes.myData.flatMap(i => i.list)
    const DeviceCode = Codes.StatisticsDeviceCode.flatMap(i => i.list)

    return (
        <Container>
            <Wapper>
                <LeftWapper>
                    <WapperCol>
                        <FlexFull>
                            <GeonDaonContentCard
                                Loading={
                                    dashBoardPageState.member.status ===
                                    'loading'
                                }
                                LeftTitle={
                                    <>
                                        <p className="flex text-xs">회원현황</p>
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
                                Items={[0, 1, 2].map(e => {
                                    const {
                                        member: { list },
                                    } = dashBoardPageState

                                    const findDate = getDateDayUnit(e)

                                    const findData = _.find(list, {
                                        SEARCH_DE: findDate,
                                    })

                                    return [
                                        {
                                            name: String(
                                                dateInsertHypen(findDate)
                                            ),
                                            textAlign: 'left',
                                        },
                                        {
                                            name: findData
                                                ? String(findData.TD_CNT)
                                                : '0',
                                            color: 'green',
                                            textAlign: 'center',
                                        },
                                        {
                                            name: findData
                                                ? String(findData.TT_CNT)
                                                : '0',
                                            textAlign: 'right',
                                        },
                                    ]
                                })}
                            />
                        </FlexFull>
                        <FlexNowrapFull>
                            <FlexHelf>
                                <WapperCol>
                                    <div>
                                        {
                                            <GeonDaonContentCard
                                                Loading={
                                                    dashBoardPageState.gender
                                                        .status === 'loading'
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
                                                                    .count.today
                                                            )}`}
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            /
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            {`전체 ${addComma(
                                                                dashBoardPageState
                                                                    .gender
                                                                    .count.total
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
                                                    dashBoardPageState.ageGroup
                                                        .status === 'loading'
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
                                                        const findCode = _.find(
                                                            Codes.ageGroup.list,
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
                                                                    e.TD_TOT_CNT,
                                                                    2
                                                                ).toFixed(1)}%`,
                                                                textAlign:
                                                                    'center',
                                                            },
                                                            {
                                                                // name: addComma( e.TT_TOT_RATE ),
                                                                name: `${_.round(
                                                                    e.TT_TOT_RATE,
                                                                    2
                                                                ).toFixed(1)}%`,
                                                                textAlign:
                                                                    'right',
                                                            },
                                                            {
                                                                name: String(
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
                                                    dashBoardPageState.riskFctr
                                                        .status === 'loading'
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
                                                        const findData = _.find(
                                                            dashBoardPageState
                                                                .riskFctr.list,
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
                                                        .status === 'loading'
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
                                                        const findCode = _.find(
                                                            myData,
                                                            {
                                                                code: e.MESURE_CODE,
                                                            }
                                                        )
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
                                                        .status === 'loading'
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
                                                        const findCode = _.find(
                                                            myData,
                                                            {
                                                                code: e.MESURE_CODE,
                                                            }
                                                        )
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
                            <GeonDaonContentCard
                                Loading={
                                    dashBoardPageState.mesureInfo.status ===
                                    'loading'
                                }
                                LeftTitle={
                                    <>
                                        <p className="flex text-xs">측정현황</p>
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
                                            ∎ 최근 30일
                                        </p>
                                    </>
                                }
                                Items={[0, 1, 2].map(e => {
                                    const {
                                        mesureInfo: { list },
                                    } = dashBoardPageState

                                    const findDate = getDateDayUnit(e)

                                    const findData = _.find(list, {
                                        MESURE_DE: findDate,
                                    })

                                    if (findData) {
                                        return [
                                            {
                                                name: String(
                                                    dateInsertHypen(findDate)
                                                ),
                                                textAlign: 'left',
                                            },
                                            {
                                                name: findData
                                                    ? findData.TD_CNT
                                                    : '0',
                                                color: 'green',
                                                textAlign: 'center',
                                            },
                                            {
                                                name: findData
                                                    ? findData.TT_CNT
                                                    : '0',
                                                textAlign: 'right',
                                            },
                                        ]
                                    } else {
                                        return []
                                    }
                                })}
                            />
                        </FlexFull>
                        <FlexNowrapFull>
                            <FlexHelf>
                                <WapperCol>
                                    <div>
                                        <GeonDaonContentCard
                                            Loading={
                                                dashBoardPageState
                                                    .mesureInfoZone.status ===
                                                'loading'
                                            }
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        존 측정 현황
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
                                                        존 기기별 측정현황
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
                                                            textAlign: 'left',
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.TD_CNT
                                                            ),
                                                            textAlign: 'center',
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.MT_CNT
                                                            ),
                                                            textAlign: 'right',
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
                                    <div>
                                        <GeonDaonContentCard
                                            Loading={
                                                dashBoardPageState
                                                    .mybodyScoreImprvm
                                                    .status === 'loading'
                                            }
                                            LeftTitle={
                                                <>
                                                    <p className="flex text-xs">
                                                        건강 개선률
                                                    </p>
                                                    <p className="flex text-little object-bottom pl-1">
                                                        (단위: 명)
                                                    </p>
                                                </>
                                            }
                                            Items={dashBoardPageState.mybodyScoreImprvm.list.map(
                                                e => {
                                                    const findCode = _.find(
                                                        Codes.ageGroup.list,
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
                                                            textAlign: 'left',
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.IW_SCORE
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.OW_SCORE
                                                            ),
                                                            textAlign: 'right',
                                                        },
                                                    ]
                                                }
                                            )}
                                        />
                                    </div>
                                </WapperCol>
                            </FlexHelf>
                        </FlexNowrapFull>
                    </WapperCol>
                </RightWapper>
            </Wapper>
        </Container>
    )
}

export default GeonDaonDashboard
