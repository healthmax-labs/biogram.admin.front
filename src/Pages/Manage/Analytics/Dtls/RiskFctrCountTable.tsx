import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, ExcelDownload, VaryButton } from '@Elements'

import { useRecoilValue } from 'recoil'
import { RiskFctrCountListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'
import React, { useState } from 'react'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import { dateInsertHypen, getNowDateDetail } from '@Helper'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'

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

const RiskFctrCountTable = () => {
    const {
        status,
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(RiskFctrCountListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.RiskFctrCount
        )

    const handleAgeExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `위험요인_개수_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `위험요인_개수_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `위험요인 개수 연령별 통계`,
            Header: prevState.Header.map((h, hIndex) => {
                if (hIndex === 0) {
                    return h.map((he, heIndex) => {
                        if (heIndex === 0) {
                            return `연령`
                        }
                        return he
                    })
                }

                return h
            }),
            Data: (() => {
                const returnData = Codes.ageGroup.list.map(age => {
                    const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                        RF_AGE_GROUP: age.code,
                    })

                    return [
                        age.name,
                        `${DataRow ? DataRow.RF_ALL_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_ALL_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_ALL_MAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_1_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_1_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_1_MAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_2_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_2_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_2_MAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_3_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_3_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_3_MAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_4_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_4_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_4_MAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_5_MBER_CNT : ''}`,
                        `${DataRow ? DataRow.RF_5_WOMAN_CNT : ''}`,
                        `${DataRow ? DataRow.RF_5_MAN_CNT : ''}`,
                    ]
                })

                const TotDataRow = _.find(AGE_GROUP_STAT_LIST, {
                    RF_AGE_GROUP: 'TOT',
                })

                returnData.push([
                    `합계`,
                    `${TotDataRow ? TotDataRow.RF_ALL_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_ALL_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_ALL_MAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_1_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_1_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_1_MAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_2_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_2_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_2_MAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_3_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_3_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_3_MAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_4_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_4_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_4_MAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_5_MBER_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_5_WOMAN_CNT : ``}`,
                    `${TotDataRow ? TotDataRow.RF_5_MAN_CNT : ``}`,
                ])

                return returnData
            })(),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `위험요인_개수_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `위험요인_개수_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `위험요인 개수 기간별 통계`,
            Header: prevState.Header.map((h, hIndex) => {
                if (hIndex === 0) {
                    return h.map((he, heIndex) => {
                        if (heIndex === 0) {
                            return `기간`
                        }
                        return he
                    })
                }

                return h
            }),
            Data: PERIOD_STAT_LIST.map(period => {
                return [
                    `${period.PERIOD}`,
                    `${period.RF_ALL_MBER_CNT}`,
                    `${period.RF_ALL_WOMAN_CNT}`,
                    `${period.RF_ALL_MAN_CNT}`,
                    `${period.RF_1_MBER_CNT}`,
                    `${period.RF_1_WOMAN_CNT}`,
                    `${period.RF_1_MAN_CNT}`,
                    `${period.RF_2_MBER_CNT}`,
                    `${period.RF_2_WOMAN_CNT}`,
                    `${period.RF_2_MAN_CNT}`,
                    `${period.RF_3_MBER_CNT}`,
                    `${period.RF_3_WOMAN_CNT}`,
                    `${period.RF_3_MAN_CNT}`,
                    `${period.RF_4_MBER_CNT}`,
                    `${period.RF_4_WOMAN_CNT}`,
                    `${period.RF_4_MAN_CNT}`,
                    `${period.RF_5_MBER_CNT}`,
                    `${period.RF_5_WOMAN_CNT}`,
                    `${period.RF_5_MAN_CNT}`,
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
                                        <T.TheadCell colSpan={3}>
                                            전체
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            1개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            2개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            3개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            4개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            5개
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
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {Codes.ageGroup.list.map(
                                        (age, ageIndex) => {
                                            const DataRow = _.find(
                                                AGE_GROUP_STAT_LIST,
                                                {
                                                    RF_AGE_GROUP: age.code,
                                                }
                                            )

                                            if (DataRow) {
                                                return (
                                                    <T.Row
                                                        key={`analytics-risk-fctr-count-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_ALL_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_ALL_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_ALL_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_1_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_1_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_1_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_2_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_2_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_2_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_3_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_3_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_3_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_4_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_4_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_4_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_5_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_5_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_5_MAN_CNT
                                                            }
                                                        </T.CellW>
                                                    </T.Row>
                                                )
                                            } else {
                                                return (
                                                    <T.Row
                                                        key={`analytics-risk-fctr-count-age-group-table-row-item-${ageIndex}`}>
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
                                                    </T.Row>
                                                )
                                            }
                                        }
                                    )}
                                </T.Body>
                                <T.TFoot>
                                    <T.TFootRow>
                                        {(() => {
                                            const DataRow = _.find(
                                                AGE_GROUP_STAT_LIST,
                                                {
                                                    RF_AGE_GROUP: 'TOT',
                                                }
                                            )

                                            if (DataRow) {
                                                return (
                                                    <>
                                                        <T.TFootCell
                                                            colSpan={2}>
                                                            합계
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_ALL_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_ALL_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_ALL_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_1_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_1_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_1_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_2_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_2_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_2_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_3_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_3_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_3_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_4_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_4_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_4_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_5_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_5_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_5_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                    </>
                                                )
                                            }

                                            return (
                                                <>
                                                    <T.TFootCell colSpan={2}>
                                                        합계
                                                    </T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                    <T.TFootCell>-</T.TFootCell>
                                                </>
                                            )
                                        })()}
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
                                            1개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            2개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            3개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            4개
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            5개
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
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body></T.Body>
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

export default RiskFctrCountTable
