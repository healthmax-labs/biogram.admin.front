import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

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
    return (
        <Container>
            <RowWapper>
                <TitleBox>연령별 통계</TitleBox>
                <ChartBox>차트</ChartBox>
            </RowWapper>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        Name="엑셀다운로드"
                        HandleClick={() => console.debug('HandleClick')}
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell rowSpan={2} colSpan={2}>
                                    연령
                                </T.TheadCell>
                                <T.TheadCell rowSpan={2}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압</T.TheadCell>
                                <T.TheadCell colSpan={3}>허리둘레</T.TheadCell>
                                <T.TheadCell colSpan={3}>식전혈당</T.TheadCell>
                                <T.TheadCell colSpan={3}>중성지방</T.TheadCell>
                                <T.TheadCell colSpan={3}>HDLC</T.TheadCell>
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
                            <T.Row>
                                <T.CellW colSpan={2}>10대 이하</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>20대</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>30대</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>40대</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>50대</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>60대</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellW colSpan={2}>70대 이상</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                <T.TFootCell colSpan={2}>합계</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
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
                        Name="엑셀다운로드"
                        HandleClick={() => console.debug('HandleClick')}
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell rowSpan={2} colSpan={2}>
                                    기간
                                </T.TheadCell>
                                <T.TheadCell rowSpan={2}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압</T.TheadCell>
                                <T.TheadCell colSpan={3}>허리둘레</T.TheadCell>
                                <T.TheadCell colSpan={3}>식전혈당</T.TheadCell>
                                <T.TheadCell colSpan={3}>중성지방</T.TheadCell>
                                <T.TheadCell colSpan={3}>HDLC</T.TheadCell>
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
                            <T.Row>
                                <T.CellWW colSpan={2}>2022-12-06</T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellWW colSpan={2}>2022-12-05</T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellWW colSpan={2}>2022-12-04</T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellWW colSpan={2}>2022-12-03</T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellWW colSpan={2}>
                                    2022-12-04 ~ 2022-12-10
                                </T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                            <T.Row>
                                <T.CellWW colSpan={2}>
                                    2022-12-01 ~ 2022-12-31
                                </T.CellWW>
                                <T.CellW>20</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>10</T.CellW>
                                <T.CellW>2</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>0</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                                <T.CellW>1</T.CellW>
                            </T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                <T.TFootCell colSpan={2}>합계</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                                <T.TFootCell>1</T.TFootCell>
                            </T.TFootRow>
                        </T.TFoot>
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default RiskFctrItemsTable
