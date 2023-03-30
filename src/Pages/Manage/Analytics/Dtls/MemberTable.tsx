import React, { useState } from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading, ExcelDownload } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MemberListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'
import { ExcelDownloadPropsInterface } from '@CommonTypes'
import { getNowDateDetail } from '@Helper'
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

const MemberTable = () => {
    const {
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
            FileName: `회원_연령별_통계_${getNowDateDetail()}`,
            SheetName: `회원 연령별 통계`,
            Data: (() => {
                return Codes.ageGroup.list.map(age => {
                    const DataRow = _.find(AGE_GROUP_STAT_LIST, {
                        AGES_GROUP: age.code,
                    })

                    if (DataRow) {
                        return [
                            age.name,
                            String(DataRow.TOT_MBER_CNT),
                            String(DataRow.TOT_WOMAN_CNT),
                            String(DataRow.TOT_MAN_CNT),
                            String(DataRow.NEW_WOMAN_CNT + DataRow.NEW_MAN_CNT),
                            String(DataRow.NEW_WOMAN_CNT),
                            String(DataRow.NEW_MAN_CNT),
                            String(DataRow.DEL_WOMAN_CNT + DataRow.DEL_MAN_CNT),
                            String(DataRow.DEL_WOMAN_CNT),
                            String(DataRow.DEL_MAN_CNT),
                        ]
                    } else {
                        return [age.name, '', '', '', '', '', '', '', '', '']
                    }
                })
            })(),
        }))
    }

    const handlePeriodExcelDownload = async () => {
        await setExcelDownloadProps(prevState => ({
            ...prevState,
            FileName: `회원_기간별_통계_${getNowDateDetail()}`,
            SheetName: `회원 기간별 통계`,
            Data: (() => {
                return PERIOD_STAT_LIST.map(period => {
                    return [
                        period.CYCLE_GUBUN,
                        String(period.TOT_MBER_CNT),
                        String(period.TOT_WOMAN_CNT),
                        String(period.TOT_MAN_CNT),
                        String(period.NEW_WOMAN_CNT + period.NEW_MAN_CNT),
                        String(period.NEW_WOMAN_CNT),
                        String(period.NEW_MAN_CNT),
                        String(period.DEL_WOMAN_CNT + period.DEL_MAN_CNT),
                        String(period.DEL_WOMAN_CNT),
                        String(period.DEL_MAN_CNT),
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
                                                    {DataRow.TOT_MBER_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.TOT_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.TOT_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.NEW_WOMAN_CNT +
                                                        DataRow.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.NEW_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.DEL_WOMAN_CNT +
                                                        DataRow.DEL_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.DEL_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.DEL_MAN_CNT}
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
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.TOT_MBER_CNT)
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.TOT_WOMAN_CNT)
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.TOT_MAN_CNT)
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

                                            return `${
                                                NEW_WOMAN_CNT + NEW_MAN_CNT
                                            }`
                                        })()}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.NEW_WOMAN_CNT)
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.NEW_MAN_CNT)
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

                                            return `${
                                                DEL_WOMAN_CNT + DEL_MAN_CNT
                                            }`
                                        })()}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.DEL_WOMAN_CNT)
                                            )
                                        )}
                                    </T.TFootCell>
                                    <T.TFootCell>
                                        {_.sum(
                                            AGE_GROUP_STAT_LIST.map(e =>
                                                Number(e.DEL_MAN_CNT)
                                            )
                                        )}
                                    </T.TFootCell>
                                </T.TFootRow>
                            </T.TFoot>
                        </T.Table>
                    </TableBox>
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
                                                    {period.TOT_MBER_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.TOT_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.TOT_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.NEW_WOMAN_CNT +
                                                        period.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.NEW_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.DEL_WOMAN_CNT +
                                                        period.DEL_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.DEL_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.DEL_MAN_CNT}
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
