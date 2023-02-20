import React from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading } from '@Elements'

import { useRecoilValue } from 'recoil'
import { RiskFctrItemsListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'

const {
    Container,
    RowWapper,
    TitleBox,
    ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const RiskFctrItemsTable = () => {
    const {
        status,
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(RiskFctrItemsListState)

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
                                    //
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
                                                    RF_AGE_GROUP: age.code,
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
                                                            {
                                                                DataRow.RF_ALL_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_622E_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_622E_GD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_622E_BD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_8072_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_8072_GD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_8072_BD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624A_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624A_GD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624A_BD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624D_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624D_GD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624D_BD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624E_TT_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624E_GD_CNT
                                                            }
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {
                                                                DataRow.RF_624E_BD_CNT
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
                                                                DataRow.RF_ALL_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_622E_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_622E_GD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_622E_BD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_8072_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_8072_GD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_8072_BD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624A_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624A_GD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624A_BD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624D_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624D_GD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624D_BD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624E_TT_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624E_GD_CNT
                                                            }
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {
                                                                DataRow.RF_624E_BD_CNT
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
                                    //
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
                                    {PERIOD_STAT_LIST.map(
                                        (period, periodIndex) => {
                                            return (
                                                <T.Row
                                                    key={`analytics-risk-fctr-items-period-table-row-item-${periodIndex}`}>
                                                    <T.CellW colSpan={2}>
                                                        {period.RF_PERIOD}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_ALL_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_622E_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_622E_GD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_622E_BD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_8072_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_8072_GD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_8072_BD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624A_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624A_GD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624A_BD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624D_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624D_GD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624D_BD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624E_TT_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624E_GD_CNT}
                                                    </T.CellW>
                                                    <T.CellW>
                                                        {period.RF_624E_BD_CNT}
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
        </Container>
    )
}

export default RiskFctrItemsTable
