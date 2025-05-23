import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, ExcelDownload, VaryButton } from '@Elements'

import { useRecoilValue } from 'recoil'
import { RiskFctrCountListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'
import React, { useState } from 'react'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import { addComma, dateInsertHypen, getNowDateDetail } from '@Helper'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'

const {
    Container,
    RowWapper,
    TitleBox,
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
        setExcelDownloadProps(prevState => ({
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
                        AGE_GROUP: Number(age.code),
                    })

                    return [
                        age.name,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.SUM_MBER_CNT))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.SUM_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.SUM_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '1_MBER_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(
                                      Number(_.get(DataRow, '1_WOMAN_CNT'))
                                  )
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '1_MAN_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '2_MBER_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(
                                      Number(_.get(DataRow, '2_WOMAN_CNT'))
                                  )
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '2_MAN_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '3_MBER_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(
                                      Number(_.get(DataRow, '3_WOMAN_CNT'))
                                  )
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '3_MAN_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '4_MBER_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(
                                      Number(_.get(DataRow, '4_WOMAN_CNT'))
                                  )
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '4_MAN_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '5_MBER_CNT')))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(
                                      Number(_.get(DataRow, '5_WOMAN_CNT'))
                                  )
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(_.get(DataRow, '5_MAN_CNT')))
                                : ''
                        }`,
                    ]
                })

                returnData.push([
                    `합계`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, 'SUM_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, 'SUM_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, 'SUM_MAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '1_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '1_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '1_MAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '2_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '2_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '2_MAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '3_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '3_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '3_MAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '4_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '4_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '4_MAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '5_MBER_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '5_WOMAN_CNT'))
                    )}`,
                    `${addComma(
                        Number(_.sumBy(AGE_GROUP_STAT_LIST, '5_MAN_CNT'))
                    )}`,
                ])

                return returnData
            })(),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
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
                    `${period.CYCLE_GUBUN}`,
                    `${addComma(Number(period.SUM_MBER_CNT))}`,
                    `${addComma(Number(period.SUM_WOMAN_CNT))}`,
                    `${addComma(Number(period.SUM_MAN_CNT))}`,
                    `${addComma(Number(_.get(period, '1_MBER_CNT')))}`,
                    `${addComma(Number(_.get(period, '1_WOMAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '1_MAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '2_MBER_CNT')))}`,
                    `${addComma(Number(_.get(period, '2_WOMAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '2_MAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '3_MBER_CNT')))}`,
                    `${addComma(Number(_.get(period, '3_WOMAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '3_MAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '4_MBER_CNT')))}`,
                    `${addComma(Number(_.get(period, '4_WOMAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '4_MAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '5_MBER_CNT')))}`,
                    `${addComma(Number(_.get(period, '5_WOMAN_CNT')))}`,
                    `${addComma(Number(_.get(period, '5_MAN_CNT')))}`,
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
                    </RowWapper>
                    <RowWapper>
                        <ButtonBox>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName="엑셀 다운로드"
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
                                                    AGE_GROUP: Number(age.code),
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
                                                            {addComma(
                                                                Number(
                                                                    DataRow.SUM_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.SUM_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.SUM_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '1_MBER_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '1_WOMAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '1_MAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '2_MBER_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '2_WOMAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '2_MAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '3_MBER_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '3_WOMAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '3_MAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '4_MBER_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '4_WOMAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '4_MAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '5_MBER_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '5_WOMAN_CNT'
                                                                    )
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    _.get(
                                                                        DataRow,
                                                                        '5_MAN_CNT'
                                                                    )
                                                                )
                                                            )}
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
                                        <T.TFootCell colSpan={2}>
                                            합계
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        'SUM_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        'SUM_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        'SUM_MAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '1_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '1_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '1_MAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '2_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '2_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '2_MAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '3_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '3_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '3_MAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '4_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '4_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '4_MAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '5_MBER_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '5_WOMAN_CNT'
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                Number(
                                                    _.sumBy(
                                                        AGE_GROUP_STAT_LIST,
                                                        '5_MAN_CNT'
                                                    )
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
                    </RowWapper>
                    <RowWapper>
                        <ButtonBox>
                            <VaryButton
                                ButtonType={`default`}
                                ButtonName="엑셀 다운로드"
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
                                <T.Body>
                                    {PERIOD_STAT_LIST.map(
                                        (period, periodIndex) => {
                                            return (
                                                <T.Row
                                                    key={`analytics-risk-fctr-count-period-table-row-item-${periodIndex}`}>
                                                    <T.CellWW>
                                                        {period.CYCLE_GUBUN}
                                                    </T.CellWW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                period.SUM_MBER_CNT
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                period.SUM_WOMAN_CNT
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                period.SUM_MAN_CNT
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '1_MBER_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '1_WOMAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '1_MAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '2_MBER_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '2_WOMAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '2_MAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '3_MBER_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '3_WOMAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '3_MAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '4_MBER_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '4_WOMAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '4_MAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '5_MBER_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '5_WOMAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {addComma(
                                                            Number(
                                                                _.get(
                                                                    period,
                                                                    '5_MAN_CNT'
                                                                )
                                                            )
                                                        )}
                                                    </T.CellW>
                                                </T.Row>
                                            )
                                        }
                                    )}
                                </T.Body>
                            </T.Table>
                        </TableBox>
                    </RowWapper>
                </>
            )}

            {pageState.modal.ageExcelDownload &&
                (() => {
                    pageState.modal.ageExcelDownload = false
                    return <ExcelDownload {...excelDownloadProps} />
                })()}

            {pageState.modal.periodExcelDownload &&
                (() => {
                    pageState.modal.periodExcelDownload = false
                    return <ExcelDownload {...excelDownloadProps} />
                })()}
        </Container>
    )
}

export default RiskFctrCountTable
