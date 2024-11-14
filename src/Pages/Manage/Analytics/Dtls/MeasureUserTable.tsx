import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MesureListState } from '@Recoil/AnalyticsPagesState'
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
    TitleText,
    TitleGuideText,
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
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(MesureListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.MeasureUser
        )

    const handleAgeExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `측정이용자_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `측정이용자_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `측정이용자 연령별 통계`,
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
                        `${DataRow ? addComma(DataRow.SUM_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.SUM_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.SUM_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.IS_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.IS_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.IS_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BP_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BP_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BP_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BS_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BS_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BS_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BC_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BC_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.BC_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.ST_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.ST_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.ST_MAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.HT_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.HT_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.HT_MAN_CNT) : ``}`,
                    ]
                })

                returnData.push([
                    `합계`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.SUM_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.SUM_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.SUM_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.IS_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.IS_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.IS_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BP_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BP_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BP_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BS_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BS_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BS_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BC_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BC_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.BC_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.ST_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.ST_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.ST_MAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.HT_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.HT_WOMAN_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.HT_MAN_CNT))
                        )
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
                    ? `측정이용자_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `측정이용자_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `측정이용자 기간별 통계`,
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
            Data: (() => {
                return _.sortBy(PERIOD_STAT_LIST, 'CYCLE_GUBUN').map(period => {
                    return [
                        `${period.CYCLE_GUBUN}`,
                        `${addComma(period.SUM_MBER_CNT)}`,
                        `${addComma(period.SUM_WOMAN_CNT)}`,
                        `${addComma(period.SUM_MAN_CNT)}`,
                        `${addComma(period.IS_MBER_CNT)}`,
                        `${addComma(period.IS_WOMAN_CNT)}`,
                        `${addComma(period.IS_MAN_CNT)}`,
                        `${addComma(period.BP_MBER_CNT)}`,
                        `${addComma(period.BP_WOMAN_CNT)}`,
                        `${addComma(period.BP_MAN_CNT)}`,
                        `${addComma(period.BS_MBER_CNT)}`,
                        `${addComma(period.BS_WOMAN_CNT)}`,
                        `${addComma(period.BS_MAN_CNT)}`,
                        `${addComma(period.BC_MBER_CNT)}`,
                        `${addComma(period.BC_WOMAN_CNT)}`,
                        `${addComma(period.BC_MAN_CNT)}`,
                        `${addComma(period.ST_MBER_CNT)}`,
                        `${addComma(period.ST_WOMAN_CNT)}`,
                        `${addComma(period.ST_MAN_CNT)}`,
                        `${addComma(period.HT_MBER_CNT)}`,
                        `${addComma(period.HT_WOMAN_CNT)}`,
                        `${addComma(period.HT_MAN_CNT)}`,
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
                        <TitleBox>
                            <TitleText>연령별 통계:</TitleText>
                            <TitleGuideText>
                                조회 기간동안 총 몇 명의 이용자가 발생했는지
                                연령별로 산출 (단위 : 명)
                            </TitleGuideText>
                        </TitleBox>
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
                                                        key={`analytics-measure-user-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.SUM_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.SUM_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.SUM_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.IS_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.IS_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.IS_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BP_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BP_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BP_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BS_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BS_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BS_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BC_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BC_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BC_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.ST_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.ST_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.ST_MAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.HT_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.HT_WOMAN_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.HT_MAN_CNT
                                                            )}
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
                                                        Number(e.SUM_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.SUM_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.IS_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.IS_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.IS_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BP_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BP_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BP_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BS_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BS_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BS_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BC_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BC_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.BC_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.ST_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.ST_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.ST_MAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HT_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HT_WOMAN_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.HT_MAN_CNT)
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
                        <TitleBox>
                            <TitleText>기간별 통계:</TitleText>
                            <TitleGuideText>
                                조회 기간 및 주기 기준에 따라 회원 수를 집계
                                (단위 : 명)
                            </TitleGuideText>
                        </TitleBox>
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
                                                    {addComma(
                                                        period.SUM_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.SUM_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.SUM_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.IS_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.IS_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.IS_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BP_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BP_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BP_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BS_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BS_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BS_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BC_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BC_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.BC_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.ST_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.ST_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.ST_MAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.HT_MBER_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.HT_WOMAN_CNT
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        period.HT_MAN_CNT
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

export default MeasureUserTable
