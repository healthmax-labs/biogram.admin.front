import React, { useEffect, useState } from 'react'
import { DefaultSearchButton, PstinstSelector, VaryLabel } from '@Elements'
import GeonDaonContentCard from './GeonDaonContentCard'
import GeonDaonChartCard from './GeonDaonChartCard'
import { DashboardStyle } from '@Style/Pages/DashboardStyle'
import { DashBoardPageState } from '@Recoil/DashboardPagesState'
import { AtomRootState } from '@Recoil/AppRootState'
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

type QmuChartType = string | `total` | `dmu` | `mmu` | `qmu`

const initializeState = {
    qmuchart: {
        gubun: 'total',
    },
}

const GeonDaonDashboard = () => {
    const [dashBoardPageState, setDashBoardPageState] =
        useRecoilState(DashBoardPageState)
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const atomRootState = useRecoilValue(AtomRootState)
    const { handleGetGeonDaonData } = useDashBoard()
    const { handlMainAlert } = useMainLayouts()

    const [pageState, setPageState] = useState<{
        qmuchart: {
            gubun: QmuChartType
        }
    }>(initializeState)

    const myData = Codes.myData.flatMap(i => i.list)
    const DeviceCode = Codes.StatisticsDeviceCode.flatMap(i => i.list)

    const handleSEarchButtonClick = () => {
        handleGetGeonDaonData(dashBoardPageState.instNo)
    }

    const handleClickQmuChatGubun = ({ gubun }: { gubun: QmuChartType }) => {
        setPageState(prevState => ({
            ...prevState,
            qmuchart: {
                ...prevState.qmuchart,
                gubun: gubun,
            },
        }))
    }

    useEffect(() => {
        setDashBoardPageState(prevState => ({
            ...prevState,
            qmu: {
                ...prevState.qmu,
                status: `success`,
            },
        }))
    }, [pageState.qmuchart.gubun, setDashBoardPageState])

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
                                <GeonDaonContentCard
                                    Loading={
                                        dashBoardPageState.notice.status ===
                                        'loading'
                                    }
                                    LeftTitle={
                                        <>
                                            <p className="flex text-xs">
                                                공지사항
                                            </p>
                                        </>
                                    }
                                    Items={dashBoardPageState.notice.list.map(
                                        e => {
                                            return [
                                                {
                                                    name: e.TITLE,
                                                    textAlign: 'left',
                                                    color: 'gray',
                                                    type: `link`,
                                                    link: `/manage/helper/notice/${e.POST_ID}/detail`,
                                                },
                                                {
                                                    name: e.REGIST_DT,
                                                    textAlign: 'right',
                                                    type: `link`,
                                                    link: `/manage/helper/notice/${e.POST_ID}/detail`,
                                                },
                                            ]
                                        }
                                    )}
                                />
                            </FlexFull>
                            <FlexFull>
                                <GeonDaonChartCard
                                    LineCount={2}
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
                            </FlexNowrapFull>
                        </WapperCol>
                    </LeftWapper>
                    <RightWapper>
                        <WapperCol>
                            <FlexFull>
                                <GeonDaonChartCard
                                    LineCount={3}
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
                                            <p className="flex text-xs pl-1 text-red-600">
                                                ∎ 오늘
                                            </p>
                                            <p className="flex text-xs pl-1 text-blue-600">
                                                ∎ 최근 30일
                                            </p>
                                            <p className="flex text-xs pl-1 text-teal-600">
                                                ∎ 최근 90일
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
                                                          Value1: mesure.TM_CNT,
                                                          Value2: mesure.TD_CNT,
                                                          Value3: mesure.TQ_CNT,
                                                      }
                                                  }
                                              )
                                            : []
                                    }
                                    Data1Color={`#FF0000`}
                                    Data2Color={`#0000FF`}
                                    Data3Color={`#008080`}
                                />
                            </FlexFull>
                            {atomRootState.userinfo.AUTH_CODE === 'SM00' && (
                                <FlexFull>
                                    <GeonDaonChartCard
                                        LineCount={(() => {
                                            if (
                                                pageState.qmuchart.gubun ===
                                                'total'
                                            ) {
                                                return 3
                                            } else {
                                                return 1
                                            }
                                        })()}
                                        Loading={
                                            dashBoardPageState.qmu.status ===
                                            'loading'
                                        }
                                        LeftTitle={
                                            <>
                                                <p className="flex text-xs">
                                                    QMU
                                                </p>
                                                <p className="flex text-little object-bottom pl-1">
                                                    (단위: 명)
                                                </p>

                                                <div className="flex pl-1 items-stretch">
                                                    <div>
                                                        <span className="group relative">
                                                            <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                                                <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                                                    <p className="text-xs">
                                                                        측정(혈압,
                                                                        허리둘레,
                                                                        혈당,
                                                                        중성지방,
                                                                        고밀도콜레스테롤,
                                                                        스트레스를
                                                                        측정)
                                                                        서비스와
                                                                    </p>
                                                                    <p className="text-xs">
                                                                        모바일
                                                                        건강
                                                                        서비스(모바일
                                                                        앱 기반
                                                                        보행 수
                                                                        측정,
                                                                        마인드미러,
                                                                        설문조사
                                                                        서비스)를
                                                                        사용한
                                                                        순
                                                                        이용자
                                                                        수
                                                                    </p>
                                                                    <br />
                                                                    <p className="text-xs">
                                                                        DMU :
                                                                        1일 기준
                                                                        / MMU :
                                                                        최근
                                                                        30일
                                                                        기준 /
                                                                        QMU :
                                                                        최근
                                                                        90일
                                                                        기준
                                                                    </p>
                                                                    <svg
                                                                        className="absolute left-0 top-full h-2 w-full text-black"
                                                                        x="0px"
                                                                        y="0px"
                                                                        viewBox="0 0 255 255">
                                                                        <polygon
                                                                            className="fill-current"
                                                                            points="0,0 127.5,127.5 255,0"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.7
                                                                }
                                                                stroke="gray"
                                                                className="w-4 h-4 cursor-pointer">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        RightTitle={
                                            <>
                                                <p
                                                    className="flex text-xs pl-1 text-gray-600 cursor-pointer"
                                                    onClick={() => {
                                                        if (
                                                            pageState.qmuchart
                                                                .gubun ===
                                                            'total'
                                                        ) {
                                                            return
                                                        }
                                                        setDashBoardPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                qmu: {
                                                                    ...prevState.qmu,
                                                                    status: `loading`,
                                                                },
                                                            })
                                                        )

                                                        handleClickQmuChatGubun(
                                                            {
                                                                gubun: `total`,
                                                            }
                                                        )
                                                    }}>
                                                    ∎ 전체보기
                                                </p>
                                                <p
                                                    className="flex text-xs pl-1 text-orange-600 cursor-pointer"
                                                    onClick={() => {
                                                        if (
                                                            pageState.qmuchart
                                                                .gubun === 'dmu'
                                                        ) {
                                                            return
                                                        }
                                                        setDashBoardPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                qmu: {
                                                                    ...prevState.qmu,
                                                                    status: `loading`,
                                                                },
                                                            })
                                                        )

                                                        handleClickQmuChatGubun(
                                                            {
                                                                gubun: `dmu`,
                                                            }
                                                        )
                                                    }}>
                                                    ∎ DMU
                                                </p>
                                                <p
                                                    className="flex text-xs pl-1 text-blue-600 cursor-pointer"
                                                    onClick={() => {
                                                        if (
                                                            pageState.qmuchart
                                                                .gubun === 'mmu'
                                                        ) {
                                                            return
                                                        }
                                                        setDashBoardPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                qmu: {
                                                                    ...prevState.qmu,
                                                                    status: `loading`,
                                                                },
                                                            })
                                                        )

                                                        handleClickQmuChatGubun(
                                                            {
                                                                gubun: `mmu`,
                                                            }
                                                        )
                                                    }}>
                                                    ∎ MMU
                                                </p>
                                                <p
                                                    className="flex text-xs pl-1 text-teal-600 cursor-pointer "
                                                    onClick={() => {
                                                        if (
                                                            pageState.qmuchart
                                                                .gubun === 'qmu'
                                                        ) {
                                                            return
                                                        }

                                                        setDashBoardPageState(
                                                            prevState => ({
                                                                ...prevState,
                                                                qmu: {
                                                                    ...prevState.qmu,
                                                                    status: `loading`,
                                                                },
                                                            })
                                                        )
                                                        handleClickQmuChatGubun(
                                                            {
                                                                gubun: `qmu`,
                                                            }
                                                        )
                                                    }}>
                                                    ∎ QMU
                                                </p>
                                            </>
                                        }
                                        ChartData={(() => {
                                            if (
                                                pageState.qmuchart.gubun ===
                                                'dmu'
                                            ) {
                                                return dashBoardPageState.qmu
                                                    .list.length > 0
                                                    ? dashBoardPageState.qmu.list.map(
                                                          mesure => {
                                                              return {
                                                                  Date: mesure.USE_DT,
                                                                  Value1: mesure.TD_CNT,
                                                              }
                                                          }
                                                      )
                                                    : []
                                            } else if (
                                                pageState.qmuchart.gubun ===
                                                'mmu'
                                            ) {
                                                return dashBoardPageState.qmu
                                                    .list.length > 0
                                                    ? dashBoardPageState.qmu.list.map(
                                                          mesure => {
                                                              return {
                                                                  Date: mesure.USE_DT,
                                                                  Value1: mesure.TM_CNT,
                                                              }
                                                          }
                                                      )
                                                    : []
                                            } else if (
                                                pageState.qmuchart.gubun ===
                                                'qmu'
                                            ) {
                                                return dashBoardPageState.qmu
                                                    .list.length > 0
                                                    ? dashBoardPageState.qmu.list.map(
                                                          mesure => {
                                                              return {
                                                                  Date: mesure.USE_DT,
                                                                  Value1: mesure.TQ_CNT,
                                                              }
                                                          }
                                                      )
                                                    : []
                                            }

                                            return dashBoardPageState.qmu.list
                                                .length > 0
                                                ? dashBoardPageState.qmu.list.map(
                                                      mesure => {
                                                          return {
                                                              Date: mesure.USE_DT,
                                                              Value1: mesure.TM_CNT,
                                                              Value2: mesure.TD_CNT,
                                                              Value3: mesure.TQ_CNT,
                                                          }
                                                      }
                                                  )
                                                : []
                                        })()}
                                        Data1Color={(() => {
                                            if (
                                                pageState.qmuchart.gubun ===
                                                'dmu'
                                            ) {
                                                return `#FF0000`
                                            } else if (
                                                pageState.qmuchart.gubun ===
                                                'mmu'
                                            ) {
                                                return `#0000FF`
                                            } else if (
                                                pageState.qmuchart.gubun ===
                                                'qmu'
                                            ) {
                                                return `#008080`
                                            } else {
                                                return `#FF0000`
                                            }
                                        })()}
                                        Data2Color={`#0000FF`}
                                        Data3Color={`#008080`}
                                    />
                                </FlexFull>
                            )}
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
                                                Items={Codes.etc.dayCode.type5.map(
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
                                                        <p className="flex text-xs pl-1 text-orange-600">
                                                            ∎ 최근 30일
                                                        </p>
                                                        <p className="flex text-xs pl-1">
                                                            ∎ 최근 90일
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
                                                                color: 'orange',
                                                            },
                                                            {
                                                                name: addComma(
                                                                    Number(
                                                                        e.QT_CNT
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
