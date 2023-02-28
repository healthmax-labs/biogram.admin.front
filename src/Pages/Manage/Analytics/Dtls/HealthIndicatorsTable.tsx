import React from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { ElementLoading, VaryButton } from '@Elements'
import { useRecoilValue } from 'recoil'
import { ImprvmListState } from '@Recoil/AnalyticsPagesState'
import Codes from '@Codes'
import _ from 'lodash'

const { Container, RowWapper, ButtonBox, TableBox, Table: T } = ContentsStyle

const HealthIndicatorsTable = () => {
    const { status, list } = useRecoilValue(ImprvmListState)

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
                                            const DataRow = _.find(list, {
                                                AGES_GROUP: age.code,
                                            })

                                            if (DataRow) {
                                                return (
                                                    <T.Row
                                                        key={`analytics-health-indicators-age-group-table-row-item-${ageIndex}`}>
                                                        <T.CellW colSpan={2}>
                                                            {age.name}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                (DataRow.IW_TOT_SCORE +
                                                                    DataRow.OW_TOT_SCORE) /
                                                                2
                                                            }%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_TOT_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_TOT_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                (DataRow.IW_BP_SCORE +
                                                                    DataRow.OW_BP_SCORE) /
                                                                2
                                                            }%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_BP_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_BP_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                (DataRow.IW_FBS_SCORE +
                                                                    DataRow.OW_FBS_SCORE) /
                                                                2
                                                            }%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_FBS_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_FBS_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                DataRow.IW_TG_SCORE +
                                                                DataRow.OW_TG_SCORE /
                                                                    2
                                                            }%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_TG_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_TG_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                DataRow.IW_HDLC_SCORE +
                                                                DataRow.OW_HDLC_SCORE /
                                                                    2
                                                            }%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.IW_HDLC_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${DataRow.OW_HDLC_SCORE}%`}
                                                        </T.CellW>
                                                        <T.CellW>
                                                            {`${
                                                                (DataRow.IW_WAIST_SCORE +
                                                                    DataRow.OW_WAIST_SCORE) /
                                                                2
                                                            }%`}
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
                                        <T.TFootCell colSpan={2}>
                                            합계
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_TOT_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_TOT_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_TOT_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_TOT_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_TOT_SCORE +
                                                        OW_TOT_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_TOT_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_TOT_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_TOT_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_TOT_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_TOT_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_TOT_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_BP_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_BP_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_BP_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_BP_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_BP_SCORE +
                                                        OW_BP_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_BP_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_BP_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_BP_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_BP_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_BP_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_BP_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_FBS_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_FBS_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_FBS_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_FBS_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_FBS_SCORE +
                                                        OW_FBS_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_FBS_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_FBS_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_FBS_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_FBS_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_FBS_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_FBS_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_TG_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_TG_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_TG_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_TG_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_TG_SCORE +
                                                        OW_TG_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_TG_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_TG_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_TG_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_TG_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_TG_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_TG_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_HDLC_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_HDLC_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_HDLC_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_HDLC_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_HDLC_SCORE +
                                                        OW_HDLC_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_HDLC_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_HDLC_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_HDLC_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_HDLC_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_HDLC_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_HDLC_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_WAIST_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_WAIST_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                const OW_WAIST_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_WAIST_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${
                                                    (IW_WAIST_SCORE +
                                                        OW_WAIST_SCORE) /
                                                    2
                                                }%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const IW_WAIST_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.IW_WAIST_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${IW_WAIST_SCORE}%`
                                            })()}
                                        </T.TFootCell>
                                        <T.TFootCell>
                                            {(() => {
                                                const OW_WAIST_SCORE =
                                                    _.sum(
                                                        list.map(e =>
                                                            Number(
                                                                e.OW_WAIST_SCORE
                                                            )
                                                        )
                                                    ) /
                                                    Codes.ageGroup.list.length

                                                return `${OW_WAIST_SCORE}%`
                                            })()}
                                        </T.TFootCell>
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
