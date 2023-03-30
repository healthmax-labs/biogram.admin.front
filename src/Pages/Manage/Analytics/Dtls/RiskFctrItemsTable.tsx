import React, { useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'

import { useRecoilValue } from 'recoil'
import { RiskFctrItemsListState } from '@Recoil/AnalyticsPagesState'
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

const RiskFctrItemsTable = () => {
    const {
        status,
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(RiskFctrItemsListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>({
            FileName: `위험요인_항목별_연령별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 항목별 연령별 통계`,
            Header: [
                [
                    '연령',
                    '전체',
                    '혈압',
                    '',
                    '',
                    '허리둘레',
                    '',
                    '',
                    '식전혈당',
                    '',
                    '',
                    '중성지방',
                    '',
                    '',
                    'HDLC',
                    '',
                    '',
                ],
                [
                    '',
                    '',
                    '전체',
                    '정상',
                    '위험',
                    '전체',
                    '정상',
                    '위험',
                    '전체',
                    '정상',
                    '위험',
                    '전체',
                    '정상',
                    '위험',
                    '전체',
                    '정상',
                    '위험',
                ],
            ],
            WsMerge: [
                { s: { c: 0, r: 0 }, e: { c: 0, r: 1 } },
                { s: { c: 1, r: 0 }, e: { c: 1, r: 1 } },
                { s: { c: 2, r: 0 }, e: { c: 4, r: 0 } },
                { s: { c: 5, r: 0 }, e: { c: 7, r: 0 } },
                { s: { c: 8, r: 0 }, e: { c: 10, r: 0 } },
                { s: { c: 11, r: 0 }, e: { c: 13, r: 0 } },
                { s: { c: 14, r: 0 }, e: { c: 16, r: 0 } },
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
            ],
            Data: [],
        })

    const handleAgeExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `위험요인_항목_연령별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 항목 연령별 통계`,
            Data: Codes.ageGroup.list.map(age => {
                const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                    AGE_GROUP: age.code,
                })

                return [
                    age.name,
                    DataRow ? String(DataRow.SUM_CNT) : '',
                    DataRow ? String(DataRow.SYSTOLIC_TOT_CNT) : '',
                    DataRow ? String(DataRow.SYSTOLIC_RISK_NO_CNT) : '',
                    DataRow ? String(DataRow.SYSTOLIC_RISK_YES_CNT) : '',
                    DataRow ? String(DataRow.WAIST_CRCMFRNC_TOT_CNT) : '',
                    DataRow ? String(DataRow.WAIST_CRCMFRNC_RISK_NO_CNT) : '',
                    DataRow ? String(DataRow.WAIST_CRCMFRNC_RISK_YES_CNT) : '',
                    DataRow ? String(DataRow.FBS_TOT_CNT) : '',
                    DataRow ? String(DataRow.FBS_RISK_NO_CNT) : '',
                    DataRow ? String(DataRow.FBS_RISK_YES_CNT) : '',
                    DataRow ? String(DataRow.TG_TOT_CNT) : '',
                    DataRow ? String(DataRow.TG_RISK_NO_CNT) : '',
                    DataRow ? String(DataRow.TG_RISK_YES_CNT) : '',
                    DataRow ? String(DataRow.HDLC_TOT_CNT) : '',
                    DataRow ? String(DataRow.HDLC_RISK_NO_CNT) : '',
                    DataRow ? String(DataRow.HDLC_RISK_YES_CNT) : '',
                ]
            }),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `위험요인_항목_기간별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 항목 기간별 통계`,
            Data: _.sortBy(PERIOD_STAT_LIST, 'CYCLE_GUBUN').map(period => {
                return [
                    period.CYCLE_GUBUN,
                    period.SUM_CNT,
                    period.SYSTOLIC_TOT_CNT,
                    period.SYSTOLIC_RISK_NO_CNT,
                    period.SYSTOLIC_RISK_YES_CNT,
                    period.WAIST_CRCMFRNC_TOT_CNT,
                    period.WAIST_CRCMFRNC_RISK_NO_CNT,
                    period.WAIST_CRCMFRNC_RISK_YES_CNT,
                    period.FBS_TOT_CNT,
                    period.FBS_RISK_NO_CNT,
                    period.FBS_RISK_YES_CNT,
                    period.TG_TOT_CNT,
                    period.TG_RISK_NO_CNT,
                    period.TG_RISK_YES_CNT,
                    period.HDLC_TOT_CNT,
                    period.HDLC_RISK_NO_CNT,
                    period.HDLC_RISK_YES_CNT,
                ]
            }),
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
                                        <T.TheadCell rowSpan={2}>
                                            전체
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈압
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            허리둘레
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            식전혈당
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            중성지방
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            HDLC
                                        </T.TheadCell>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
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
                                                        key={`analytics-risk-fctr-items-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.SUM_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SYSTOLIC_TOT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SYSTOLIC_RISK_NO_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.SYSTOLIC_RISK_YES_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.WAIST_CRCMFRNC_TOT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.WAIST_CRCMFRNC_RISK_NO_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.WAIST_CRCMFRNC_RISK_YES_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.FBS_TOT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.FBS_RISK_NO_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.FBS_RISK_YES_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {DataRow.TG_TOT_CNT}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.TG_RISK_NO_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.TG_RISK_YES_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.HDLC_TOT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.HDLC_RISK_NO_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.HDLC_RISK_YES_CNT
                                                            }
                                                        </T.CellW>
                                                    </T.Row>
                                                )
                                            } else {
                                                return (
                                                    <T.Row
                                                        key={`analytics-risk-fctr-items-age-group-table-row-item-${ageIndex}`}>
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
                                                    Number(e.SUM_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.SYSTOLIC_TOT_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(
                                                        e.SYSTOLIC_RISK_NO_CNT
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(
                                                        e.SYSTOLIC_RISK_YES_CNT
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(
                                                        e.WAIST_CRCMFRNC_TOT_CNT
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(
                                                        e.WAIST_CRCMFRNC_RISK_NO_CNT
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(
                                                        e.WAIST_CRCMFRNC_RISK_YES_CNT
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.FBS_TOT_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.FBS_RISK_NO_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.FBS_RISK_YES_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.TG_TOT_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.TG_RISK_NO_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.TG_RISK_YES_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HDLC_TOT_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HDLC_RISK_YES_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.HDLC_RISK_YES_CNT)
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
                                        <T.TheadCell rowSpan={2} colSpan={2}>
                                            기간
                                        </T.TheadCell>
                                        <T.TheadCell rowSpan={2}>
                                            전체
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈압
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            허리둘레
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            식전혈당
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            중성지방
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            HDLC
                                        </T.TheadCell>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>정상</T.TheadCell>
                                        <T.TheadCell>위험</T.TheadCell>
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {_.sortBy(
                                        PERIOD_STAT_LIST,
                                        'CYCLE_GUBUN'
                                    ).map((period, periodIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-risk-fctr-items-period-table-row-item-${periodIndex}`}>
                                                <T.CellW colSpan={2}>
                                                    {period.CYCLE_GUBUN}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.SUM_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.SYSTOLIC_TOT_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {
                                                        period.SYSTOLIC_RISK_NO_CNT
                                                    }
                                                </T.CellW>
                                                <T.CellW>
                                                    {
                                                        period.SYSTOLIC_RISK_YES_CNT
                                                    }
                                                </T.CellW>
                                                <T.CellW>
                                                    {
                                                        period.WAIST_CRCMFRNC_TOT_CNT
                                                    }
                                                </T.CellW>
                                                <T.CellW>
                                                    {
                                                        period.WAIST_CRCMFRNC_RISK_NO_CNT
                                                    }
                                                </T.CellW>
                                                <T.CellW>
                                                    {
                                                        period.WAIST_CRCMFRNC_RISK_YES_CNT
                                                    }
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.FBS_TOT_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.FBS_RISK_NO_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.FBS_RISK_YES_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.TG_TOT_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.TG_RISK_NO_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.TG_RISK_YES_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HDLC_TOT_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HDLC_RISK_NO_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.HDLC_RISK_YES_CNT}
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

export default RiskFctrItemsTable
