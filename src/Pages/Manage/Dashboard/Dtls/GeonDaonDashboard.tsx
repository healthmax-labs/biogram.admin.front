import GeonDaonContentCard from './GeonDaonContentCard'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { useRecoilValue } from 'recoil'
import { addComma, dateInsertHypen } from '@Helper'
import Codes from '@Codes'
import _ from 'lodash'

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
                                            ∎ 오늘
                                        </p>
                                        <p className="flex text-xs pl-1">
                                            ∎ 전체
                                        </p>
                                    </>
                                }
                                Items={dashBoardPageState.member.list
                                    .slice(-3)
                                    .map(e => {
                                        const searchDate = dateInsertHypen(
                                            e.SEARCH_DE
                                        )
                                        return [
                                            {
                                                name: searchDate
                                                    ? String(searchDate)
                                                    : e.SEARCH_DE,
                                            },
                                            {
                                                name: String(e.TD_CNT),
                                                color: 'green',
                                            },
                                            {
                                                name: String(e.TT_CNT),
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
                                                            },
                                                            {
                                                                name: `${addComma(
                                                                    e.TT_TOT_RATE
                                                                )}%`,
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TD_TOT_CNT
                                                                ),
                                                                color: 'green',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TT_TOT_CNT
                                                                ),
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
                                                        return [
                                                            {
                                                                name: `${e.AGES_GROUP}대`,
                                                            },
                                                            {
                                                                name: `${addComma(
                                                                    e.TT_TOT_RATE
                                                                )}%`,
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TD_TOT_CNT
                                                                ),
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TT_TOT_RATE
                                                                ),
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
                                                Items={dashBoardPageState.riskFctr.list.map(
                                                    e => {
                                                        let name: string | ''
                                                        if (e.CNT_TY === 'TT') {
                                                            name = `오늘`
                                                        } else {
                                                            name = `합계`
                                                        }
                                                        return [
                                                            { name: name },
                                                            {
                                                                name: addComma(
                                                                    e.RISK_CNT
                                                                ),
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
                                                            ∎ 월 누적
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
                                                                    ? findCode.name
                                                                    : '',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TD_CNT
                                                                ),
                                                                color: 'orange',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TT_CNT
                                                                ),
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
                                                            ∎ 누적
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
                                                                    ? findCode.name
                                                                    : '',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    e.TT_CNT
                                                                ),
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
                                            오늘 15,312
                                        </p>
                                        <p className="flex text-xs pl-1">/</p>
                                        <p className="flex text-xs pl-1">
                                            전체 1,122,584
                                        </p>
                                    </>
                                }
                                Items={dashBoardPageState.mesureInfo.list
                                    .slice(-3)
                                    .map(e => {
                                        const searchDate = dateInsertHypen(
                                            e.MESURE_DE
                                        )
                                        return [
                                            {
                                                name: searchDate
                                                    ? String(searchDate)
                                                    : e.MESURE_DE,
                                            },
                                            { name: addComma(e.TD_CNT) },
                                            { name: addComma(e.TT_CNT) },
                                        ]
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
                                            Items={dashBoardPageState.mesureInfoZone.list.map(
                                                e => {
                                                    return [
                                                        { name: e.CNT_TY },
                                                        {
                                                            name: addComma(
                                                                e.MESURE_CNT
                                                            ),
                                                        },
                                                    ]
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
                                                        ∎ 월 누적
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
                                                                : '없는 device',
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.TD_CNT
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.MT_CNT
                                                            ),
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
                                                    return [
                                                        {
                                                            name: `${e.AGES_GROUP}`,
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.IW_CNT
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.IW_SCORE
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.NW_CNT
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.OW_CNT
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.IW_SCORE
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.NW_SCORE
                                                            ),
                                                        },
                                                        {
                                                            name: addComma(
                                                                e.OW_SCORE
                                                            ),
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
