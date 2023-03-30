import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, ExcelDownload, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { DeviceListState } from '@Recoil/AnalyticsPagesState'
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

const DeviceUseTable = () => {
    const {
        status,
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(DeviceListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>({
            FileName: `위험요인_항목_연령별_통계_${getNowDateDetail()}`,
            SheetName: `위험요인 항목 연령별 통계`,
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
            ],
            Data: [],
        })

    const handleAgeExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `기기사용_연령별_통계_${getNowDateDetail()}`,
            SheetName: `기기사용 연령별 통계`,
            Data: Codes.ageGroup.list.map(age => {
                const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                    AGE_GROUP: age.code,
                })

                return [
                    age.name,
                    DataRow ? DataRow.TOT_MBER_CNT : '',
                    DataRow ? DataRow.TOT_WOMAN_CNT : '',
                    DataRow ? DataRow.TOT_MAN_CNT : '',
                    DataRow ? DataRow.IS_MBER_CNT : '',
                    DataRow ? DataRow.IS_WOMAN_CNT : '',
                    DataRow ? DataRow.IS_MAN_CNT : '',
                    DataRow ? DataRow.BP_MBER_CNT : '',
                    DataRow ? DataRow.BP_WOMAN_CNT : '',
                    DataRow ? DataRow.BP_MAN_CNT : '',
                    DataRow ? DataRow.BS_MBER_CNT : '',
                    DataRow ? DataRow.BS_WOMAN_CNT : '',
                    DataRow ? DataRow.BS_MAN_CNT : '',
                    DataRow ? DataRow.BC_MBER_CNT : '',
                    DataRow ? DataRow.BC_WOMAN_CNT : '',
                    DataRow ? DataRow.BC_MAN_CNT : '',
                    DataRow ? DataRow.ST_MBER_CNT : '',
                    DataRow ? DataRow.ST_WOMAN_CNT : '',
                    DataRow ? DataRow.ST_MAN_CNT : '',
                    DataRow ? DataRow.HT_MBER_CNT : '',
                    DataRow ? DataRow.HT_WOMAN_CNT : '',
                    DataRow ? DataRow.HT_MAN_CNT : '',
                    DataRow ? DataRow.BD_MBER_CNT : '',
                    DataRow ? DataRow.BD_WOMAN_CNT : '',
                    DataRow ? DataRow.BD_MAN_CNT : '',
                ]
            }),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `기기사용_기간별_통계_${getNowDateDetail()}`,
            SheetName: `기기사용 항목 기간별 통계`,
            Data: PERIOD_STAT_LIST.map(period => {
                return [
                    period.PERIOD,
                    period.TOT_MBER_CNT,
                    period.TOT_WOMAN_CNT,
                    period.TOT_MAN_CNT,
                    period.IS_MBER_CNT,
                    period.IS_WOMAN_CNT,
                    period.IS_MAN_CNT,
                    period.BP_MBER_CNT,
                    period.BP_WOMAN_CNT,
                    period.BP_MAN_CNT,
                    period.BS_MBER_CNT,
                    period.BS_WOMAN_CNT,
                    period.BS_MAN_CNT,
                    period.BC_MBER_CNT,
                    period.BC_WOMAN_CNT,
                    period.BC_MAN_CNT,
                    period.ST_MBER_CNT,
                    period.ST_WOMAN_CNT,
                    period.ST_MAN_CNT,
                    period.HT_MBER_CNT,
                    period.HT_WOMAN_CNT,
                    period.HT_MAN_CNT,
                    period.BD_MBER_CNT,
                    period.BD_WOMAN_CNT,
                    period.BD_MAN_CNT,
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
                                                        key={`analytics-device-use-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.TOT_MBER_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.TOT_WOMAN_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.TOT_MAN_CNT
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
                                                            {
                                                                DataRow.TOT_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.TOT_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.TOT_MAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.IS_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.IS_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.IS_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BP_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BP_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.BP_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BS_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BS_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.BS_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BC_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BC_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.BC_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.ST_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.ST_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.ST_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.HT_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.HT_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.HT_MAN_CNT}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BD_MBER_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.BD_WOMAN_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {DataRow.BD_MAN_CNT}
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
                                    {PERIOD_STAT_LIST.map((period, pIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-member-list-period-table-row-item-${pIndex}`}>
                                                <T.CellWW colSpan={1}>
                                                    {period.PERIOD}
                                                </T.CellWW>
                                                <T.CellW>
                                                    {period.TOT_MBER_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.TOT_WOMAN_CNT}
                                                </T.CellW>
                                                <T.CellW>
                                                    {period.TOT_MAN_CNT}
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

export default DeviceUseTable
