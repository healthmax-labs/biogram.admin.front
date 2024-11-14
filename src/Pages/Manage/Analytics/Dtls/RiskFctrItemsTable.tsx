import React, { useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'

import { useRecoilValue } from 'recoil'
import { RiskFctrItemsListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'
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

const RiskFctrItemsTable = () => {
    const {
        status,
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(RiskFctrItemsListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.RiskFctrItems
        )

    const handleAgeExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `위험요인_항목_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `위험요인_항목_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `위험요인 항목 연령별 통계`,
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
                const resutnData = Codes.ageGroup.list.map(age => {
                    const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                        AGE_GROUP: age.code,
                    })

                    return [
                        age.name,
                        `${DataRow ? addComma(DataRow.SUM_MBER_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.SYSTOLIC_MBER_CNT) : ''}`,
                        `${
                            DataRow ? addComma(DataRow.SYSTOLIC_WOMAN_CNT) : ''
                        }`,
                        `${DataRow ? addComma(DataRow.SYSTOLIC_MAN_CNT) : ''}`,
                        `${
                            DataRow
                                ? addComma(DataRow.WAIST_CRCMFRNC_MBER_CNT)
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(DataRow.WAIST_CRCMFRNC_WOMAN_CNT)
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(DataRow.WAIST_CRCMFRNC_MAN_CNT)
                                : ''
                        }`,
                        `${DataRow ? addComma(DataRow.FBS_MBER_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.FBS_WOMAN_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.FBS_MAN_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.TG_MBER_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.TG_WOMAN_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.TG_MAN_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.HDLC_MBER_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.HDLC_WOMAN_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.HDLC_MAN_CNT) : ''}`,
                    ]
                })

                resutnData.push([
                    `합계`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.SUM_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.SYSTOLIC_MBER_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.SYSTOLIC_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.SYSTOLIC_MAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.WAIST_CRCMFRNC_MBER_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.WAIST_CRCMFRNC_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.WAIST_CRCMFRNC_MAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.FBS_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.FBS_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.FBS_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TG_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TG_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TG_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.HDLC_MBER_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.HDLC_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.HDLC_MAN_CNT))
                        )
                    )}`,
                ])

                return resutnData
            })(),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `위험요인_항목_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `위험요인_항목_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `위험요인 항목 기간별 통계`,
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
            Data: _.sortBy(PERIOD_STAT_LIST, 'CYCLE_GUBUN').map(period => {
                return [
                    `${period.CYCLE_GUBUN}`,
                    `${addComma(Number(period.SUM_MBER_CNT))}`,
                    `${addComma(Number(period.SYSTOLIC_MBER_CNT))}`,
                    `${addComma(Number(period.SYSTOLIC_WOMAN_CNT))}`,
                    `${addComma(Number(period.SYSTOLIC_MAN_CNT))}`,
                    `${addComma(Number(period.WAIST_CRCMFRNC_MBER_CNT))}`,
                    `${addComma(Number(period.WAIST_CRCMFRNC_WOMAN_CNT))}`,
                    `${addComma(Number(period.WAIST_CRCMFRNC_MAN_CNT))}`,
                    `${addComma(Number(period.FBS_MBER_CNT))}`,
                    `${addComma(Number(period.FBS_WOMAN_CNT))}`,
                    `${addComma(Number(period.FBS_MAN_CNT))}`,
                    `${addComma(Number(period.TG_MBER_CNT))}`,
                    `${addComma(Number(period.TG_WOMAN_CNT))}`,
                    `${addComma(Number(period.TG_MAN_CNT))}`,
                    `${addComma(Number(period.HDLC_MBER_CNT))}`,
                    `${addComma(Number(period.HDLC_WOMAN_CNT))}`,
                    `${addComma(Number(period.HDLC_MAN_CNT))}`,
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
                                                        key={`analytics-risk-fctr-items-age-group-table-row-item-${ageIndex}`}>
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
                                                                    DataRow.SYSTOLIC_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.SYSTOLIC_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.SYSTOLIC_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.WAIST_CRCMFRNC_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.WAIST_CRCMFRNC_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.WAIST_CRCMFRNC_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.FBS_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.FBS_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.FBS_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TG_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TG_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TG_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HDLC_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HDLC_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HDLC_MAN_CNT
                                                                )
                                                            )}
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
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.SUM_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.SYSTOLIC_MBER_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.SYSTOLIC_WOMAN_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.SYSTOLIC_MAN_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.WAIST_CRCMFRNC_MBER_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.WAIST_CRCMFRNC_WOMAN_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.WAIST_CRCMFRNC_MAN_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.FBS_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.FBS_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.FBS_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.TG_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.TG_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {_.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.TG_MAN_CNT)
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HDLC_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HDLC_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HDLC_MAN_CNT)
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
                                                key={`analytics-risk-fctr-items-period-table-row-item-${periodIndex}`}>
                                                <T.CellW colSpan={2}>
                                                    {period.CYCLE_GUBUN}
                                                </T.CellW>
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
                                                            period.SYSTOLIC_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.SYSTOLIC_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.SYSTOLIC_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.WAIST_CRCMFRNC_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.WAIST_CRCMFRNC_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.WAIST_CRCMFRNC_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.FBS_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.FBS_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.FBS_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TG_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TG_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TG_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HDLC_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HDLC_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HDLC_MAN_CNT
                                                        )
                                                    )}
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
