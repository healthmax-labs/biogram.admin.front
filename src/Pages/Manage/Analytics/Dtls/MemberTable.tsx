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

const MemberTable = () => {
    return (
        <Container>
            <RowWapper>
                <TitleBox>연령별 통계</TitleBox>
                <ChartBox>차트</ChartBox>
            </RowWapper>
            <RowWapper>
                <ButtonBox>
                    <VaryButton
                        ButtonType={`manage`}
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
                            <T.Row>
                                <T.Cell colSpan={2}>10대 이하</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>20대</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>30대</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>40대</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>50대</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>60대</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>70대 이상</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
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
                        ButtonType={`manage`}
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
                            <T.Row>
                                <T.Cell colSpan={2}>2022-12-06</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>2022-12-05</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>2022-12-04</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>2022-12-03</T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>
                                    2022-12-04 ~ 2022-12-10
                                </T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
                            </T.Row>
                            <T.Row>
                                <T.Cell colSpan={2}>
                                    2022-12-01 ~ 2022-12-31
                                </T.Cell>
                                <T.Cell>20</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>10</T.Cell>
                                <T.Cell>2</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>1</T.Cell>
                                <T.Cell>0</T.Cell>
                                <T.Cell>1</T.Cell>
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
                            </T.TFootRow>
                        </T.TFoot>
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default MemberTable
