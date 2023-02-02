import { ContentsStyle } from '@Style/Pages/AnalyticsPageStyle'
import { VaryButton } from '@Elements'

import { useRecoilValue } from 'recoil'
import { MesureAnalyticsListState } from '@Recoil/AnalyticsPagesState'

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
    const measureAnalyticsListState = useRecoilValue(MesureAnalyticsListState)

    const cellMaker = (
        lineNum: number,
        area: string,
        mode: string,
        colspan: number,
        title: string
    ) => {
        let cellHtml
        if (measureAnalyticsListState.status) {
            if (area === 'AGE' && measureAnalyticsListState.list !== null) {
                const getAgeData =
                    measureAnalyticsListState.list.AGE_GROUP_STAT_LIST[lineNum]

                const TOT_MBER_CNT = getAgeData.TOT_MBER_CNT
                const TOT_WOMAN_CNT = getAgeData.TOT_WOMAN_CNT
                const TOT_MAN_CNT = getAgeData.TOT_MAN_CNT
                const IS_MBER_CNT = getAgeData.IS_MBER_CNT
                const IS_WOMAN_CNT = getAgeData.IS_WOMAN_CNT
                const IS_MAN_CNT = getAgeData.IS_MAN_CNT
                const BP_MBER_CNT = getAgeData.BP_MBER_CNT
                const BP_WOMAN_CNT = getAgeData.BP_WOMAN_CNT
                const BP_MAN_CNT = getAgeData.BP_MAN_CNT
                const BS_MBER_CNT = getAgeData.BS_MBER_CNT
                const BS_WOMAN_CNT = getAgeData.BS_WOMAN_CNT
                const BS_MAN_CNT = getAgeData.BS_MAN_CNT
                const BC_MBER_CNT = getAgeData.BC_MBER_CNT
                const BC_WOMAN_CNT = getAgeData.BC_WOMAN_CNT
                const BC_MAN_CNT = getAgeData.BC_MAN_CNT
                const ST_MBER_CNT = getAgeData.ST_MBER_CNT
                const ST_WOMAN_CNT = getAgeData.ST_WOMAN_CNT
                const ST_MAN_CNT = getAgeData.ST_MAN_CNT
                const HT_MBER_CNT = getAgeData.HT_MBER_CNT
                const HT_WOMAN_CNT = getAgeData.HT_WOMAN_CNT
                const HT_MAN_CNT = getAgeData.HT_MAN_CNT
                const BD_MBER_CNT = getAgeData.BD_MBER_CNT
                const BD_WOMAN_CNT = getAgeData.BD_WOMAN_CNT
                const BD_MAN_CNT = getAgeData.BD_MAN_CNT

                if (mode === '') {
                    cellHtml = (
                        <>
                            <T.CellW colSpan={colspan}>{title}</T.CellW>
                            <T.CellW>{TOT_MBER_CNT}</T.CellW>
                            <T.CellW>{TOT_WOMAN_CNT}</T.CellW>
                            <T.CellW>{TOT_MAN_CNT}</T.CellW>
                            <T.CellW>{IS_MBER_CNT}</T.CellW>
                            <T.CellW>{IS_WOMAN_CNT}</T.CellW>
                            <T.CellW>{IS_MAN_CNT}</T.CellW>
                            <T.CellW>{BP_MBER_CNT}</T.CellW>
                            <T.CellW>{BP_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BP_MAN_CNT}</T.CellW>
                            <T.CellW>{BS_MBER_CNT}</T.CellW>
                            <T.CellW>{BS_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BS_MAN_CNT}</T.CellW>
                            <T.CellW>{BC_MBER_CNT}</T.CellW>
                            <T.CellW>{BC_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BC_MAN_CNT}</T.CellW>
                            <T.CellW>{ST_MBER_CNT}</T.CellW>
                            <T.CellW>{ST_WOMAN_CNT}</T.CellW>
                            <T.CellW>{ST_MAN_CNT}</T.CellW>
                            <T.CellW>{HT_MBER_CNT}</T.CellW>
                            <T.CellW>{HT_WOMAN_CNT}</T.CellW>
                            <T.CellW>{HT_MAN_CNT}</T.CellW>
                            <T.CellW>{BD_MBER_CNT}</T.CellW>
                            <T.CellW>{BD_WOMAN_CNT}</T.CellW>
                            <T.CellW>{BD_MAN_CNT}</T.CellW>
                        </>
                    )
                } else {
                    cellHtml = (
                        <>
                            <T.TFootCell colSpan={colspan}>합계</T.TFootCell>
                            <T.TFootCell>{TOT_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{TOT_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{TOT_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{IS_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{IS_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{IS_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BP_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{BP_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BP_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BS_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{BS_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BS_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BC_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{BC_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BC_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{ST_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{ST_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{ST_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{HT_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{HT_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{HT_MAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BD_MBER_CNT}</T.TFootCell>
                            <T.TFootCell>{BD_WOMAN_CNT}</T.TFootCell>
                            <T.TFootCell>{BD_MAN_CNT}</T.TFootCell>
                        </>
                    )
                }
            } else if (measureAnalyticsListState.list !== null) {
                const data = measureAnalyticsListState.list.PERIOD_STAT_LIST

                return data.map(data => (
                    <T.Row key={data.PERIOD}>
                        <T.CellW colSpan={colspan}>{data.PERIOD}</T.CellW>
                        <T.CellW>{data.TOT_MBER_CNT}</T.CellW>
                        <T.CellW>{data.TOT_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.TOT_MAN_CNT}</T.CellW>
                        <T.CellW>{data.IS_MBER_CNT}</T.CellW>
                        <T.CellW>{data.IS_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.IS_MAN_CNT}</T.CellW>
                        <T.CellW>{data.BP_MBER_CNT}</T.CellW>
                        <T.CellW>{data.BP_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.BP_MAN_CNT}</T.CellW>
                        <T.CellW>{data.BS_MBER_CNT}</T.CellW>
                        <T.CellW>{data.BS_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.BS_MAN_CNT}</T.CellW>
                        <T.CellW>{data.BC_MBER_CNT}</T.CellW>
                        <T.CellW>{data.BC_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.BC_MAN_CNT}</T.CellW>
                        <T.CellW>{data.ST_MBER_CNT}</T.CellW>
                        <T.CellW>{data.ST_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.ST_MAN_CNT}</T.CellW>
                        <T.CellW>{data.HT_MBER_CNT}</T.CellW>
                        <T.CellW>{data.HT_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.HT_MAN_CNT}</T.CellW>
                        <T.CellW>{data.BD_MBER_CNT}</T.CellW>
                        <T.CellW>{data.BD_WOMAN_CNT}</T.CellW>
                        <T.CellW>{data.BD_MAN_CNT}</T.CellW>
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
                                <T.TheadCell colSpan={3}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>체성분계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈당계</T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    콜레스테롤계
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
                        HandleClick={() => {
                            //
                        }}
                    />
                </ButtonBox>
                <TableBox>
                    <T.Table>
                        <T.Thead>
                            <T.TheadRow>
                                <T.TheadCell rowSpan={2}>기간</T.TheadCell>
                                <T.TheadCell colSpan={3}>전체</T.TheadCell>
                                <T.TheadCell colSpan={3}>체성분계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈압계</T.TheadCell>
                                <T.TheadCell colSpan={3}>혈당계</T.TheadCell>
                                <T.TheadCell colSpan={3}>
                                    콜레스테롤계
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
                        <T.Body>{cellMaker(0, 'PERIOD', '', 0, '기간')}</T.Body>
                        {/* <T.TFoot>
                            <T.TFootRow>
                                <T.TFootCell>합계</T.TFootCell>
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
                            </T.TFootRow>   //불요영역 주석처리
                        </T.TFoot> */}
                    </T.Table>
                </TableBox>
            </RowWapper>
        </Container>
    )
}

export default MeasureUserTable
