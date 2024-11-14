import { ElementLoading, ExcelDownload, VaryButton } from '@Element/index'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import Codes from '@Codes'
import _ from 'lodash'
import { addComma, dateInsertHypen, getNowDateDetail } from '@Helper'
import React, { useState } from 'react'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import ExcelDownloadInitialize from '@Common/ExcelDownloadInitialize'
import { useRecoilValue } from 'recoil'
import { StressState } from '@Recoil/AnalyticsPagesState'

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

const StressTable = () => {
    const {
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
        status,
    } = useRecoilValue(StressState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.StressList
        )

    const handleAgeExcelDownload = async () => {
        setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `스트레스_연령별_측정자수_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `스트레스_연령별_측정자수_(${dateInsertHypen(
                          ENDDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `스트레스 연령별 측정자수_`,
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
                        `${DataRow ? addComma(DataRow.TOT_MBER_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.STRS_SCORE_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.STRS_SCORE_D_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.PHYSIC_STRS_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.PHYSIC_STRS_D_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.MNTL_STRS_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.MNTL_STRS_D_CNT) : ''}`,
                        `${
                            DataRow
                                ? addComma(DataRow.STRS_CNTRMSR_ABLTY_N_CNT)
                                : ''
                        }`,
                        `${
                            DataRow
                                ? addComma(DataRow.STRS_CNTRMSR_ABLTY_D_CNT)
                                : ''
                        }`,
                        `${DataRow ? addComma(DataRow.BLDVSS_STEP_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.BLDVSS_STEP_D_CNT) : ''}`,
                        `${
                            DataRow ? addComma(DataRow.CAD_OUTPUT_IN_N_CNT) : ''
                        }`,
                        `${
                            DataRow ? addComma(DataRow.CAD_OUTPUT_IN_D_CNT) : ''
                        }`,
                        `${DataRow ? addComma(DataRow.ELSTC_DGREE_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.ELSTC_DGREE_D_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.RBV_QY_N_CNT) : ''}`,
                        `${DataRow ? addComma(DataRow.RBV_QY_D_CNT) : ''}`,
                    ]
                })

                resutnData.push([
                    `합계`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TOT_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.STRS_SCORE_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.STRS_SCORE_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.PHYSIC_STRS_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.PHYSIC_STRS_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.MNTL_STRS_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.MNTL_STRS_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.STRS_CNTRMSR_ABLTY_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.STRS_CNTRMSR_ABLTY_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.BLDVSS_STEP_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.BLDVSS_STEP_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.CAD_OUTPUT_IN_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.CAD_OUTPUT_IN_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.ELSTC_DGREE_N_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.ELSTC_DGREE_D_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.RBV_QY_N_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.RBV_QY_D_CNT))
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
                    ? `스트레스_주기별_순_측정자_수(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `스트레스_주기별_순_측정자_수(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `스트레스 주기별 순 측정자 수`,
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
                    `${period.PERIOD}`,
                    `${addComma(Number(period.TOT_MBER_CNT))}`,
                    `${addComma(Number(period.STRS_SCORE_N_CNT))}`,
                    `${addComma(Number(period.STRS_SCORE_D_CNT))}`,
                    `${addComma(Number(period.PHYSIC_STRS_N_CNT))}`,
                    `${addComma(Number(period.PHYSIC_STRS_D_CNT))}`,
                    `${addComma(Number(period.MNTL_STRS_N_CNT))}`,
                    `${addComma(Number(period.MNTL_STRS_D_CNT))}`,
                    `${addComma(Number(period.STRS_CNTRMSR_ABLTY_N_CNT))}`,
                    `${addComma(Number(period.STRS_CNTRMSR_ABLTY_D_CNT))}`,
                    `${addComma(Number(period.BLDVSS_STEP_N_CNT))}`,
                    `${addComma(Number(period.BLDVSS_STEP_D_CNT))}`,
                    `${addComma(Number(period.CAD_OUTPUT_IN_N_CNT))}`,
                    `${addComma(Number(period.CAD_OUTPUT_IN_D_CNT))}`,
                    `${addComma(Number(period.ELSTC_DGREE_N_CNT))}`,
                    `${addComma(Number(period.ELSTC_DGREE_D_CNT))}`,
                    `${addComma(Number(period.RBV_QY_N_CNT))}`,
                    `${addComma(Number(period.RBV_QY_D_CNT))}`,
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
                        <TitleBox>
                            <TitleText>연령별 통계:</TitleText>
                            <TitleGuideText>
                                조회 기간동안 총 몇 명의 이용자가 발생했는지
                                연령별로 산출 / 위험기준: 주의 ~ 매우나쁨
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
                                        <T.TheadCellWfix
                                            rowSpan={2}
                                            colSpan={2}>
                                            연령대
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix
                                            rowSpan={2}
                                            dangerouslySetInnerHTML={{
                                                __html: `측정인원<br />(명)`,
                                            }}></T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                스트레스점수
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                신체적스트레스
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                정신적스트레스
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                스트레스대처능력
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            혈관단계
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            박출강도
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            탄성도
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            잔혈량
                                        </T.TheadCellWfix>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
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
                                                        key={`analytics-stress-items-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.TOT_MBER_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.STRS_SCORE_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.STRS_SCORE_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.PHYSIC_STRS_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.PHYSIC_STRS_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.MNTL_STRS_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.MNTL_STRS_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.STRS_CNTRMSR_ABLTY_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.STRS_CNTRMSR_ABLTY_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BLDVSS_STEP_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.BLDVSS_STEP_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.CAD_OUTPUT_IN_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.CAD_OUTPUT_IN_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.ELSTC_DGREE_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.ELSTC_DGREE_D_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.RBV_QY_N_CNT
                                                            )}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {addComma(
                                                                DataRow.RBV_QY_D_CNT
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
                                                        Number(e.TOT_MBER_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(
                                                            e.STRS_SCORE_N_CNT
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
                                                            e.STRS_SCORE_D_CNT
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
                                                            e.PHYSIC_STRS_N_CNT
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
                                                            e.PHYSIC_STRS_D_CNT
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
                                                            e.MNTL_STRS_N_CNT
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
                                                            e.MNTL_STRS_D_CNT
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
                                                            e.STRS_CNTRMSR_ABLTY_N_CNT
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
                                                            e.STRS_CNTRMSR_ABLTY_D_CNT
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
                                                            e.BLDVSS_STEP_N_CNT
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
                                                            e.BLDVSS_STEP_D_CNT
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
                                                            e.CAD_OUTPUT_IN_N_CNT
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
                                                            e.CAD_OUTPUT_IN_D_CNT
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
                                                            e.ELSTC_DGREE_N_CNT
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
                                                            e.ELSTC_DGREE_D_CNT
                                                        )
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.RBV_QY_N_CNT)
                                                    )
                                                )
                                            )}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {addComma(
                                                _.sum(
                                                    AGE_GROUP_STAT_LIST.map(e =>
                                                        Number(e.RBV_QY_D_CNT)
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
                                조회 기간 및 주기 기준에 따라 회원 수를 집계 /
                                위험기준 : 주의 ~ 매우나쁨
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
                                        <T.TheadCellWfix
                                            rowSpan={2}
                                            colSpan={2}>
                                            주기
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix
                                            rowSpan={2}
                                            dangerouslySetInnerHTML={{
                                                __html: `측정인원<br />(명)`,
                                            }}></T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                스트레스 점수
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                신체적스트레스
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                정신적스트레스
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            <T.TheadCellHeadText>
                                                스트레스대처능력
                                            </T.TheadCellHeadText>
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            혈관단계
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            박출강도
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            탄성도
                                        </T.TheadCellWfix>
                                        <T.TheadCellWfix colSpan={2}>
                                            잔혈량
                                        </T.TheadCellWfix>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                        <T.TheadCellWfix>정상</T.TheadCellWfix>
                                        <T.TheadCellWfix>위험</T.TheadCellWfix>
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {_.sortBy(
                                        PERIOD_STAT_LIST,
                                        'CYCLE_GUBUN'
                                    ).map((period, periodIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-stress-items-period-table-row-item-${periodIndex}`}>
                                                <T.CellW colSpan={2}>
                                                    {period.PERIOD}
                                                </T.CellW>
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
                                                            period.STRS_SCORE_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.STRS_SCORE_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.PHYSIC_STRS_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.PHYSIC_STRS_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.MNTL_STRS_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.MNTL_STRS_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.STRS_CNTRMSR_ABLTY_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.STRS_CNTRMSR_ABLTY_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BLDVSS_STEP_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.BLDVSS_STEP_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.CAD_OUTPUT_IN_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.CAD_OUTPUT_IN_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.ELSTC_DGREE_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.ELSTC_DGREE_D_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.RBV_QY_N_CNT
                                                        )
                                                    )}
                                                </T.CellW>
                                                <T.CellW>
                                                    {addComma(
                                                        Number(
                                                            period.RBV_QY_D_CNT
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

export default StressTable
