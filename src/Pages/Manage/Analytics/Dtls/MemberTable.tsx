import React, { useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MemberListState } from '@Recoil/AnalyticsPagesState'
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

const MemberTable = () => {
    const {
        search: { INST_NO, instNm, BGNDE, ENDDE },
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
        status,
    } = useRecoilValue(MemberListState)

    const [pageState, setPageState] = useState<{
        modal: {
            ageExcelDownload: boolean
            periodExcelDownload: boolean
        }
    }>(initializeState)

    const [excelDownloadProps, setExcelDownloadProps] =
        useState<ExcelDownloadPropsInterface>(
            ExcelDownloadInitialize.Analytics.Member
        )

    const handleAgeExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName:
                INST_NO && instNm
                    ? `회원_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `회원_연령별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `회원 연령별 통계`,
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
                        AGES_GROUP: age.code,
                    })

                    return [
                        age.name,
                        `${DataRow ? addComma(DataRow.TOT_MBER_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.TOT_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.TOT_MAN_CNT) : ``}`,
                        `${
                            DataRow
                                ? addComma(
                                      DataRow.NEW_WOMAN_CNT +
                                          DataRow.NEW_MAN_CNT
                                  )
                                : ``
                        }`,
                        `${DataRow ? addComma(DataRow.NEW_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.NEW_MAN_CNT) : ``}`,
                        `${
                            DataRow
                                ? addComma(
                                      DataRow.DEL_WOMAN_CNT +
                                          DataRow.DEL_MAN_CNT
                                  )
                                : ``
                        }`,
                        `${DataRow ? addComma(DataRow.DEL_WOMAN_CNT) : ``}`,
                        `${DataRow ? addComma(DataRow.DEL_MAN_CNT) : ``}`,
                    ]
                })

                returnData.push([
                    '합계',
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TOT_MBER_CNT))
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.TOT_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.TOT_MAN_CNT))
                        )
                    )}`,
                    `${(() => {
                        const NEW_WOMAN_CNT = _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.NEW_WOMAN_CNT)
                            )
                        )

                        const NEW_MAN_CNT = _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.NEW_MAN_CNT))
                        )

                        return `${addComma(NEW_WOMAN_CNT + NEW_MAN_CNT)}`
                    })()}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.NEW_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.NEW_MAN_CNT))
                        )
                    )}`,
                    `${(() => {
                        const DEL_WOMAN_CNT = _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.DEL_WOMAN_CNT)
                            )
                        )

                        const DEL_MAN_CNT = _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.DEL_MAN_CNT))
                        )

                        return `${addComma(DEL_WOMAN_CNT + DEL_MAN_CNT)}`
                    })()}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e =>
                                Number(e.DEL_WOMAN_CNT)
                            )
                        )
                    )}`,
                    `${addComma(
                        _.sum(
                            AGE_GROUP_STAT_LIST.map(e => Number(e.DEL_MAN_CNT))
                        )
                    )}`,
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
                    ? `회원_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${instNm.replace(
                          / /g,
                          '_'
                      )}_${getNowDateDetail()}`
                    : `회원_기간별_통계_(${dateInsertHypen(
                          BGNDE
                      )}_${dateInsertHypen(ENDDE)})_${getNowDateDetail()}`,
            SheetName: `회원 기간별 통계`,
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
                return PERIOD_STAT_LIST.map(period => {
                    return [
                        `${period ? period.CYCLE_GUBUN : ''}`,
                        `${period ? addComma(period.TOT_MBER_CNT) : ''}`,
                        `${period ? addComma(period.TOT_WOMAN_CNT) : ''}`,
                        `${period ? addComma(period.TOT_MAN_CNT) : ''}`,
                        `${
                            period
                                ? addComma(
                                      period.NEW_WOMAN_CNT + period.NEW_MAN_CNT
                                  )
                                : ''
                        }`,
                        `${period ? addComma(period.NEW_WOMAN_CNT) : ''}`,
                        `${period ? addComma(period.NEW_MAN_CNT) : ''}`,
                        `${
                            period
                                ? addComma(
                                      period.DEL_WOMAN_CNT + period.DEL_MAN_CNT
                                  )
                                : ''
                        }`,
                        `${period ? addComma(period.DEL_WOMAN_CNT) : ''}`,
                        `${period ? addComma(period.DEL_MAN_CNT) : ''}`,
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
                                조회 기간 중 최종일 기준으로 회원 수를 연령별로
                                산출
                            </TitleGuideText>
                        </TitleBox>
                    </RowWapper>
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
                                        전체회원수
                                    </T.TheadCell>
                                    <T.TheadCell colSpan={3}>
                                        신규회원수
                                    </T.TheadCell>
                                    <T.TheadCell colSpan={3}>
                                        탈퇴회원수
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
                                </T.TheadRow>
                            </T.Thead>
                            <T.Body>
                                {Codes.ageGroup.list.map((age, ageIndex) => {
                                    const DataRow = _.find(
                                        AGE_GROUP_STAT_LIST,
                                        {
                                            AGES_GROUP: age.code,
                                        }
                                    )

                                    if (DataRow) {
                                        return (
                                            <T.Row
                                                key={`analytics-member-table-row-item-${ageIndex}`}>
                                                <T.Cell colSpan={2}>
                                                    {age.name}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.TOT_MBER_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.TOT_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.TOT_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.NEW_WOMAN_CNT +
                                                            DataRow.NEW_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.NEW_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.NEW_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.DEL_WOMAN_CNT +
                                                            DataRow.DEL_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.DEL_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        DataRow.DEL_MAN_CNT
                                                    )}
                                                </T.Cell>
                                            </T.Row>
                                        )
                                    } else {
                                        return (
                                            <T.Row
                                                key={`analytics-member-list-age-group-table-row-item-${ageIndex}`}>
                                                <T.Cell colSpan={2}>
                                                    {age.name}
                                                </T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                                <T.Cell>-</T.Cell>
                                            </T.Row>
                                        )
                                    }
                                })}
                            </T.Body>
                            <T.TFoot>
                                <T.TFootRow>
                                    <T.TFootCell colSpan={2}>합계</T.TFootCell>
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
                                                    Number(e.TOT_WOMAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {addComma(
                                            _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.TOT_MAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {(() => {
                                            const NEW_WOMAN_CNT = _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.NEW_WOMAN_CNT)
                                                )
                                            )

                                            const NEW_MAN_CNT = _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.NEW_MAN_CNT)
                                                )
                                            )

                                            return `${addComma(
                                                NEW_WOMAN_CNT + NEW_MAN_CNT
                                            )}`
                                        })()}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {addComma(
                                            _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.NEW_WOMAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {addComma(
                                            _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.NEW_MAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {(() => {
                                            const DEL_WOMAN_CNT = _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.DEL_WOMAN_CNT)
                                                )
                                            )

                                            const DEL_MAN_CNT = _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.DEL_MAN_CNT)
                                                )
                                            )

                                            return `${addComma(
                                                DEL_WOMAN_CNT + DEL_MAN_CNT
                                            )}`
                                        })()}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {addComma(
                                            _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.DEL_WOMAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {addComma(
                                            _.sum(
                                                AGE_GROUP_STAT_LIST.map(e =>
                                                    Number(e.DEL_MAN_CNT)
                                                )
                                            )
                                        )}
                                    </T.TFootCell>
                                </T.TFootRow>
                            </T.TFoot>
                        </T.Table>
                    </TableBox>
                    <RowWapper>
                        <TitleBox>
                            <TitleText>기간별 통계:</TitleText>
                            <TitleGuideText>
                                조회 기간과 선택한 주기 기준에 따라 회원 수를
                                집계
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
                                        <T.TheadCell rowSpan={2} colSpan={2}>
                                            기간
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            전체회원수
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            신규회원수
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            탈퇴회원수
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
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {PERIOD_STAT_LIST.map((period, pIndex) => {
                                        return (
                                            <T.Row
                                                key={`analytics-member-list-period-table-row-item-${pIndex}`}>
                                                <T.Cell colSpan={2}>
                                                    {period.CYCLE_GUBUN}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.TOT_MBER_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.TOT_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.TOT_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.NEW_WOMAN_CNT +
                                                            period.NEW_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.NEW_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.NEW_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.DEL_WOMAN_CNT +
                                                            period.DEL_MAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.DEL_WOMAN_CNT
                                                    )}
                                                </T.Cell>
                                                <T.Cell>
                                                    {addComma(
                                                        period.DEL_MAN_CNT
                                                    )}
                                                </T.Cell>
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

export default MemberTable
