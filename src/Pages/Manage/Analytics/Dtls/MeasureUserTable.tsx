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

const MeasureUserTable = () => {
    return (
        <Container>
            <RowWapper>
                <TitleBox>연령별 통계</TitleBox>
                <ChartBox>차트</ChartBox>
            </RowWapper>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`default`}
                        ButtonName="엑셀다운로드"
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
                                <T.TheadCell colSpan={3}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>체성분계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈당계</T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    골레스테롤계
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    스트레스계
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>신장계</T.TheadCell>
                                <T.TheadCell colSpan={3}>활동량계</T.TheadCell>
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
                            <T.Row>
                                <T.CellW colSpan={2}>10대 이하</T.CellW>
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
                                <T.CellW colSpan={2}>60대</T.CellW>
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
                        ButtonType={`default`}
                        ButtonName="엑셀다운로드"
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
                                <T.TheadCell colSpan={3}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>체성분계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈당계</T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    골레스테롤계
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    스트레스계
                                </T.TheadCell>
                                <T.TheadCell colSpan={3}>신장계</T.TheadCell>
                                <T.TheadCell colSpan={3}>활동량계</T.TheadCell>
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
                            <T.Row>
                                <T.CellW colSpan={2}>2022-12-06</T.CellW>
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
                                <T.CellW colSpan={2}>2022-12-05</T.CellW>
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
                                <T.CellW colSpan={2}>2022-12-04</T.CellW>
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
                                <T.CellW colSpan={2}>2022-12-03</T.CellW>
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
                                <T.CellW colSpan={2}>
                                    2022-12-04 ~ 2022-12-10
                                </T.CellW>
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
                                <T.CellW colSpan={2}>
                                    2022-12-01 ~ 2022-12-31
                                </T.CellW>
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

export default MeasureUserTable
