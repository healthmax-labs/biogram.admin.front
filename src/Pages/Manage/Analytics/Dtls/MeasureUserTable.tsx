import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MesureListState } from '@Recoil/AnalyticsPagesState'
import React from 'react'
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

const MeasureUserTable = () => {
    const {
        status,
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
    } = useRecoilValue(MesureListState)

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
                                                        key={`analytics-measure-user-age-group-table-row-item-${ageIndex}`}>
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
                                    {PERIOD_STAT_LIST.map(
                                        (period, periodIndex) => {
                                            return (
                                                <T.Row
                                                    key={`analytics-measure-user-period-table-row-item-${periodIndex}`}>
                                                    <T.CellW>
                                                        {period.PERIOD}
                                                    </T.CellW>
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

export default MeasureUserTable
