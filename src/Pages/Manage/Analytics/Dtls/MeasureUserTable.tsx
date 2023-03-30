import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MesureListState } from '@Recoil/AnalyticsPagesState'
import React, { useState } from 'react'
import Codes from '@Codes'
import _ from 'lodash'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import { getNowDateDetail } from '@Helper'

const {
    Container,
    RowWapper,
    TitleBox,
    ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const initializeState = {
    modal: {
        ageExcelDownload: false,
        periodExcelDownload: false,
    },
}

const MeasureUserTable = () => {
    const {
        status,
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(MesureListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>({
            FileName: `측정이용자_연령별_통계_${getNowDateDetail()}`,
            SheetName: `측정이용자 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '',
                    '',
                    '체성분계',
                    '',
                    '',
                    '혈압계',
                    '',
                    '',
                    '혈당계',
                    '',
                    '',
                    '콜레스테롤계',
                    '',
                    '',
                    '스트레스계',
                    '',
                    '',
                    '신장계',
                    '',
                    '',
                    '활동량계',
                    '',
                    '',
                ],
                [
                    '',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                    '전체',
                    '여성',
                    '남성',
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 0, r: 1 } },
                { s: { c: 1, r: 0 }, e: { c: 3, r: 0 } },
                { s: { c: 4, r: 0 }, e: { c: 6, r: 0 } },
                { s: { c: 7, r: 0 }, e: { c: 9, r: 0 } },
                { s: { c: 10, r: 0 }, e: { c: 12, r: 0 } },
                { s: { c: 13, r: 0 }, e: { c: 15, r: 0 } },
                { s: { c: 16, r: 0 }, e: { c: 18, r: 0 } },
                { s: { c: 19, r: 0 }, e: { c: 21, r: 0 } },
                { s: { c: 22, r: 0 }, e: { c: 24, r: 0 } },
            ],
            WsCols: [
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
                { wpx: 80 },
            ],
            Data: [],
        })

    const handleAgeExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `측정이용자_연령별_통계_${getNowDateDetail()}`,
            SheetName: `측정이용자 연령별 통계`,
            Data: (() => {
                return Codes.ageGroup.list.map(age => {
                    const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                        AGE_GROUP: age.code,
                    })

                    if (DataRow) {
                        return [
                            age.name,
                            String(DataRow.SUM_MBER_CNT),
                            String(DataRow.SUM_WOMAN_CNT),
                            String(DataRow.SUM_MAN_CNT),
                            String(DataRow.IS_MBER_CNT),
                            String(DataRow.IS_WOMAN_CNT),
                            String(DataRow.IS_MAN_CNT),
                            String(DataRow.BP_MBER_CNT),
                            String(DataRow.BP_WOMAN_CNT),
                            String(DataRow.BP_MAN_CNT),
                            String(DataRow.BS_MBER_CNT),
                            String(DataRow.BS_WOMAN_CNT),
                            String(DataRow.BS_MAN_CNT),
                            String(DataRow.BC_MBER_CNT),
                            String(DataRow.BC_WOMAN_CNT),
                            String(DataRow.BC_MAN_CNT),
                            String(DataRow.ST_MBER_CNT),
                            String(DataRow.ST_WOMAN_CNT),
                            String(DataRow.ST_MAN_CNT),
                            String(DataRow.HT_MBER_CNT),
                            String(DataRow.HT_WOMAN_CNT),
                            String(DataRow.HT_MAN_CNT),
                            String(DataRow.BD_MBER_CNT),
                            String(DataRow.BD_WOMAN_CNT),
                            String(DataRow.BD_MAN_CNT),
                        ]
                    } else {
                        return [
                            age.name,
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                        ]
                    }
                })
            })(),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `측정이용자_기간별_통계_${getNowDateDetail()}`,
            SheetName: `측정이용자 기간별 통계`,
            Data: (() => {
                return _.sortBy(PERIOD_STAT_LIST, 'CYCLE_GUBUN').map(period => {
                    return [
                        period.CYCLE_GUBUN,
                        String(period.SUM_MBER_CNT),
                        String(period.SUM_WOMAN_CNT),
                        String(period.SUM_MAN_CNT),
                        String(period.IS_MBER_CNT),
                        String(period.IS_WOMAN_CNT),
                        String(period.IS_MAN_CNT),
                        String(period.BP_MBER_CNT),
                        String(period.BP_WOMAN_CNT),
                        String(period.BP_MAN_CNT),
                        String(period.BS_MBER_CNT),
                        String(period.BS_WOMAN_CNT),
                        String(period.BS_MAN_CNT),
                        String(period.BC_MBER_CNT),
                        String(period.BC_WOMAN_CNT),
                        String(period.BC_MAN_CNT),
                        String(period.ST_MBER_CNT),
                        String(period.ST_WOMAN_CNT),
                        String(period.ST_MAN_CNT),
                        String(period.HT_MBER_CNT),
                        String(period.HT_WOMAN_CNT),
                        String(period.HT_MAN_CNT),
                        String(period.BD_MBER_CNT),
                        String(period.BD_WOMAN_CNT),
                        String(period.BD_MAN_CNT),
                    ]
                })
            })(),
        }))
    }

    return (
        <Container>
            {status === 'loading' ? (
                <RowWapper>
                    <div className="h-[calc(100vh-10rem)]">
                        <ElementLoading FullScreen={false} />
                    </div>
                </RowWapper>
            ) : (
                <>
                    <RowWapper>
                        <TitleBox>연령별 통계</TitleBox>
                        <ChartBox>차트</ChartBox>
                    </RowWapper>
                    <RowWapper>
                        <ButtonBox>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName="엑셀다운로드"
                                HandleClick={() => {
                                    handleAgeExcelDownload().then(() =>
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                ageExcelDownload: true,
                                            },
                                        }))
                                    )
                                }}
                            />
                        </ButtonBox>
                        <TableBox>
                            <T.Table>
                                <T.Thead>
                                    <T.TheadRow>
                                        <T.TheadCell rowSpan={2} colSpan={2}>
                                            연령
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            전체
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            체성분계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈압계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈당계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            콜레스테롤계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            스트레스계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            신장계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            활동량계
                                        </T.TheadCell>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {Codes.ageGroup.list.map(
                                        (age, ageIndex) => {
                                            const DataRow = _.find(
                                                AGE_GROUP_STAT_LIST,
                                                {
                                                    AGE_GROUP: age.code,
                                                }
                                            )

                                            if (DataRow) {
                                                return (
                                                    <T.Row
                                                        key={`analytics-measure-user-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SUM_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SUM_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SUM_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.IS_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.IS_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.IS_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BP_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BP_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.BP_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BS_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BS_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.BS_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BC_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BC_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.BC_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.ST_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.ST_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.ST_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.HT_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.HT_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.HT_MAN_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BD_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.BD_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.BD_MAN_CNT}
                                                        </T.CellW>
                                                    </T.Row>
                                                )
                                            } else {
                                                return (
                                                    <T.Row
                                                        key={`analytics-measure-user-age-group-table-row-item--${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                        <T.CellW>-</T.CellW>
                                                    </T.Row>
                                                )
                                            }
                                        }
                                    )}
                                </T.Body>
                                <T.TFoot>
                                    <T.TFootRow>
                                        <T.TFootCell colSpan={2}>
                                            합계
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.SUM_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.SUM_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.SUM_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.IS_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.IS_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.IS_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BP_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BP_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BP_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BS_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BS_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BS_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BC_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BC_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BC_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.ST_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.ST_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.ST_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HT_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HT_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HT_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BD_MBER_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BD_WOMAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.BD_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                    </T.TFootRow>
                                </T.TFoot>
                            </T.Table>
                        </TableBox>
                    </RowWapper>
                    <RowWapper>
                        <TitleBox>기간별 통계</TitleBox>
                        <ChartBox>차트</ChartBox>
                    </RowWapper>
                    <RowWapper>
                        <ButtonBox>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName="엑셀다운로드"
                                HandleClick={() => {
                                    handlePeriodExcelDownload().then(() =>
                                        setPageState(prevState => ({
                                            ...prevState,
                                            modal: {
                                                ...prevState.modal,
                                                periodExcelDownload: true,
                                            },
                                        }))
                                    )
                                }}
                            />
                        </ButtonBox>
                        <TableBox>
                            <T.Table>
                                <T.Thead>
                                    <T.TheadRow>
                                        <T.TheadCell rowSpan={2}>
                                            기간
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            전체
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            체성분계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈압계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈당계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            콜레스테롤계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            스트레스계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            신장계
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            활동량계
                                        </T.TheadCell>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>여성</T.TheadCell>
                                        <T.TheadCell>남성</T.TheadCell>
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {_.sortBy(
                                        PERIOD_STAT_LIST,
                                        'CYCLE_GUBUN'
                                    ).map((period, periodIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-measure-user-period-table-row-item-${periodIndex}`}>
                                                <T.CellW>
                                                    {period.CYCLE_GUBUN}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.SUM_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.SUM_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.SUM_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.IS_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.IS_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.IS_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BP_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BP_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BP_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BS_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BS_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BS_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BC_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BC_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BC_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.ST_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.ST_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.ST_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HT_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HT_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HT_MAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BD_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BD_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.BD_MAN_CNT}
                                                </T.CellW>
                                            </T.Row>
                                        )
                                    })}
                                </T.Body>
                            </T.Table>
                        </TableBox>
                    </RowWapper>
                </>
            )}

            {pageState.modal.ageExcelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}

            {pageState.modal.periodExcelDownload && (
                <ExcelDownload {...excelDownloadProps} />
            )}
        </Container>
    )
}

export default MeasureUserTable
