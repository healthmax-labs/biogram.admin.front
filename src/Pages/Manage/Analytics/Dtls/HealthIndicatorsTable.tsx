import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, VaryButton } from '@Elements'

import { useRecoilValue } from 'recoil'
import { ImprvmListState } from '@Recoil/AnalyticsPagesState'
import React from 'react'
import Codes from '@Codes'
import _ from 'lodash'

const {
    Container,
    RowWapper,
    // TitleBox,
    // ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const HealthIndicatorsTable = () => {
    const {
        status,
        list: { MYBODY_SCORE_IMPRVM_STAT_LIST },
    } = useRecoilValue(ImprvmListState)

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
                                            개선성공률
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            혈압
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            공복혈당
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            중성지방
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            HDL-C
                                        </T.TheadCell>
                                        <T.TheadCell colSpan={3}>
                                            허리둘레
                                        </T.TheadCell>
                                    </T.TheadRow>
                                    <T.TheadRow>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                        <T.TheadCell>전체</T.TheadCell>
                                        <T.TheadCell>내근직</T.TheadCell>
                                        <T.TheadCell>외근직</T.TheadCell>
                                    </T.TheadRow>
                                </T.Thead>
                                <T.Body>
                                    {Codes.ageGroup.list.map(
                                        (age, ageIndex) => {
                                            const DataRow = _.find(
                                                MYBODY_SCORE_IMPRVM_STAT_LIST,
                                                {
                                                    AGES_GROUP: age.code,
                                                }
                                            )

                                            if (DataRow) {
                                                return (
                                                    <T.Row
                                                        key={`analytics-health-indicators-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_TOT_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_TOT_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_TOT_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_BP_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_BP_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_BP_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_FBS_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_FBS_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_FBS_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_TG_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_TG_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_TG_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_HDLC_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_HDLC_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_HDLC_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.TT_WAIST_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_WAIST_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_WAIST_SCORE}%`}
                                                        </T.CellW>
                                                    </T.Row>
                                                )
                                            } else {
                                                return (
                                                    <T.Row
                                                        key={`analytics-health-indicators-age-group-table-row-item-${ageIndex}`}>
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
                                        {(() => {
                                            const DataRow = _.find(
                                                MYBODY_SCORE_IMPRVM_STAT_LIST,
                                                {
                                                    AGES_GROUP: 'TOT',
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
                                                            {`${DataRow.TT_TOT_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_TOT_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_TOT_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.TT_BP_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_BP_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_BP_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.TT_FBS_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_FBS_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_FBS_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.TT_TG_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_TG_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_TG_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.TT_HDLC_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_HDLC_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_HDLC_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.TT_WAIST_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.IW_WAIST_SCORE}%`}
                                                        </T.TFootCell>
                                                        <T.TFootCell>
                                                            {`${DataRow.OW_WAIST_SCORE}%`}
                                                        </T.TFootCell>
                                                    </>
                                                )
                                            } else {
                                                return <></>
                                            }
                                        })()}
                                    </T.TFootRow>
                                </T.TFoot>
                            </T.Table>
                        </TableBox>
                    </RowWapper>
                </>
            )}
        </Container>
    )
}

export default HealthIndicatorsTable
