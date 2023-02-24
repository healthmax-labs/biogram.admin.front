import React from 'react'
import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton, ElementLoading } from '@Elements'
import { useRecoilValue } from 'recoil'
import { MemberListState } from '@Recoil/AnalyticsPagesState'
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

const MemberTable = () => {
    const {
        list: { AGE_GROUP_STAT_LIST, PERIOD_STAT_LIST },
        status,
    } = useRecoilValue(MemberListState)

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
                                                    {DataRow.NEW_MBER_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.NEW_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {DataRow.DEL_MBER_CNT}
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
                                    {(() => {
                                        const DataRow = _.find(
                                            AGE_GROUP_STAT_LIST,
                                            {
                                                AGES_GROUP: 'TOT',
                                            }
                                        )

                                        if (DataRow) {
                                            return (
                                                <>
                                                    <T.TFootCell colSpan={2}>
                                                        합계
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.TOT_MBER_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.TOT_MAN_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.TOT_WOMAN_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.NEW_MBER_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.NEW_WOMAN_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.NEW_MAN_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.DEL_MBER_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.DEL_WOMAN_CNT}
                                                    </T.TFootCell>
                                                    <T.TFootCell>
                                                        {DataRow.DEL_MAN_CNT}
                                                    </T.TFootCell>
                                                </>
                                            )
                                        } else {
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
                                                </>
                                            )
                                        }
                                    })()}
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
                                                    {period.PERIOD}
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
                                                    {period.NEW_MBER_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.NEW_WOMAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.NEW_MAN_CNT}
                                                </T.Cell>
                                                <T.Cell>
                                                    {period.DEL_MBER_CNT}
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
        </Container>
    )
}

export default MemberTable
