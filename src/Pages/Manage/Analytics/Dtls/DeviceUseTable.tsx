import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { DeviceListState } from '@Recoil/AnalyticsPagesState'
import React, { useState } from 'react'
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

const DeviceUseTable = () => {
    const {
        status,
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(DeviceListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.DeviceUse
        )

    const handleAgeExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `기기사용_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `기기사용_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `기기사용 연령별 통계`,
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
                        AGE_GROUP: age.code,
                    })

                    return [
                        age.name,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.TOT_MBER_CNT))
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.TOT_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.TOT_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.IS_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.IS_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.IS_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BP_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.BP_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BP_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BS_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.BS_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BS_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BC_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.BC_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.BC_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.ST_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.ST_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.ST_MAN_CNT)) : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.HT_MBER_CNT)) : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(Number(DataRow.HT_WOMAN_CNT))
                                : ''
                        }`,
                        `${
                            DataRow ? addComma(Number(DataRow.HT_MAN_CNT)) : ''
                        }`,
                    ]
                })

                const TotDataRow = _.find(AGE_GROUP_STAT_LIST, {
                    AGE_GROUP: 'TOT',
                })
                returnData.push([
                    `합계`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.TOT_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.TOT_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.TOT_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.IS_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.IS_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.IS_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BP_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BP_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BP_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BS_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BS_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BS_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BC_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BC_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.BC_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.ST_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.ST_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.ST_MAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.HT_MBER_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.HT_WOMAN_CNT))
                            : ``
                    }`,
                    `${
                        TotDataRow
                            ? addComma(Number(TotDataRow.HT_MAN_CNT))
                            : ``
                    }`,
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
                    ? `기기사용_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `기기사용_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `기기사용 항목 기간별 통계`,
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
                    `${addComma(Number(period.TOT_MBER_CNT))}`,
                    `${addComma(Number(period.TOT_WOMAN_CNT))}`,
                    `${addComma(Number(period.TOT_MAN_CNT))}`,
                    `${addComma(Number(period.IS_MBER_CNT))}`,
                    `${addComma(Number(period.IS_WOMAN_CNT))}`,
                    `${addComma(Number(period.IS_MAN_CNT))}`,
                    `${addComma(Number(period.BP_MBER_CNT))}`,
                    `${addComma(Number(period.BP_WOMAN_CNT))}`,
                    `${addComma(Number(period.BP_MAN_CNT))}`,
                    `${addComma(Number(period.BS_MBER_CNT))}`,
                    `${addComma(Number(period.BS_WOMAN_CNT))}`,
                    `${addComma(Number(period.BS_MAN_CNT))}`,
                    `${addComma(Number(period.BC_MBER_CNT))}`,
                    `${addComma(Number(period.BC_WOMAN_CNT))}`,
                    `${addComma(Number(period.BC_MAN_CNT))}`,
                    `${addComma(Number(period.ST_MBER_CNT))}`,
                    `${addComma(Number(period.ST_WOMAN_CNT))}`,
                    `${addComma(Number(period.ST_MAN_CNT))}`,
                    `${addComma(Number(period.HT_MBER_CNT))}`,
                    `${addComma(Number(period.HT_WOMAN_CNT))}`,
                    `${addComma(Number(period.HT_MAN_CNT))}`,
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
                                                        key={`analytics-device-use-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_MBER_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_MAN_CNT
                                                                )
                                                            )}
                                                        </T.CellW>
                                                    </T.Row>
                                                )
                                            } else {
                                                return (
                                                    <T.Row
                                                        key={`analytics-device-use-age-group-table-row-item-${ageIndex}`}>
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
                                                    AGE_GROUP: 'TOT',
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
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.TOT_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.IS_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BP_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BS_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.BC_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.ST_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_MBER_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_WOMAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {addComma(
                                                                Number(
                                                                    DataRow.HT_MAN_CNT
                                                                )
                                                            )}
                                                        </T.TFootCell>
                                                    </>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        <T.TFootCell
                                                            colSpan={2}>
                                                            합계
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            -
                                                        </T.TFootCell>
                                                    </>
                                                )
                                            }
                                        })()}
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
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {PERIOD_STAT_LIST.map((period, pIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-member-list-period-table-row-item-${pIndex}`}>
                                                <T.CellWW colSpan={1}>
                                                    {period.PERIOD}
                                                </T.CellWW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TOT_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TOT_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.TOT_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.IS_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.IS_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.IS_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BP_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BP_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BP_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BS_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BS_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BS_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BC_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BC_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BC_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.ST_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.ST_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.ST_MAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HT_MBER_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HT_WOMAN_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.HT_MAN_CNT
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

export default DeviceUseTable
