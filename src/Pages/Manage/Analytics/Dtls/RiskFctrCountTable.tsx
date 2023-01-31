import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

import { useRecoilState } from 'recoil'
import { RiskFctrCountAnalyticsListState } from '@Recoil/AnalyticsPagesState'

const {
    Container,
    RowWapper,
    TitleBox,
    ChartBox,
    ButtonBox,
    TableBox,
    Table: T,
} = ContentsStyle

const RiskFctrCountTable = () => {
    const [
        riskFctrCountAnalyticsListState,
        // eslint-disable-next-line
        setRiskFctrCountAnalyticsListState,
    ] = useRecoilState(RiskFctrCountAnalyticsListState)

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number,
        title: string
    ) => {
        let cellHtml
        if (riskFctrCountAnalyticsListState.status) {
            if (
                area === 'AGE' &&
                riskFctrCountAnalyticsListState.list !== null
            ) {
                const getAgeData =
                    riskFctrCountAnalyticsListState.list.AGE_GROUP_STAT_LIST[
                        lineNum
                    ]

                const RF_ALL_MBER_CNT = getAgeData.RF_ALL_MBER_CNT
                const RF_ALL_WOMAN_CNT = getAgeData.RF_ALL_WOMAN_CNT
                const RF_ALL_MAN_CNT = getAgeData.RF_ALL_MAN_CNT
                const RF_1_MBER_CNT = getAgeData.RF_1_MBER_CNT
                const RF_1_WOMAN_CNT = getAgeData.RF_1_WOMAN_CNT
                const RF_1_MAN_CNT = getAgeData.RF_1_MAN_CNT
                const RF_2_MBER_CNT = getAgeData.RF_2_MBER_CNT
                const RF_2_WOMAN_CNT = getAgeData.RF_2_WOMAN_CNT
                const RF_2_MAN_CNT = getAgeData.RF_2_MAN_CNT
                const RF_3_MBER_CNT = getAgeData.RF_3_MBER_CNT
                const RF_3_WOMAN_CNT = getAgeData.RF_3_WOMAN_CNT
                const RF_3_MAN_CNT = getAgeData.RF_3_MAN_CNT
                const RF_4_MBER_CNT = getAgeData.RF_4_MBER_CNT
                const RF_4_WOMAN_CNT = getAgeData.RF_4_WOMAN_CNT
                const RF_4_MAN_CNT = getAgeData.RF_4_MAN_CNT
                const RF_5_MBER_CNT = getAgeData.RF_5_MBER_CNT
                const RF_5_WOMAN_CNT = getAgeData.RF_5_WOMAN_CNT
                const RF_5_MAN_CNT = getAgeData.RF_5_MAN_CNT

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.CellW colSpan={colspan}>{title}</T.CellW>
                            <T.CellW>{RF_ALL_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_ALL_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_ALL_MAN_CNT}</T.CellW>
                            <T.CellW>{RF_1_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_1_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_1_MAN_CNT}</T.CellW>
                            <T.CellW>{RF_2_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_2_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_2_MAN_CNT}</T.CellW>
                            <T.CellW>{RF_3_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_3_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_3_MAN_CNT}</T.CellW>
                            <T.CellW>{RF_4_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_4_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_4_MAN_CNT}</T.CellW>
                            <T.CellW>{RF_5_MBER_CNT}</T.CellW>
                            <T.CellW>{RF_5_WOMAN_CNT}</T.CellW>
                            <T.CellW>{RF_5_MAN_CNT}</T.CellW>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>합계</T.TFootCell>
                            <T.TFootCell>{RF_ALL_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_ALL_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_ALL_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_1_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_1_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_1_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_2_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_2_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_2_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_3_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_3_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_3_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_4_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_4_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_4_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_5_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_5_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{RF_5_MAN_CNT}</T.TFootCell>
                        </>
                    )
                }
            } else if (riskFctrCountAnalyticsListState.list !== null) {
                const data =
                    riskFctrCountAnalyticsListState.list.PERIOD_STAT_LIST

                return data.map(data => (
                    <T.Row key={data.RF_PERIOD}>
                        <T.CellWW>{data.RF_PERIOD}</T.CellWW>
                        <T.CellW>{data.RF_ALL_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_ALL_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_ALL_MAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_1_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_1_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_1_MAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_2_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_2_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_2_MAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_3_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_3_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_3_MAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_4_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_4_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_4_MAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_5_MBER_CNT}</T.CellW>
                        <T.CellW>{data.RF_5_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.RF_5_MAN_CNT}</T.CellW>
                    </T.Row>
                ))
            }
        } else {
            if (area !== 'AGE') {
                cellHtml = (
                    <>
                        <T.CellW colSpan={colspan}>-</T.CellW>
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
                    </>
                )
            } else {
                cellHtml = (
                    <>
                        <T.CellW colSpan={colspan}>-</T.CellW>
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
                    </>
                )
            }
        }
        return cellHtml
    }

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
                                <T.TheadCell colSpan={3}>1개</T.TheadCell>
                                <T.TheadCell colSpan={3}>2개</T.TheadCell>
                                <T.TheadCell colSpan={3}>3개</T.TheadCell>
                                <T.TheadCell colSpan={3}>4개</T.TheadCell>
                                <T.TheadCell colSpan={3}>5개</T.TheadCell>
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
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>
                            <T.Row>
                                {cellMaker(0, 'AGE', '', 2, '10대 이하')}
                            </T.Row>
                            <T.Row>{cellMaker(1, 'AGE', '', 2, '20대')}</T.Row>
                            <T.Row>{cellMaker(2, 'AGE', '', 2, '30대')}</T.Row>
                            <T.Row>{cellMaker(3, 'AGE', '', 2, '40대')}</T.Row>
                            <T.Row>{cellMaker(4, 'AGE', '', 2, '50대')}</T.Row>
                            <T.Row>{cellMaker(5, 'AGE', '', 2, '60대')}</T.Row>
                            <T.Row>
                                {cellMaker(6, 'AGE', '', 2, '70대 이상')}
                            </T.Row>
                        </T.Body>
                        <T.TFoot>
                            <T.TFootRow>
                                {cellMaker(7, 'AGE', 'footer', 2, '합계')}
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
                                <T.TheadCell rowSpan={2}>기간</T.TheadCell>
                                <T.TheadCell colSpan={3}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>1개</T.TheadCell>
                                <T.TheadCell colSpan={3}>2개</T.TheadCell>
                                <T.TheadCell colSpan={3}>3개</T.TheadCell>
                                <T.TheadCell colSpan={3}>4개</T.TheadCell>
                                <T.TheadCell colSpan={3}>5개</T.TheadCell>
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
                            </T.TheadRow>
                        </T.Thead>
                        <T.Body>{cellMaker(0, 'PERIOD', '', 1, '기간')}</T.Body>
                        {/* <T.TFoot>
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
                            </T.TFootRow>
                        </T.TFoot> */}
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default RiskFctrCountTable
